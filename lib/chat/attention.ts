"use client";

import { useEffect } from "react";

const FLASH_INTERVAL_MS = 1400;
const BADGE_SIZE = 64;

const badgeFaviconCache = new Map<string, Promise<string>>();

function buildBadgeFavicon(sourceHref: string): Promise<string> {
  const cached = badgeFaviconCache.get(sourceHref);
  if (cached) return cached;

  const promise = new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = BADGE_SIZE;
      canvas.height = BADGE_SIZE;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("2d context unavailable"));
        return;
      }
      ctx.drawImage(img, 0, 0, BADGE_SIZE, BADGE_SIZE);

      const r = BADGE_SIZE * 0.3;
      const cx = BADGE_SIZE - r * 0.85;
      const cy = r * 0.85;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = "#ef4444";
      ctx.fill();
      ctx.lineWidth = BADGE_SIZE * 0.06;
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = `700 ${r * 1.25}px system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("1", cx, cy + r * 0.06);

      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => reject(new Error("favicon image failed to load"));
    img.src = sourceHref;
  });

  badgeFaviconCache.set(sourceHref, promise);
  return promise;
}

/**
 * Alternates the document title and favicon with a notification badge while
 * `active`, mimicking the "1 new message" tab-flash pattern used by chat
 * widgets to draw the eye back to an unopened conversation. Restores the
 * original title/favicon on cleanup.
 */
export function useTabAttention(active: boolean, message: string) {
  useEffect(() => {
    if (!active) return;

    let cancelled = false;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    const originalTitle = document.title;
    const iconLinks = Array.from(
      document.querySelectorAll<HTMLLinkElement>('link[rel="icon"], link[rel="shortcut icon"]'),
    );
    const originalHrefs = iconLinks.map((link) => link.href);
    const svgLink = iconLinks.find((link) => link.type === "image/svg+xml");
    const sourceHref = (svgLink ?? iconLinks[0])?.href;

    if (!sourceHref) return;

    buildBadgeFavicon(sourceHref)
      .then((badgeHref) => {
        if (cancelled) return;
        let flashed = false;
        intervalId = setInterval(() => {
          flashed = !flashed;
          document.title = flashed ? message : originalTitle;
          iconLinks.forEach((link, i) => {
            link.href = flashed ? badgeHref : originalHrefs[i];
          });
        }, FLASH_INTERVAL_MS);
      })
      .catch(() => {
        // Favicon compositing failed (e.g. blocked canvas) — title-only flash still works.
        let flashed = false;
        intervalId = setInterval(() => {
          flashed = !flashed;
          document.title = flashed ? message : originalTitle;
        }, FLASH_INTERVAL_MS);
      });

    return () => {
      cancelled = true;
      if (intervalId) clearInterval(intervalId);
      document.title = originalTitle;
      iconLinks.forEach((link, i) => {
        link.href = originalHrefs[i];
      });
    };
  }, [active, message]);
}
