import Link from "next/link";
import { CheckCircle2, Clock3, LayoutDashboard } from "lucide-react";

export default async function InvestSuccessPage({
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
          Payment return
        </h1>
      </div>

      <section className="mt-7 border border-[#D8DDE2] bg-white">
        <div className="flex items-start gap-4 border-b border-[#D8DDE2] bg-[#F7F8F9] px-6 py-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#CFE3D7] bg-[#F5FAF7]">
            <CheckCircle2 className="h-5 w-5 text-[#277047]" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#277047]">
              Payment submitted
            </p>
            <h2 className="mt-1 text-[18px] font-semibold text-[#17212B]">
              We are confirming your payment
            </h2>
            <p className="mt-2 text-[12px] leading-5 text-[#68737D]">
              PayFast has returned you to Mining Connect Africa. Your investment stays pending until PayFast sends and we validate the payment notification.
            </p>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="grid gap-4 border border-[#E3E6E9] bg-[#FAFAFA] p-4 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="flex items-center gap-3">
              <Clock3 className="h-4 w-4 text-[#9A7A2E]" />
              <div>
                <p className="text-[12px] font-medium text-[#26323D]">Investment status</p>
                <p className="mt-1 text-[11px] text-[#7A858F]">Pending PayFast confirmation</p>
              </div>
            </div>
            {investment && (
              <p className="font-mono text-[10px] text-[#89929B]">
                Ref: {investment.slice(0, 8).toUpperCase()}
              </p>
            )}
          </div>

          <div className="mt-6 grid gap-4 border-l-2 border-[#B9973E] bg-[#FBFAF6] px-4 py-3 text-[11px] leading-5 text-[#596570]">
            <p>Once confirmation is complete, the investment will appear as active in your portfolio. This may take a short moment after payment.</p>
            <p>If you completed payment but the status does not update, keep your PayFast payment reference and contact MCA support.</p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard"
              className="inline-flex h-9 items-center justify-center gap-2 bg-[#B9973E] px-4 text-[12px] font-semibold text-white hover:bg-[#A98735]"
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              View portfolio
            </Link>
            <Link
              href="/dashboard/transactions"
              className="inline-flex h-9 items-center justify-center border border-[#CBD2D8] bg-white px-4 text-[12px] font-medium text-[#4D5964] hover:bg-[#F7F8F9]"
            >
              View transactions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}