type StatusValue = "scheduled" | "confirmed" | "completed" | "no-show" | "cancelled";
type OutcomeValue = "booked" | "token-paid" | "draft" | "follow-up" | "rejected" | "not-interested";

const statusStyles: Record<StatusValue, string> = {
  scheduled: "bg-blue-50 text-blue-700 border border-blue-200",
  confirmed: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  completed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  "no-show": "bg-amber-50 text-amber-700 border border-amber-200",
  cancelled: "bg-zinc-100 text-zinc-700 border border-zinc-200",
};

const outcomeStyles: Record<OutcomeValue, string> = {
  booked: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  "token-paid": "bg-lime-50 text-lime-700 border border-lime-200",
  draft: "bg-sky-50 text-sky-700 border border-sky-200",
  "follow-up": "bg-violet-50 text-violet-700 border border-violet-200",
  rejected: "bg-rose-50 text-rose-700 border border-rose-200",
  "not-interested": "bg-zinc-100 text-zinc-700 border border-zinc-200",
};

function toStatusValue(input: string): StatusValue {
  const normalized = input.trim().toLowerCase();
  if (normalized === "confirmed") return "confirmed";
  if (normalized === "completed") return "completed";
  if (normalized === "no-show") return "no-show";
  if (normalized === "cancelled") return "cancelled";
  return "scheduled";
}

function toOutcomeValue(input: string): OutcomeValue | null {
  const normalized = input.trim().toLowerCase();
  if (normalized === "booked") return "booked";
  if (normalized === "token-paid") return "token-paid";
  if (normalized === "draft") return "draft";
  if (normalized === "follow-up") return "follow-up";
  if (normalized === "rejected") return "rejected";
  if (normalized === "not-interested") return "not-interested";
  return null;
}

export function StatusBadge({ status }: { status: string }) {
  const value = toStatusValue(status || "scheduled");
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusStyles[value]}`}>
      {value.replace("-", " ")}
    </span>
  );
}

export function OutcomeBadge({ outcome }: { outcome: string | null }) {
  if (!outcome) {
    return <span className="text-xs text-muted-foreground">-</span>;
  }

  const value = toOutcomeValue(outcome);
  if (!value) {
    return <span className="text-xs text-muted-foreground">-</span>;
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${outcomeStyles[value]}`}>
      {value.replace("-", " ")}
    </span>
  );
}
