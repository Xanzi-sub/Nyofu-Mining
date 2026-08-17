import { redirect } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  Landmark,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatCurrency } from "@/lib/utils";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { requestWithdrawal } from "./actions";

export default async function WithdrawalsPage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
    message?: string;
  }>;
}) {
  const { error, message } = await searchParams;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [{ data: investments }, { data: withdrawals }] =
    await Promise.all([
      supabase
        .from("investments")
        .select("id, monthly_return, created_at, packages(name)")
        .eq("user_id", user.id)
        .eq("status", "active")
        .order("created_at", { ascending: false }),

      supabase
        .from("withdrawal_requests")
        .select(
          "id, amount, status, created_at, investments(packages(name))"
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }),
    ]);

  return (
    <div className="mx-auto max-w-[1180px]">
      <div className="border-b border-[#D8DDE2] pb-6">
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[#929AA2]">
          <span>Portfolio</span>
          <span>/</span>
          <span>Withdrawals</span>
        </div>

        <h1 className="mt-3 text-[25px] font-semibold tracking-[-0.02em] text-[#17212B]">
          Withdrawal requests
        </h1>

        <p className="mt-1.5 max-w-2xl text-[13px] leading-5 text-[#68737D]">
          Submit and monitor requests for payment of eligible investment
          earnings.
        </p>
      </div>

      <div className="mt-7 grid gap-6 lg:grid-cols-[390px_1fr]">
        <section className="border border-[#D8DDE2] bg-white">
          <div className="border-b border-[#D8DDE2] bg-[#F7F8F9] px-6 py-5">
            <div className="flex items-center gap-3">
              <Landmark className="h-4 w-4 text-[#9A7A2E]" />

              <div>
                <h2 className="text-[14px] font-semibold text-[#26323D]">
                  New withdrawal request
                </h2>
                <p className="mt-1 text-[11px] text-[#7A858F]">
                  Requests are subject to review.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {message && (
              <div className="mb-5 flex items-start gap-2 border border-[#CFE3D7] bg-[#F5FAF7] px-3 py-2.5 text-[12px] text-[#277047]">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{message}</span>
              </div>
            )}

            {error && (
              <div className="mb-5 flex items-start gap-2 border border-[#E5C5C5] bg-[#FCF5F5] px-3 py-2.5 text-[12px] text-[#9B3A3A]">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {!investments || investments.length === 0 ? (
              <div className="border border-[#E3E6E9] bg-[#FAFAFA] px-4 py-4">
                <p className="text-[12px] leading-5 text-[#68737D]">
                  You need an active investment before you can submit a
                  withdrawal request.
                </p>
              </div>
            ) : (
              <form action={requestWithdrawal} className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.06em] text-[#68737D]">
                    Active investment
                  </label>

                  <select
                    name="investmentId"
                    required
                    className="h-10 w-full border border-[#CBD2D8] bg-white px-3 text-[13px] text-[#26323D] outline-none focus:border-[#B9973E]"
                  >
                    <option value="">Select an investment</option>

                    {investments.map((investment) => (
                      <option
                        key={investment.id}
                        value={investment.id}
                      >
                        {(investment.packages as {
                          name: string;
                        } | null)?.name ?? "Investment"}{" "}
                        — up to{" "}
                        {formatCurrency(
                          Number(investment.monthly_return)
                        )}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.06em] text-[#68737D]">
                    Requested amount
                  </label>

                  <input
                    name="amount"
                    type="number"
                    min="1"
                    step="0.01"
                    required
                    placeholder="0.00"
                    className="h-10 w-full border border-[#CBD2D8] bg-white px-3 text-[13px] text-[#26323D] outline-none focus:border-[#B9973E]"
                  />

                  <p className="mt-1.5 text-[11px] leading-4 text-[#929AA2]">
                    The requested amount may not exceed the applicable
                    monthly return for the selected investment.
                  </p>
                </div>

                <SubmitButton
                  pendingLabel="Submitting"
                  className="h-9 w-full bg-[#B9973E] px-4 text-[12px] font-semibold text-white hover:bg-[#A98735]"
                >
                  Submit request
                </SubmitButton>
              </form>
            )}
          </div>
        </section>

        <section className="border border-[#D8DDE2] bg-white">
          <div className="border-b border-[#D8DDE2] bg-[#F7F8F9] px-6 py-5">
            <h2 className="text-[14px] font-semibold text-[#26323D]">
              Request history
            </h2>

            <p className="mt-1 text-[11px] text-[#7A858F]">
              Previous withdrawal requests and their current status.
            </p>
          </div>

          {!withdrawals || withdrawals.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <p className="text-[12px] text-[#929AA2]">
                No withdrawal requests have been submitted.
              </p>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-[1fr_140px_110px] border-b border-[#E3E6E9] bg-[#FAFAFA] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#89929B]">
                <span>Investment</span>
                <span>Amount</span>
                <span className="text-right">Status</span>
              </div>

              {withdrawals.map((withdrawal) => (
                <div
                  key={withdrawal.id}
                  className="grid grid-cols-[1fr_140px_110px] items-center border-b border-[#E5E8EB] px-6 py-4 last:border-b-0"
                >
                  <div>
                    <p className="text-[12px] font-medium text-[#26323D]">
                      {(
                        withdrawal.investments as {
                          packages: { name: string } | null;
                        } | null
                      )?.packages?.name ?? "Investment earnings"}
                    </p>

                    <p className="mt-1 text-[11px] text-[#929AA2]">
                      {new Date(
                        withdrawal.created_at
                      ).toLocaleDateString("en-ZA")}
                    </p>
                  </div>

                  <p className="text-[12px] font-medium tabular-nums text-[#26323D]">
                    {formatCurrency(Number(withdrawal.amount))}
                  </p>

                  <div className="text-right">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.06em] text-[#8C702B]">
                      {withdrawal.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}