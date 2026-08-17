"use client";

import { useMemo, useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { TermsModal } from "@/components/ui/TermsModal";
import type { Package } from "@/lib/types/database";

export function InvestForm({
  packages,
  preselected,
}: {
  packages: Package[];
  preselected?: string;
}) {
  const [selectedId, setSelectedId] = useState<string | undefined>(
    preselected ?? packages[0]?.id
  );
  const [step, setStep] = useState<"select" | "review">("select");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selected = useMemo(
    () => packages.find((pkg) => pkg.id === selectedId),
    [packages, selectedId]
  );

  async function handleInvestNow() {
    if (!selected || !termsAccepted) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/payfast/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageId: selected.id,
          termsAccepted,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Unable to initiate payment.");
      }

      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.url;

      for (const [key, value] of Object.entries(data.fields)) {
        if (value === undefined || value === null) continue;

        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);

        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to initiate payment."
      );
      setLoading(false);
    }
  }

  if (packages.length === 0) {
    return (
      <div className="mt-8 border border-[#D8DDE2] bg-white px-6 py-14 text-center">
        <p className="text-[13px] font-medium text-[#35414C]">
          No investment packages are currently available.
        </p>
        <p className="mt-2 text-[12px] text-[#7A858F]">
          Please check back later or contact Mining Connect Africa.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {step === "select" && (
        <>
          <div className="flex items-end justify-between border-b border-[#D8DDE2] pb-3">
            <div>
              <h2 className="text-[15px] font-semibold text-[#202A33]">
                Investment packages
              </h2>
              <p className="mt-1 text-[12px] text-[#7A858F]">
                Select the investment package you would like to review.
              </p>
            </div>

            <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#929AA2]">
              01 / 02
            </span>
          </div>

          <div className="mt-5 overflow-hidden border border-[#D8DDE2] bg-white">
            <div className="hidden grid-cols-[1.6fr_1fr_1fr_120px] border-b border-[#D8DDE2] bg-[#F7F8F9] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#7A858F] md:grid">
              <span>Package</span>
              <span>Capital</span>
              <span>Projected monthly return</span>
              <span className="text-right">Selection</span>
            </div>

            {packages.map((pkg) => {
              const active = pkg.id === selectedId;

              return (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setSelectedId(pkg.id)}
                  className={cn(
                    "grid w-full grid-cols-[1fr_auto] items-center gap-x-4 border-b border-[#E5E8EB] px-4 py-4 text-left last:border-b-0 md:grid-cols-[1.6fr_1fr_1fr_120px] md:px-5 md:py-5",
                    active
                      ? "bg-[#FCFAF4]"
                      : "bg-white hover:bg-[#F8F9FA]"
                  )}
                >
                  <div>
                    <p className="text-[13px] font-semibold text-[#202A33]">
                      {pkg.name}
                    </p>
                    <p className="mt-1 text-[11px] text-[#929AA2]">
                      Investment package
                    </p>
                  </div>

                  <p className="hidden text-[13px] font-medium tabular-nums text-[#27323C] md:block">
                    {formatCurrency(pkg.min_amount)}
                  </p>

                  <p className="hidden text-[13px] font-medium tabular-nums text-[#8C702B] md:block">
                    {formatCurrency(pkg.monthly_return)}
                  </p>

                  <div className="flex justify-end">
                    <span
                      className={cn(
                        "inline-flex h-7 items-center border px-3 text-[11px] font-medium",
                        active
                          ? "border-[#B9973E] bg-[#B9973E] text-white"
                          : "border-[#CBD1D6] text-[#596570]"
                      )}
                    >
                      {active ? "Selected" : "Select"}
                    </span>
                  </div>

                  <div className="col-span-2 mt-3 grid grid-cols-2 gap-4 border-t border-[#E5E8EB] pt-3 md:hidden">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.06em] text-[#89929B]">Capital</p>
                      <p className="mt-1 text-[12px] font-semibold tabular-nums text-[#27323C]">{formatCurrency(pkg.min_amount)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.06em] text-[#89929B]">Monthly return</p>
                      <p className="mt-1 text-[12px] font-semibold tabular-nums text-[#8C702B]">{formatCurrency(pkg.monthly_return)}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-[11px] leading-5 text-[#89929B]">
              Projected returns are indicative and subject to the applicable
              investment terms and underlying operational performance.
            </p>

            <button
              type="button"
              disabled={!selected}
              onClick={() => setStep("review")}
              className="h-9 w-full shrink-0 bg-[#B9973E] px-5 text-[12px] font-semibold text-white hover:bg-[#A98735] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              Continue
            </button>
          </div>
        </>
      )}

      {step === "review" && selected && (
        <div className="max-w-[820px]">
          <div className="flex items-end justify-between border-b border-[#D8DDE2] pb-3">
            <div>
              <h2 className="text-[15px] font-semibold text-[#202A33]">
                Review investment
              </h2>
              <p className="mt-1 text-[12px] text-[#7A858F]">
                Review the investment details before proceeding to payment.
              </p>
            </div>

            <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#929AA2]">
              02 / 02
            </span>
          </div>

          <div className="mt-5 border border-[#D8DDE2] bg-white">
            <div className="flex items-center gap-3 border-b border-[#D8DDE2] bg-[#F7F8F9] px-6 py-4">
              <ShieldCheck className="h-4 w-4 text-[#9A7A2E]" />

              <div>
                <p className="text-[13px] font-semibold text-[#27323C]">
                  Investment details
                </p>
                <p className="mt-0.5 text-[11px] text-[#7A858F]">
                  Payment will be processed securely through PayFast.
                </p>
              </div>
            </div>

            <dl>
              <div className="grid gap-1 border-b border-[#E5E8EB] px-4 py-4 sm:px-6 md:grid-cols-[220px_1fr] md:gap-0">
                <dt className="text-[12px] text-[#7A858F]">
                  Investment package
                </dt>
                <dd className="text-[13px] font-medium text-[#27323C]">
                  {selected.name}
                </dd>
              </div>

              <div className="grid gap-1 border-b border-[#E5E8EB] px-4 py-4 sm:px-6 md:grid-cols-[220px_1fr] md:gap-0">
                <dt className="text-[12px] text-[#7A858F]">
                  Capital amount
                </dt>
                <dd className="text-[13px] font-medium tabular-nums text-[#27323C]">
                  {formatCurrency(selected.min_amount)}
                </dd>
              </div>

              <div className="grid gap-1 px-4 py-4 sm:px-6 md:grid-cols-[220px_1fr] md:gap-0">
                <dt className="text-[12px] text-[#7A858F]">
                  Projected monthly return
                </dt>
                <dd className="text-[13px] font-medium tabular-nums text-[#8C702B]">
                  {formatCurrency(selected.monthly_return)}
                </dd>
              </div>
            </dl>

            <div className="border-t border-[#D8DDE2] px-4 py-5 sm:px-6">
              <div className="border-l-2 border-[#B9973E] bg-[#FBFAF6] px-4 py-3">
                <p className="text-[11px] leading-5 text-[#596570]">
                  By proceeding, you will be redirected to PayFast to complete
                  payment. The investment status will remain pending until
                  payment has been confirmed.
                </p>
              </div>

              <label className="mt-5 flex items-start gap-3 text-[12px] leading-5 text-[#4D5964]">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(event) =>
                    setTermsAccepted(event.target.checked)
                  }
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#B9973E]"
                />

                <span>
                  I have read and accept the investment{" "}
                  <TermsModal
                    onAccept={() => setTermsAccepted(true)}
                    className="font-medium text-[#8C702B] hover:underline"
                  >
                    Terms &amp; Risk Disclosure
                  </TermsModal>
                  .
                </span>
              </label>

              {error && (
                <div className="mt-4 border border-[#E5C5C5] bg-[#FCF5F5] px-3 py-2.5 text-[12px] text-[#9B3A3A]">
                  {error}
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setStep("select")}
              className="h-9 w-full border border-[#CBD2D8] bg-white px-5 text-[12px] font-medium text-[#4D5964] hover:bg-[#F7F8F9] sm:w-auto"
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleInvestNow}
              disabled={loading || !termsAccepted}
              className="flex h-9 w-full items-center justify-center gap-2 bg-[#B9973E] px-5 text-[12px] font-semibold text-white hover:bg-[#A98735] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              Proceed to payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}