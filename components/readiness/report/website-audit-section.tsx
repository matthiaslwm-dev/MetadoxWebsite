"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, Globe, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { WebsiteAuditResult } from "@/lib/readiness/types";

const VISIBLE_COUNT = 3;

export function WebsiteAuditSection({ audit }: { audit: WebsiteAuditResult }) {
  const [expanded, setExpanded] = useState(false);

  if (!audit.reachable) {
    return (
      <Card className="p-7 sm:p-8">
        <h2 className="font-heading text-xl font-bold text-navy">Website Audit</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          We couldn&apos;t automatically scan {audit.url || "your website"}: {audit.error} Mention it on
          your strategy session and we&apos;ll take a look manually.
        </p>
      </Card>
    );
  }

  const failed = audit.checks.filter((c) => !c.passed);
  const passed = audit.checks.filter((c) => c.passed);
  const ordered = [...failed, ...passed];
  const visible = expanded ? ordered : ordered.slice(0, VISIBLE_COUNT);
  const remaining = ordered.length - visible.length;

  return (
    <Card className="p-7 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-soft text-blue">
          <Globe className="size-4" />
        </span>
        <div>
          <h2 className="font-heading text-xl font-bold text-navy">Website Audit</h2>
          <p className="text-sm text-muted">{audit.url}</p>
        </div>
        <span className="ml-auto font-heading text-2xl font-bold text-navy">
          {audit.score}
          <span className="text-sm font-normal text-muted">/100</span>
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {visible.map((check) => (
          <div key={check.key} className="flex gap-3 rounded-2xl border border-line p-4">
            {check.passed ? (
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
            ) : (
              <XCircle className="mt-0.5 size-4 shrink-0 text-red-500" />
            )}
            <div>
              <p className="text-sm font-semibold text-navy">{check.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{check.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {ordered.length > VISIBLE_COUNT ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-blue hover:text-blue/80"
        >
          {expanded ? "Show less" : `Show ${remaining} more`}
          {expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
        </button>
      ) : null}

      <p className="mt-5 text-xs leading-relaxed text-muted">
        Automated scan of your homepage covering technical and SEO basics — not a substitute for a full
        manual audit.
      </p>
    </Card>
  );
}
