import { cn } from "@/lib/utils";

type Intent = "hard" | "warm" | "soft";

type ConfidenceBarProps = {
  score: number;
  intent: Intent;
  showLabel?: boolean;
  className?: string;
};

const trackColor: Record<Intent, string> = {
  hard: "bg-emerald-500",
  warm: "bg-amber-500",
  soft: "bg-slate-400",
};

export function ConfidenceBar({ score, intent, showLabel = true, className }: ConfidenceBarProps) {
  const clamped = Math.max(0, Math.min(100, Number(score || 0)));

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-wide text-muted-foreground">
          <span>Confidence</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-surface-2">
        <div className={cn("h-full transition-all duration-300", trackColor[intent])} style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
