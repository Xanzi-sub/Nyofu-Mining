import {
  ShieldCheck,
  TrendingUp,
  Eye,
  Users,
} from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Structured investment",
    description:
      "A defined process for reviewing packages, completing payment and monitoring investment status.",
  },
  {
    icon: TrendingUp,
    title: "Performance visibility",
    description:
      "Portfolio information and applicable projected returns are presented through a central investor dashboard.",
  },
  {
    icon: Eye,
    title: "Transparent information",
    description:
      "Investment terms, payment records and transaction history remain accessible from your account.",
  },
  {
    icon: Users,
    title: "Responsible operations",
    description:
      "Our approach is centred on responsible mining practices and participation in the formal mining economy.",
  },
];

export function ValuePillars() {
  return (
    <section className="border-b border-[#D9DEE3] bg-[#F7F8F9]">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="border-b border-[#D9DEE3] pb-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#B9973E]">
            Platform principles
          </p>

          <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.025em] text-[#17212B]">
            Built around transparency and control.
          </h2>
        </div>

        <div className="mt-6 grid border-l border-t border-[#D9DEE3] bg-white sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="border-b border-r border-[#D9DEE3] bg-white p-6"
            >
              <pillar.icon className="h-4 w-4 text-[#B9973E]" />

              <h3 className="mt-6 text-[13px] font-semibold text-[#26323D]">
                {pillar.title}
              </h3>

              <p className="mt-2 text-[12px] leading-5 text-[#68737D]">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}