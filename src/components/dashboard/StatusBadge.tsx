import { cn } from "@/lib/utils";
import type { InvestmentStatus } from "@/lib/types/database";

const styles: Record<InvestmentStatus, string> = {
  pending: "text-[#9A7012]",
  active: "text-[#26734D]",
  completed: "text-[#356B9B]",
  cancelled: "text-[#A64242]",
};

const labels: Record<InvestmentStatus, string> = {
  pending: "Pending",
  active: "Active",
  completed: "Completed",
  cancelled: "Cancelled",
};

export function StatusBadge({
  status,
}: {
  status: InvestmentStatus;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[11px] font-medium",
        styles[status]
      )}
    >
      <span className="h-[6px] w-[6px] rounded-full bg-current" />
      {labels[status]}
    </span>
  );
}