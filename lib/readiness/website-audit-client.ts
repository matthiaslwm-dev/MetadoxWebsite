import type { WebsiteAuditResult } from "@/lib/readiness/types";

export async function fetchWebsiteAudit(url: string): Promise<WebsiteAuditResult> {
  if (!url.trim()) {
    return { reachable: false, url, error: "No website was provided." };
  }
  try {
    const res = await fetch("/api/website-audit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ url }),
    });
    return (await res.json()) as WebsiteAuditResult;
  } catch {
    return { reachable: false, url, error: "This website couldn't be reached." };
  }
}
