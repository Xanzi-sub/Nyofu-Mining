import { ShieldCheck, TrendingUp, FileCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="border-b border-[#D9DEE3] bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#B9973E]">
              Mining investment platform
            </p>

            <h1 className="mt-5 max-w-3xl text-[42px] font-semibold leading-[1.08] tracking-[-0.035em] text-[#17212B] sm:text-[52px]">
              Access investment opportunities in Africa`s mining sector.
            </h1>

            <p className="mt-6 max-w-2xl text-[15px] leading-7 text-[#68737D]">
              Mining Connect Africa provides investors with a structured
              platform to review mining investment opportunities, complete
              payments securely and monitor their portfolio.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/signup" size="lg">
                Get started
              </ButtonLink>

              <ButtonLink
                href="#packages"
                variant="outline"
                size="lg"
              >
                View investment tiers
              </ButtonLink>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-[#D9DEE3] pt-6">
              <TrustItem
                icon={ShieldCheck}
                label="Structured platform"
              />

              <TrustItem
                icon={TrendingUp}
                label="Portfolio monitoring"
              />

              <TrustItem
                icon={FileCheck}
                label="Transparent terms"
              />
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="border border-[#D9DEE3] bg-white">
              <div className="border-b border-[#D9DEE3] bg-[#F7F8F9] px-6 py-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#7A858F]">
                  Investor platform
                </p>
              </div>

              <div className="px-6 py-6">
                <div className="border-b border-[#E4E7E9] pb-5">
                  <p className="text-[11px] text-[#7A858F]">
                    Investment packages
                  </p>

                  <p className="mt-2 text-[28px] font-semibold tabular-nums text-[#17212B]">
                    R7,000+
                  </p>
                </div>

                <div className="grid grid-cols-2 divide-x divide-[#E4E7E9] py-5">
                  <div className="pr-5">
                    <p className="text-[10px] uppercase tracking-[0.08em] text-[#7A858F]">
                      Payment
                    </p>
                    <p className="mt-2 text-[13px] font-medium text-[#26323D]">
                      PayFast
                    </p>
                  </div>

                  <div className="pl-5">
                    <p className="text-[10px] uppercase tracking-[0.08em] text-[#7A858F]">
                      Monitoring
                    </p>
                    <p className="mt-2 text-[13px] font-medium text-[#26323D]">
                      Online dashboard
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#E4E7E9] pt-5">
                  <p className="text-[11px] leading-5 text-[#7A858F]">
                    Investment performance and availability are subject to
                    the applicable package terms and underlying operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustItem({
  icon: Icon,
  label,
}: {
  icon: typeof ShieldCheck;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 text-[11px] font-medium text-[#596570]">
      <Icon className="h-3.5 w-3.5 text-[#B9973E]" />
      {label}
    </div>
  );
}