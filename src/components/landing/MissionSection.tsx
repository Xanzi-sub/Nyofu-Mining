import {
  AlertTriangle,
  HardHat,
  HeartHandshake,
  Scale,
} from "lucide-react";

const points = [
  {
    icon: Scale,
    title: "Regulatory compliance",
    description:
      "Mining operations associated with the platform are intended to operate within applicable licensing and regulatory requirements.",
  },
  {
    icon: HardHat,
    title: "Operational responsibility",
    description:
      "Responsible mining practices include appropriate safety standards, equipment and operating procedures.",
  },
  {
    icon: HeartHandshake,
    title: "Community participation",
    description:
      "Responsible mining can contribute to employment, local economic activity and community development.",
  },
];

export function MissionSection() {
  return (
    <section
      id="mission"
      className="border-b border-[#D9DEE3] bg-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#B9973E]">
              <AlertTriangle className="h-3.5 w-3.5" />
              Our approach
            </p>

            <h2 className="mt-5 max-w-xl text-[30px] font-semibold leading-tight tracking-[-0.025em] text-[#17212B]">
              Supporting a more responsible approach to African mining.
            </h2>

            <p className="mt-6 max-w-xl text-[13px] leading-6 text-[#68737D]">
              Mining Connect Africa is built around the principle that
              investment in the mining sector should be structured around
              responsible operations, transparency and appropriate
              regulatory compliance.
            </p>
          </div>

          <div className="border-t border-[#D9DEE3]">
            {points.map((point) => (
              <div
                key={point.title}
                className="grid grid-cols-[32px_1fr] gap-4 border-b border-[#D9DEE3] py-5"
              >
                <div className="flex h-7 w-7 items-center justify-center border border-[#D9DEE3] bg-[#F7F8F9]">
                  <point.icon className="h-3.5 w-3.5 text-[#B9973E]" />
                </div>

                <div>
                  <h3 className="text-[13px] font-semibold text-[#26323D]">
                    {point.title}
                  </h3>

                  <p className="mt-1.5 text-[12px] leading-5 text-[#68737D]">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}