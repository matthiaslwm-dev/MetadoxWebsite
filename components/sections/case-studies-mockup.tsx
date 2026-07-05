import { CheckCircle2, Circle, GraduationCap, TrendingUp, Users2 } from "lucide-react";
import type { FeaturedProject } from "@/lib/content";

function InvoiceMockup() {
  const rows = [
    { id: "INV-0024", customer: "ABC Pte Ltd", amount: "$3,120.00", status: "Paid" },
    { id: "INV-0023", customer: "XYZ Supplies", amount: "$2,050.00", status: "Paid" },
    { id: "INV-0022", customer: "Tech Solutions", amount: "$1,820.00", status: "Overdue" },
  ] as const;

  return (
    <div className="flex h-full flex-col rounded-2xl bg-navy p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-white/80">Invoice Overview</p>
        <Circle className="size-2 fill-emerald-400 text-emerald-400" />
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <div className="rounded-lg bg-white/[0.06] p-2.5">
          <p className="text-[10px] text-white/50">Total</p>
          <p className="mt-0.5 text-sm font-bold text-white">1,248</p>
        </div>
        <div className="rounded-lg bg-white/[0.06] p-2.5">
          <p className="text-[10px] text-white/50">Paid</p>
          <p className="mt-0.5 text-sm font-bold text-emerald-400">932</p>
        </div>
        <div className="rounded-lg bg-white/[0.06] p-2.5">
          <p className="text-[10px] text-white/50">Overdue</p>
          <p className="mt-0.5 text-sm font-bold text-red-400">58</p>
        </div>
      </div>

      <div className="mt-3 flex-1 space-y-1.5 overflow-hidden">
        {rows.map((row) => (
          <div
            key={row.id}
            className="flex items-center justify-between rounded-lg bg-white/[0.04] px-2.5 py-2 text-[11px]"
          >
            <span className="text-white/70">{row.customer}</span>
            <span className="text-white/50">{row.amount}</span>
            <span
              className={
                row.status === "Paid"
                  ? "font-medium text-emerald-400"
                  : "font-medium text-red-400"
              }
            >
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PipelineMockup() {
  const columns = [
    { label: "New Leads", count: "12,048", tone: "bg-blue-bright" },
    { label: "Contacted", count: "7,382", tone: "bg-amber-400" },
    { label: "Qualified", count: "3,165", tone: "bg-emerald-400" },
    { label: "Closed", count: "862", tone: "bg-violet-400" },
  ] as const;

  return (
    <div className="flex h-full flex-col rounded-2xl bg-navy p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-white/80">Leads Pipeline</p>
        <TrendingUp className="size-3.5 text-blue-bright" />
      </div>

      <div className="mt-3 grid flex-1 grid-cols-4 gap-2">
        {columns.map((col) => (
          <div key={col.label} className="flex flex-col rounded-lg bg-white/[0.06] p-2">
            <span className={`h-1 w-full rounded-full ${col.tone}`} />
            <p className="mt-2 text-[9px] leading-tight text-white/50">{col.label}</p>
            <p className="mt-1 text-xs font-bold text-white">{col.count}</p>
            <div className="mt-2 space-y-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-2.5 rounded bg-white/[0.08]" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrainingMockup() {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-navy p-4">
      <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-blue/25 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 size-32 rounded-full bg-blue-bright/20 blur-2xl" />

      <div className="relative flex items-center justify-between">
        <p className="text-xs font-semibold text-white/80">AI for Productivity</p>
        <GraduationCap className="size-4 text-blue-bright" />
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center gap-3">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-white/10 text-blue-bright backdrop-blur">
          <GraduationCap className="size-7" />
        </span>
        <p className="text-center text-[11px] leading-snug text-white/60">
          Hands-on AI workshops for<br />professionals, cohort-based
        </p>
      </div>

      <div className="relative flex items-center justify-between rounded-lg bg-white/[0.06] px-3 py-2">
        <span className="flex items-center gap-1.5 text-[11px] text-white/70">
          <Users2 className="size-3.5" />
          200+ trained
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-emerald-400">
          <CheckCircle2 className="size-3.5" />
          4.8/5 rated
        </span>
      </div>
    </div>
  );
}

export function ProjectMockup({ type }: { type: FeaturedProject["mockup"] }) {
  if (type === "invoice") return <InvoiceMockup />;
  if (type === "pipeline") return <PipelineMockup />;
  return <TrainingMockup />;
}
