import Link from "next/link";
import { AlertCircle, ArrowLeft, CircleDollarSign } from "lucide-react";

export default async function InvestCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ investment?: string }>;
}) {
  const { investment } = await searchParams;

  return (
    <div className="mx-auto max-w-[760px] py-4 md:py-10">
      <div className="border-b border-[#D8DDE2] pb-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#929AA2]">
          Portfolio / Investment
        </p>
        <h1 className="mt-3 text-[25px] font-semibold tracking-[-0.02em] text-[#17212B]">
          Payment not completed
        </h1>
      </div>

      <section className="mt-7 border border-[#D8DDE2] bg-white">
        <div className="flex items-start gap-4 border-b border-[#D8DDE2] bg-[#FCF5F5] px-6 py-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#E5C5C5] bg-white">
            <AlertCircle className="h-5 w-5 text-[#A64242]" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#A64242]">
              Payment cancelled or unsuccessful
            </p>
            <h2 className="mt-1 text-[18px] font-semibold text-[#17212B]">
              No payment has been confirmed
            </h2>
            <p className="mt-2 text-[12px] leading-5 text-[#68737D]">
              The payment flow was cancelled or did not complete at PayFast. Your investment will remain inactive until a successful payment is confirmed.
            </p>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="flex items-center gap-3 border border-[#E3E6E9] bg-[#FAFAFA] p-4">
            <CircleDollarSign className="h-4 w-4 text-[#9A7A2E]" />
            <div>
              <p className="text-[12px] font-medium text-[#26323D]">What happens next</p>
              <p className="mt-1 text-[11px] leading-5 text-[#7A858F]">You may safely return to investments and start a new checkout when you are ready.</p>
            </div>
          </div>

          {investment && (
            <p className="mt-4 font-mono text-[10px] text-[#89929B]">
              Checkout reference: {investment.slice(0, 8).toUpperCase()}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard/invest"
              className="inline-flex h-9 items-center justify-center gap-2 bg-[#B9973E] px-4 text-[12px] font-semibold text-white hover:bg-[#A98735]"
            >
              <CircleDollarSign className="h-3.5 w-3.5" />
              Try payment again
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex h-9 items-center justify-center gap-2 border border-[#CBD2D8] bg-white px-4 text-[12px] font-medium text-[#4D5964] hover:bg-[#F7F8F9]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Return to portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}