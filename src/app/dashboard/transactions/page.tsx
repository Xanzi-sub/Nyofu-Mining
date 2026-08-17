import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatCurrency } from "@/lib/utils";

export default async function TransactionsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: payments } = await supabase
    .from("payments")
    .select(
      "id, amount, status, payfast_payment_id, created_at, investments(packages(name))"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-[1180px]">
      <div className="border-b border-[#D9DEE3] pb-6">
        <h1 className="text-[25px] font-semibold tracking-[-0.02em] text-[#17212B]">
          Transactions
        </h1>

        <p className="mt-1.5 text-[13px] text-[#68737D]">
          Payment history associated with your investments.
        </p>
      </div>

      {!payments || payments.length === 0 ? (
        <div className="mt-7 border border-[#D9DEE3] bg-white px-6 py-14 text-center">
          <p className="text-[13px] font-medium text-[#4E5963]">
            No transactions
          </p>

          <p className="mt-1.5 text-[12px] text-[#89929B]">
            Your payment history will appear here.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-7 divide-y divide-[#E4E7E9] border border-[#D9DEE3] bg-white md:hidden">
            {payments.map((payment) => {
              const investment = payment.investments as {
                packages: { name: string } | null;
              } | null;
              const status = String(payment.status).toUpperCase();

              return (
                <div key={payment.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[13px] font-semibold text-[#26323D]">
                        {investment?.packages?.name ?? "Investment"}
                      </p>
                      <p className="mt-1 font-mono text-[10px] text-[#89929B]">
                        {payment.payfast_payment_id ?? payment.id.slice(0, 8).toUpperCase()}
                      </p>
                    </div>
                    <span className={status === "COMPLETE" ? "text-[11px] font-semibold text-[#26734D]" : status === "FAILED" ? "text-[11px] font-semibold text-[#A64242]" : "text-[11px] font-semibold text-[#9A7012]"}>
                      {status}
                    </span>
                  </div>
                  <div className="mt-4 flex items-end justify-between border-t border-[#E4E7E9] pt-3">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.06em] text-[#89929B]">Amount</p>
                      <p className="mt-1 text-[13px] font-semibold tabular-nums text-[#26323D]">{formatCurrency(Number(payment.amount))}</p>
                    </div>
                    <p className="text-right text-[11px] text-[#707B84]">
                      {new Date(payment.created_at).toLocaleDateString("en-ZA", { day: "2-digit", month: "short", year: "numeric" })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-7 hidden overflow-x-auto border border-[#D9DEE3] bg-white md:block">
            <table className="w-full min-w-[820px] text-left">
            <thead className="border-b border-[#D9DEE3] bg-[#F7F8F9]">
              <tr>
                <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#69747E]">
                  Investment
                </th>

                <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.06em] text-[#69747E]">
                  Amount
                </th>

                <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#69747E]">
                  Payment reference
                </th>

                <th className="px-5 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.06em] text-[#69747E]">
                  Status
                </th>

                <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.06em] text-[#69747E]">
                  Date
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E4E7E9]">
              {payments.map((p) => {
                const investment = p.investments as {
                  packages: { name: string } | null;
                } | null;

                const status = String(p.status).toUpperCase();

                return (
                  <tr
                    key={p.id}
                    className="hover:bg-[#FAFAFA]"
                  >
                    <td className="px-5 py-4">
                      <p className="text-[12px] font-medium text-[#26323D]">
                        {investment?.packages?.name ??
                          "Investment"}
                      </p>

                      <p className="mt-1 font-mono text-[9px] text-[#A0A7AD]">
                        {p.id.slice(0, 8).toUpperCase()}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-right text-[12px] font-medium tabular-nums text-[#26323D]">
                      {formatCurrency(Number(p.amount))}
                    </td>

                    <td className="px-5 py-4 font-mono text-[10px] text-[#68737D]">
                      {p.payfast_payment_id ?? "—"}
                    </td>

                    <td className="px-5 py-4 text-center">
                      <span
                        className={
                          status === "COMPLETE"
                            ? "text-[11px] font-medium text-[#26734D]"
                            : status === "FAILED"
                            ? "text-[11px] font-medium text-[#A64242]"
                            : "text-[11px] font-medium text-[#9A7012]"
                        }
                      >
                        {status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right text-[11px] tabular-nums text-[#707B84]">
                      {new Date(
                        p.created_at
                      ).toLocaleString("en-ZA", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}