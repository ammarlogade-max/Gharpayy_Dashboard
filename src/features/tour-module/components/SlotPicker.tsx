import { cn } from "@/lib/utils";

type SlotPickerProps = {
  date: string;
  selected: string;
  onSelect: (time: string) => void;
  takenSlots: Set<string>;
  recommendEarly?: boolean;
};

type TourLike = {
  assignedTo?: string;
  tourDate?: string;
  tourTime?: string;
  status?: string;
};

function buildSlots() {
  const slots: string[] = [];
  for (let hour = 9; hour <= 20; hour += 1) {
    slots.push(`${String(hour).padStart(2, "0")}:00`);
    if (hour !== 20) {
      slots.push(`${String(hour).padStart(2, "0")}:30`);
    }
  }
  return slots;
}

const SLOT_LIST = buildSlots();

export function getTakenSlotsForDate(tours: TourLike[], assignedToName: string, date: string) {
  const taken = new Set<string>();

  tours.forEach((tour) => {
    if (!tour) return;
    const sameAssignee = String(tour.assignedTo || "").trim() === String(assignedToName || "").trim();
    const sameDate = String(tour.tourDate || "").trim() === String(date || "").trim();
    const status = String(tour.status || "").toLowerCase();
    const active = status !== "cancelled";

    if (sameAssignee && sameDate && active && tour.tourTime) {
      taken.add(String(tour.tourTime));
    }
  });

  return taken;
}

export function SlotPicker({ selected, onSelect, takenSlots, recommendEarly = false }: SlotPickerProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
      {SLOT_LIST.map((slot) => {
        const isTaken = takenSlots.has(slot);
        const isSelected = selected === slot;
        const isRecommended = recommendEarly && /^0[9-9]:|^10:|^11:/.test(slot);

        return (
          <button
            key={slot}
            type="button"
            disabled={isTaken}
            onClick={() => onSelect(slot)}
            className={cn(
              "h-9 rounded-md border text-xs font-medium transition-colors",
              isTaken && "cursor-not-allowed border-border bg-surface-2 text-muted-foreground/60",
              !isTaken && !isSelected && "border-border bg-background hover:bg-accent",
              isSelected && "border-primary bg-primary/10 text-primary",
              isRecommended && !isTaken && !isSelected && "border-emerald-200"
            )}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
}
