"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How does Mining Connect Africa work?",
    a: "Mining Connect Africa provides an investment platform through which users can review available investment packages, complete payment and monitor the status of their investments.",
  },
  {
    q: "How are projected returns calculated?",
    a: "The projected return displayed for each package is based on the applicable investment package terms. Actual performance may vary and projected returns should not be interpreted as guaranteed returns.",
  },
  {
    q: "How are payments processed?",
    a: "Investment payments are processed through PayFast. Your investment remains pending until the payment has been successfully confirmed.",
  },
  {
    q: "How can I request a withdrawal?",
    a: "Eligible investors can submit a withdrawal request from their dashboard. Requests are subject to the applicable investment terms and internal review before payment.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="border-b border-[#D9DEE3] bg-white"
    >
      <div className="mx-auto max-w-4xl px-6 py-20">
        <div className="border-b border-[#D9DEE3] pb-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#B9973E]">
            Support
          </p>

          <h2 className="mt-2 text-[27px] font-semibold tracking-[-0.02em] text-[#17212B]">
            Frequently asked questions
          </h2>

          <p className="mt-2 text-[13px] text-[#68737D]">
            Information about investing and managing your account.
          </p>
        </div>

        <div className="mt-2">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className="border-b border-[#D9DEE3]"
            >
              <button
                type="button"
                onClick={() =>
                  setOpen(open === i ? null : i)
                }
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="text-[13px] font-medium text-[#26323D]">
                  {faq.q}
                </span>

                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-[#7A858F]",
                    open === i && "rotate-180"
                  )}
                />
              </button>

              {open === i && (
                <div className="pb-5 pr-10">
                  <p className="text-[12px] leading-5 text-[#68737D]">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}