import { Loader2 } from "lucide-react";

export function PageLoadingOverlay() {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-white/45 backdrop-blur-sm">
      <div className="flex min-w-32 flex-col items-center gap-3 border border-[#D9DEE3] bg-white px-6 py-5 text-[12px] font-medium text-[#596570]">
        <Loader2 className="h-5 w-5 animate-spin text-[#B9973E]" />
        Loading
      </div>
    </div>
  );
}
