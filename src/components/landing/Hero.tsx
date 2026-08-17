import Image from "next/image";
import { FileCheck, ShieldCheck, TrendingUp } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-[#17212B] bg-[#17212B]">
      <Image
        src="/hero.jpg"
        alt="Open-pit mining equipment at sunset"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[#17212B]/65" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 md:py-36">
        <div className="max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#E5BE52]">
            Mining investment platform
          </p>

          <h1 className="mt-5 max-w-3xl text-[34px] font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-[42px] md:text-[52px]">
            Access investment opportunities in Africa&apos;s mining sector.
          </h1>

          <p className="mt-6 max-w-2xl text-[15px] leading-7 text-white/85">
            Mining Connect Africa provides investors with a structured platform to review mining investment opportunities, complete payments securely and monitor their portfolio.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/signup" size="lg" className="w-full sm:w-auto">
              Get started
            </ButtonLink>

            <ButtonLink
              href="#packages"
              variant="outline"
              size="lg"
              className="w-full border-white/70 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
            >
              View investment tiers
            </ButtonLink>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/30 pt-6">
            <TrustItem icon={ShieldCheck} label="Structured platform" />
            <TrustItem icon={TrendingUp} label="Portfolio monitoring" />
            <TrustItem icon={FileCheck} label="Transparent terms" />
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
    <div className="flex items-center gap-2 text-[11px] font-medium text-white/85">
      <Icon className="h-3.5 w-3.5 text-[#E5BE52]" />
      {label}
    </div>
  );
}