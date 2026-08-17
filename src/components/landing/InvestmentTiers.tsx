import { ButtonLink } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import type { Package } from "@/lib/types/database";

const FALLBACK_PACKAGES: Package[] = [
  {
    id: "bronze",
    name: "Bronze",
    min_amount: 7000,
    monthly_return: 2100,
    active: true,
    sort_order: 1,
  },
  {
    id: "tier2",
    name: "Tier 2",
    min_amount: 10000,
    monthly_return: 3000,
    active: true,
    sort_order: 2,
  },
  {
    id: "silver",
    name: "Silver",
    min_amount: 15000,
    monthly_return: 4500,
    active: true,
    sort_order: 3,
  },
  {
    id: "tier4",
    name: "Tier 4",
    min_amount: 20000,
    monthly_return: 6000,
    active: true,
    sort_order: 4,
  },
  {
    id: "gold",
    name: "Gold",
    min_amount: 30000,
    monthly_return: 9000,
    active: true,
    sort_order: 5,
  },
  {
    id: "diamond",
    name: "Diamond",
    min_amount: 50000,
    monthly_return: 15000,
    active: true,
    sort_order: 6,
  },
];

export async function InvestmentTiers() {
  const isSupabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  let data: Package[] | null = null;

  if (isSupabaseConfigured) {
    const supabase = await createClient();

    const result = await supabase
      .from("packages")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });

    data = result.data;
  }

  const packages =
    data && data.length > 0 ? data : FALLBACK_PACKAGES;

  return (
    <section
      id="packages"
      className="border-b border-[#D9DEE3] bg-[#F7F8F9]"
    >
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col justify-between gap-5 border-b border-[#D9DEE3] pb-6 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#B9973E]">
              Investment products
            </p>

            <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.025em] text-[#17212B]">
              Investment tiers
            </h2>

            <p className="mt-2 max-w-xl text-[13px] leading-5 text-[#68737D]">
              Review the currently available investment packages and their
              applicable projected returns.
            </p>
          </div>

          <p className="text-[10px] uppercase tracking-[0.08em] text-[#7A858F]">
            South African Rand (ZAR)
          </p>
        </div>

        <div className="mt-6 overflow-hidden border border-[#D9DEE3] bg-white">
          <div className="hidden grid-cols-[1.5fr_1fr_1fr_150px] border-b border-[#D9DEE3] bg-[#F7F8F9] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#7A858F] md:grid">
            <span>Package</span>
            <span>Capital</span>
            <span>Projected monthly return</span>
            <span />
          </div>

          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="grid gap-4 border-b border-[#E4E7E9] bg-white px-5 py-5 last:border-b-0 md:grid-cols-[1.5fr_1fr_1fr_150px] md:items-center"
            >
              <div>
                <p className="text-[13px] font-semibold text-[#26323D]">
                  {pkg.name}
                </p>

                <p className="mt-1 text-[11px] text-[#7A858F]">
                  Investment package
                </p>
              </div>

              <div>
                <span className="mb-1 block text-[10px] uppercase tracking-[0.06em] text-[#7A858F] md:hidden">
                  Capital
                </span>

                <p className="text-[13px] font-medium tabular-nums text-[#26323D]">
                  {formatCurrency(pkg.min_amount)}
                </p>
              </div>

              <div>
                <span className="mb-1 block text-[10px] uppercase tracking-[0.06em] text-[#7A858F] md:hidden">
                  Projected monthly return
                </span>

                <p className="text-[13px] font-medium tabular-nums text-[#B9973E]">
                  {formatCurrency(pkg.monthly_return)}
                </p>
              </div>

              <div className="md:text-right">
                <ButtonLink
                  href={`/signup?package=${pkg.id}`}
                  size="md"
                  className="w-full md:w-auto"
                >
                  Review
                </ButtonLink>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[10px] leading-5 text-[#7A858F]">
          Projected returns are indicative and are not guaranteed. Investment
          availability, terms and performance are subject to the applicable
          investment documentation.
        </p>
      </div>
    </section>
  );
}