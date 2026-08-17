import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const displayName =
    profile?.full_name || user.email || "Account holder";

  return (
    <div className="flex min-h-screen bg-[#F4F5F6] text-[#17212B]">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[68px] shrink-0 items-center justify-between border-b border-[#D9DEE3] bg-white px-6 md:px-8">
          <div>
            <Link
              href="/dashboard"
              className="text-[13px] font-medium text-[#4D5964]"
            >
              Dashboard
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-[12px] font-medium text-[#27333E]">
                {displayName}
              </p>

              <p className="mt-0.5 text-[10px] text-[#89929B]">
                Account holder
              </p>
            </div>

            <div className="flex h-8 w-8 items-center justify-center border border-[#D4D9DE] bg-[#F4F5F6] text-[11px] font-semibold text-[#4E5963]">
              {displayName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <main className="min-w-0 flex-1 px-5 py-7 md:px-8 md:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}