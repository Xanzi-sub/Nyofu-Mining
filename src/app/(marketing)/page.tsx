import { Hero } from "@/components/landing/Hero";
import { ValuePillars } from "@/components/landing/ValuePillars";
import { MissionSection } from "@/components/landing/MissionSection";
import { InvestmentTiers } from "@/components/landing/InvestmentTiers";
import { FAQSection } from "@/components/landing/FAQSection";
import { ButtonLink } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValuePillars />
      <MissionSection />
      <InvestmentTiers />
      <FAQSection />

      <section className="border-b border-[#d9dee3] bg-[#f7f8f9]">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#96782d]">
            Investor Access
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#17212b] sm:text-4xl">
            Begin your investment journey
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[14px] leading-6 text-[#68737d]">
            Create an investor account to review available investment
            opportunities and manage your portfolio through the MCA platform.
          </p>

          <div className="mt-8">
            <ButtonLink href="/signup" size="lg">
              Create Investor Account
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}