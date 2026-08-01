import { lookup } from "node:dns/promises";

export const runtime = "nodejs";

const FETCH_TIMEOUT_MS = 6000;
const MAX_BYTES = 1_500_000;
const MAX_REDIRECTS = 4;

function normalizeUrl(input: string): string | null {
  const value = input.trim();
  if (!value) return null;
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const parsed = new URL(withProtocol);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

/** Best-effort SSRF guard: blocks loopback, private, and link-local (incl. cloud metadata) ranges. */
function isPrivateIp(ip: string): boolean {
  const v4 = ip.match(/^(\d{1,3})\.(\d{1,3})\.\d{1,3}\.\d{1,3}$/);
  if (v4) {
    const a = Number(v4[1]);
    const b = Number(v4[2]);
    if (a === 127 || a === 10 || a === 0) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 169 && b === 254) return true;
    return false;
  }
  const lower = ip.toLowerCase();
  return lower === "::1" || lower.startsWith("fe80:") || lower.startsWith("fc") || lower.startsWith("fd");
}

async function assertPublicHost(hostname: string) {
  if (hostname === "localhost") throw new Error("blocked host");
  const results = await lookup(hostname, { all: true });
  if (results.some((r) => isPrivateIp(r.address))) throw new Error("blocked host");
}

async function safeFetch(startUrl: string, signal: AbortSignal) {
  let current = startUrl;
  for (let i = 0; i < MAX_REDIRECTS; i++) {
    const parsed = new URL(current);
    await assertPublicHost(parsed.hostname);
    const res = await fetch(current, {
      signal,
      redirect: "manual",
      headers: { "user-agent": "MetadoxAuditBot/1.0 (+https://metadox.io)" },
    });
    const location = res.headers.get("location");
    if (res.status >= 300 && res.status < 400 && location) {
      current = new URL(location, current).toString();
      continue;
    }
    return { res, finalUrl: current };
  }
  throw new Error("too many redirects");
}

function buildChecks(html: string, isHttps: boolean, responseTimeMs: number) {
  const has = (re: RegExp) => re.test(html);
  const hasTitle = has(/<title>[^<]{5,}<\/title>/i);
  const hasMetaDescription = has(/<meta[^>]+name=["']description["'][^>]+content=["'][^"']{20,}["']/i);
  const hasViewport = has(/<meta[^>]+name=["']viewport["']/i);
  const hasOpenGraph = has(/property=["']og:title["']/i);
  const hasFavicon = has(/rel=["'](?:shortcut icon|icon)["']/i);
  const hasH1 = has(/<h1\b/i);

  const imgTags = html.match(/<img\b[^>]*>/gi) ?? [];
  const imgsWithAlt = imgTags.filter((tag) => /alt\s*=\s*["'][^"']+["']/i.test(tag));
  const imageAltOk = imgTags.length === 0 || imgsWithAlt.length / imgTags.length >= 0.8;

  return [
    {
      key: "https",
      label: "Secure connection (HTTPS)",
      passed: isHttps,
      detail: isHttps
        ? "Your site loads over a secure HTTPS connection."
        : "Your site isn't served over HTTPS, which browsers flag as \"Not Secure\" and can hurt search ranking.",
    },
    {
      key: "title",
      label: "Page title",
      passed: hasTitle,
      detail: hasTitle
        ? "Your homepage has a descriptive page title."
        : "Your homepage is missing a proper page title, one of the first things search engines and browser tabs show.",
    },
    {
      key: "metaDescription",
      label: "Meta description",
      passed: hasMetaDescription,
      detail: hasMetaDescription
        ? "A meta description is set, helping search results show a useful summary of your page."
        : "No meta description found, so search engines may show a random snippet instead of a written summary.",
    },
    {
      key: "viewport",
      label: "Mobile-friendly setup",
      passed: hasViewport,
      detail: hasViewport
        ? "A mobile viewport tag is set, so your site can adapt to phone screens."
        : "No mobile viewport tag found, your site may not display correctly on phones.",
    },
    {
      key: "openGraph",
      label: "Social sharing preview",
      passed: hasOpenGraph,
      detail: hasOpenGraph
        ? "Open Graph tags are set, so links shared on social media show a proper preview."
        : "No Open Graph tags found, links to your site shared on WhatsApp, LinkedIn or Facebook won't show a preview card.",
    },
    {
      key: "favicon",
      label: "Favicon",
      passed: hasFavicon,
      detail: hasFavicon ? "A favicon is set for your site." : "No favicon found, your site shows a blank tab icon in browsers.",
    },
    {
      key: "h1",
      label: "Page heading structure",
      passed: hasH1,
      detail: hasH1
        ? "Your homepage uses a clear main heading."
        : "No main heading (H1) found on your homepage, which can weaken SEO and page structure.",
    },
    {
      key: "imageAlt",
      label: "Image accessibility",
      passed: imageAltOk,
      detail:
        imgTags.length === 0
          ? "No images detected on the homepage."
          : imageAltOk
            ? "Most images have descriptive alt text, which helps accessibility and image search visibility."
            : `${imgTags.length - imgsWithAlt.length} of ${imgTags.length} images are missing alt text, hurting accessibility and image search visibility.`,
    },
    {
      key: "responseTime",
      label: "Load speed",
      passed: responseTimeMs < 2000,
      detail:
        responseTimeMs < 2000
          ? `Your homepage responded in ${responseTimeMs}ms, a reasonable load time.`
          : `Your homepage took ${responseTimeMs}ms to respond, which is slow and can cost you visitors and search ranking.`,
    },
  ];
}

async function checkRobotsTxt(origin: string) {
  try {
    const res = await fetch(`${origin}/robots.txt`);
    return {
      key: "robotsTxt",
      label: "Robots.txt file",
      passed: res.ok,
      detail: res.ok
        ? "A robots.txt file is present, guiding how search engines crawl your site."
        : "No robots.txt file found at the root of your site.",
    };
  } catch {
    return {
      key: "robotsTxt",
      label: "Robots.txt file",
      passed: false,
      detail: "No robots.txt file found at the root of your site.",
    };
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const rawUrl = typeof body?.url === "string" ? body.url : "";
  const normalized = normalizeUrl(rawUrl);

  if (!normalized) {
    return Response.json({ reachable: false, url: rawUrl, error: "That doesn't look like a valid website address." });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  const start = Date.now();

  try {
    const { res, finalUrl } = await safeFetch(normalized, controller.signal);
    const responseTimeMs = Date.now() - start;

    if (!res.ok || !res.body) {
      return Response.json({ reachable: false, url: normalized, error: `The site responded with status ${res.status}.` });
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let html = "";
    let bytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      html += decoder.decode(value, { stream: true });
      if (bytes >= MAX_BYTES) break;
    }

    const checks = buildChecks(html, finalUrl.startsWith("https://"), responseTimeMs);
    checks.push(await checkRobotsTxt(new URL(finalUrl).origin));

    const score = Math.round((checks.filter((c) => c.passed).length / checks.length) * 100);

    return Response.json({ reachable: true, url: normalized, score, checks });
  } catch {
    return Response.json({ reachable: false, url: normalized, error: "This website couldn't be reached." });
  } finally {
    clearTimeout(timeout);
  }
}
