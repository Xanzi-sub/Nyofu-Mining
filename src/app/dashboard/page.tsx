import {
  Wallet,
  TrendingUp,
  Layers,
  ArrowRight,
} from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { ButtonLink } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import type { InvestmentStatus } from "@/lib/types/database";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: investments } = await supabase
    .from("investments")
    .select(
      "id, amount, monthly_return, status, created_at, packages(name)"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const active =
    investments?.filter((inv) => inv.status === "active") ?? [];

  const totalInvested = active.reduce(
    (sum, inv) => sum + Number(inv.amount),
    0
  );

  const monthlyReturn = active.reduce(
    (sum, inv) => sum + Number(inv.monthly_return),
    0
  );

  return (
    <div className="mx-auto max-w-[1180px]">
      {/* Page heading */}
      <div className="flex flex-col gap-4 border-b border-[#D9DEE3] pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-[25px] font-semibold tracking-[-0.02em] text-[#17212B]">
            Portfolio
          </h1>

          <p className="mt-1.5 text-[13px] text-[#68737D]">
            Overview of your current investments and expected returns.
          </p>
        </div>

        <ButtonLink
          href="/dashboard/invest"
          className="h-9 rounded-[3px] bg-[#B9973E] px-4 text-[12px] font-semibold text-white hover:bg-[#A98735]"
        >
          New investment
        </ButtonLink>
      </div>

      {/* Summary */}
      <section className="mt-7">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCard
            label="Total capital invested"
            value={formatCurrency(totalInvested)}
            icon={Wallet}
            detail="Active investments"
          />

          <StatCard
            label="Expected monthly return"
            value={formatCurrency(monthlyReturn)}
            icon={TrendingUp}
            detail="Based on active investments"
          />

          <StatCard
            label="Active investments"
            value={String(active.length)}
            icon={Layers}
            detail="Current positions"
          />
        </div>
      </section>

      {/* Investments */}
      <section className="mt-8">
        <div className="flex items-end justify-between border-b border-[#D9DEE3] pb-3">
          <div>
            <h2 className="text-[15px] font-semibold text-[#26323D]">
              Investments
            </h2>

            <p className="mt-1 text-[12px] text-[#7A858F]">
              Your investment positions
            </p>
          </div>

          <span className="text-[11px] text-[#89929B]">
            {investments?.length ?? 0} total
          </span>
        </div>

        {!investments || investments.length === 0 ? (
          <div className="mt-4 border border-[#D9DEE3] bg-white px-6 py-14 text-center">
            <p className="text-[13px] font-medium text-[#4E5963]">
              No investments
            </p>

            <p className="mt-1.5 text-[12px] text-[#89929B]">
              You have not made an investment yet.
            </p>

            <a
              href="/dashboard/invest"
              className="mt-4 inline-block text-[12px] font-medium text-[#96782D] hover:underline"
            >
              View investment opportunities
            </a>
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto border border-[#D9DEE3] bg-white">
            <table className="w-full min-w-[760px] text-left">
              <thead className="border-b border-[#D9DEE3] bg-[#F7F8F9]">
                <tr>
                  <th className="px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#69747E]">
                    Investment
                  </th>

                  <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.06em] text-[#69747E]">
                    Capital
                  </th>

                  <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.06em] text-[#69747E]">
                    Monthly return
                  </th>

                  <th className="px-5 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.06em] text-[#69747E]">
                    Status
                  </th>

                  <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.06em] text-[#69747E]">
                    Date
                  </th>

                  <th className="w-10 px-3 py-3" />
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E4E7E9]">
                {investments.map((inv) => (
                  <tr
                    key={inv.id}
                    className="hover:bg-[#FAFAFA]"
                  >
                    <td className="px-5 py-4">
                      <p className="text-[12px] font-medium text-[#26323D]">
                        {(inv.packages as { name: string } | null)
                          ?.name ?? "Investment package"}
                      </p>

                      <p className="mt-1 font-mono text-[9px] text-[#A0A7AD]">
                        {inv.id.slice(0, 8).toUpperCase()}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-right text-[12px] font-medium tabular-nums text-[#26323D]">
                      {formatCurrency(Number(inv.amount))}
                    </td>

                    <td className="px-5 py-4 text-right text-[12px] tabular-nums text-[#4F5B65]">
                      {formatCurrency(
                        Number(inv.monthly_return)
                      )}
                    </td>

                    <td className="px-5 py-4 text-center">
                      <StatusBadge
                        status={inv.status as InvestmentStatus}
                      />
                    </td>

                    <td className="px-5 py-4 text-right text-[11px] tabular-nums text-[#707B84]">
                      {new Date(
                        inv.created_at
                      ).toLocaleDateString("en-ZA")}
                    </td>

                    <td className="px-3 py-4">
                      <ArrowRight className="h-3.5 w-3.5 text-[#A0A7AD]" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Information */}
      <section className="mt-8 border border-[#D9DEE3] bg-white px-5 py-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[12px] font-medium text-[#4C5862]">
              Portfolio information
            </p>

            <p className="mt-1 text-[11px] text-[#89929B]">
              Expected returns are calculated from your active investment
              agreements.
            </p>
          </div>

          <span className="text-[11px] text-[#69747E]">
            Last updated automatically
          </span>
        </div>
      </section>
    </div>
  );
}