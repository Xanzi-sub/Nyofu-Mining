import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { InvestForm } from "./InvestForm";

export default async function InvestPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string }>;
}) {
  const { package: preselected } = await searchParams;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: packages } = await supabase
    .from("packages")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });

  return (
    <div className="mx-auto max-w-[1180px]">
      <div className="border-b border-[#D8DDE2] pb-6">
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[#929AA2]">
          <span>Portfolio</span>
          <span>/</span>
          <span>Investment</span>
        </div>

        <h1 className="mt-3 text-[25px] font-semibold tracking-[-0.02em] text-[#17212B]">
          New investment
        </h1>

        <p className="mt-1.5 max-w-2xl text-[13px] leading-5 text-[#68737D]">
          Select an investment package, review the applicable terms and
          proceed to secure payment.
        </p>
      </div>

      <InvestForm
        packages={packages ?? []}
        preselected={preselected}
      />
    </div>
  );
}