"use client";

import { useEffect, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { TERMS_VERSION } from "@/lib/legal";

type TermsModalProps = {
  children: ReactNode;
  className?: string;
  onAccept?: () => void;
  consentInputId?: string;
};

export function TermsModal({
  children,
  className,
  onAccept,
  consentInputId,
}: TermsModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  function acceptTerms() {
    if (consentInputId) {
      const consentInput = document.getElementById(consentInputId) as HTMLInputElement | null;
      if (consentInput && !consentInput.checked) consentInput.click();
    }

    onAccept?.();
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={className}
      >
        {children}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#17212B]/55 p-4"
          role="presentation"
          onMouseDown={() => setIsOpen(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="terms-title"
            className="flex max-h-[calc(100dvh-2rem)] w-full max-w-2xl flex-col overflow-hidden border border-[#D9DEE3] bg-white"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 flex items-start justify-between border-b border-[#D9DEE3] bg-white px-6 py-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#96782D]">
                  Mining Connect Africa
                </p>
                <h2 id="terms-title" className="mt-1 text-[20px] font-semibold text-[#17212B]">
                  Terms &amp; Risk Disclosure
                </h2>
                <p className="mt-1 text-[11px] text-[#89929B]">Version {TERMS_VERSION}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close terms"
                className="flex h-8 w-8 items-center justify-center text-[#68737D] hover:bg-[#F4F5F6] hover:text-[#17212B]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6">
              <div className="space-y-7 text-[13px] leading-6 text-[#596570]">
              <section>
                <h3 className="text-[14px] font-semibold text-[#26323D]">1. Investment risk</h3>
                <p className="mt-2">All investments involve risk, including the possible loss of some or all capital. Projected returns are estimates only and are not guaranteed. Past performance does not predict future results.</p>
              </section>
              <section>
                <h3 className="text-[14px] font-semibold text-[#26323D]">2. Your decision</h3>
                <p className="mt-2">You confirm that you have reviewed the investment amount, projected monthly return, and associated risks before making an investment. Consider independent financial, legal, and tax advice where appropriate.</p>
              </section>
              <section>
                <h3 className="text-[14px] font-semibold text-[#26323D]">3. Payments and activation</h3>
                <p className="mt-2">Payments are processed by PayFast. An investment remains pending until payment is verified through PayFast&apos;s notification process. Payment confirmation does not alter the risk disclosures above.</p>
              </section>
              <section>
                <h3 className="text-[14px] font-semibold text-[#26323D]">4. Responsible operations</h3>
                <p className="mt-2">Mining Connect Africa supports legal and responsible mining practices. Information presented on this site is provided for transparency and does not constitute a public offer, financial advice, or a guarantee of returns.</p>
              </section>
              <section>
                <h3 className="text-[14px] font-semibold text-[#26323D]">5. Acceptance record</h3>
                <p className="mt-2">We record the date and version of these terms when you create an account and each time you submit a new investment for payment.</p>
              </section>
              </div>
            </div>

            <div className="flex shrink-0 justify-end gap-3 border-t border-[#D9DEE3] bg-[#F7F8F9] px-6 py-4">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="h-9 border border-[#CBD2D8] bg-white px-4 text-[12px] font-medium text-[#4D5964] hover:bg-[#F4F5F6]"
              >
                Close
              </button>
              <button
                type="button"
                onClick={acceptTerms}
                className="h-9 bg-[#B9973E] px-4 text-[12px] font-semibold text-white hover:bg-[#A98735]"
              >
                Accept terms
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
