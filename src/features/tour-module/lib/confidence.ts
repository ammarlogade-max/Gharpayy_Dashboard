import type { TourIntent, TourQualification } from "@/features/tour-module/lib/types";

export const intentBg: Record<TourIntent, string> = {
  hard: "bg-emerald-50 border-emerald-200 text-emerald-800",
  warm: "bg-amber-50 border-amber-200 text-amber-800",
  soft: "bg-slate-50 border-slate-200 text-slate-700",
};

function parseDate(value: string): Date | null {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

function daysUntil(value: string): number | null {
  const target = parseDate(value);
  if (!target) return null;

  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const end = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  return Math.floor((end.getTime() - start.getTime()) / 86400000);
}

export function scoreTour(qualification: TourQualification, budget: number) {
  const reasons: string[] = [];
  let score = 35;

  const moveInDays = daysUntil(qualification.moveInDate);
  if (moveInDays !== null) {
    if (moveInDays <= 2) {
      score += 18;
      reasons.push("Immediate move-in");
    } else if (moveInDays <= 7) {
      score += 10;
      reasons.push("Move-in this week");
    } else if (moveInDays <= 21) {
      score += 4;
      reasons.push("Move-in planned");
    }
  }

  if (qualification.readyIn48h) {
    score += 18;
    reasons.push("Ready in 48h");
  }

  if (qualification.willBookToday === "yes") {
    score += 15;
    reasons.push("Likely to book today");
  } else if (qualification.willBookToday === "maybe") {
    score += 6;
  } else {
    score -= 8;
  }

  if (qualification.exploring) {
    score -= 8;
    reasons.push("Still exploring");
  }

  if (qualification.comparing) {
    score -= 6;
    reasons.push("Comparing options");
  }

  if (qualification.needsFamily) {
    score -= 5;
    reasons.push("Family approval pending");
  }

  if (qualification.decisionMaker === "self") {
    score += 4;
  } else if (qualification.decisionMaker === "parent") {
    score -= 2;
  } else {
    score -= 3;
  }

  if (budget >= 20000) {
    score += 5;
    reasons.push("Healthy budget");
  } else if (budget > 0 && budget < 9000) {
    score -= 4;
  }

  if (qualification.keyConcern?.trim()) {
    score -= 2;
  }

  score = Math.max(0, Math.min(100, score));

  const intent: TourIntent = score >= 75 ? "hard" : score >= 50 ? "warm" : "soft";
  return { score, intent, reason: reasons.slice(0, 4) };
}

export function inferConfirmationStrength(qualification: TourQualification): "high" | "medium" | "low" {
  if (qualification.readyIn48h && qualification.willBookToday === "yes" && !qualification.exploring) {
    return "high";
  }

  if (qualification.willBookToday !== "no" && !qualification.comparing) {
    return "medium";
  }

  return "low";
}
