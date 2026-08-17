import { type LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  icon: Icon,
  detail,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  detail?: string;
}) {
  return (
    <div className="border border-[#D9DEE3] bg-white px-5 py-5">
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-medium text-[#66717C]">
          {label}
        </p>

        <Icon
          className="h-[17px] w-[17px] text-[#B9973E]"
          strokeWidth={1.6}
        />
      </div>

      <p className="mt-3 text-[25px] font-semibold tracking-[-0.02em] text-[#17212B]">
        {value}
      </p>

      {detail && (
        <p className="mt-1 text-[11px] text-[#8A939B]">
          {detail}
        </p>
      )}
    </div>
  );
}