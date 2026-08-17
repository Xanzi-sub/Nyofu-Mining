import { redirect } from "next/navigation";
import { CheckCircle2, AlertCircle, UserRound } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { updateProfile } from "./actions";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { error, message } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone_number")
    .eq("id", user.id)
    .single();

  return (
    <div className="mx-auto max-w-2xl">
      <div className="border-b border-[#D9DEE3] pb-6">
        <h1 className="text-[25px] font-semibold text-[#17212B]">Settings</h1>
        <p className="mt-1.5 text-[13px] text-[#68737D]">
          Keep your contact details current for investment and payout communication.
        </p>
      </div>

      <section className="mt-7 border border-[#D9DEE3] bg-white p-4 sm:p-6">
        <div className="flex items-center gap-3 border-b border-[#E4E7E9] pb-5">
          <UserRound className="h-5 w-5 text-[#B9973E]" />
          <div>
            <h2 className="text-[15px] font-semibold text-[#26323D]">Profile details</h2>
            <p className="mt-1 text-[12px] text-[#7A858F]">Your email address is managed by your sign-in account.</p>
          </div>
        </div>

        {message && (
          <p className="mt-5 flex items-center gap-2 text-[12px] text-emerald-700">
            <CheckCircle2 className="h-4 w-4" /> {message}
          </p>
        )}
        {error && (
          <p className="mt-5 flex items-center gap-2 text-[12px] text-red-700">
            <AlertCircle className="h-4 w-4" /> {error}
          </p>
        )}

        <form action={updateProfile} className="mt-6 space-y-5">
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-[#4D5964]">Full name</label>
            <input
              name="fullName"
              required
              defaultValue={profile?.full_name ?? ""}
              className="h-10 w-full border border-[#CBD2D8] px-3 text-[13px] text-[#26323D] outline-none focus:border-[#B9973E]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-[#4D5964]">Phone number</label>
            <input
              name="phoneNumber"
              type="tel"
              defaultValue={profile?.phone_number ?? ""}
              placeholder="+27 82 123 4567"
              className="h-10 w-full border border-[#CBD2D8] px-3 text-[13px] text-[#26323D] outline-none focus:border-[#B9973E]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-medium text-[#4D5964]">Email address</label>
            <input
              type="email"
              value={user.email ?? ""}
              disabled
              className="h-10 w-full border border-[#E4E7E9] bg-[#F7F8F9] px-3 text-[13px] text-[#7A858F]"
            />
          </div>
          <SubmitButton pendingLabel="Saving" className="h-9 w-full bg-[#B9973E] px-4 text-[12px] font-semibold text-white hover:bg-[#A98735] sm:w-auto">
            Save changes
          </SubmitButton>
        </form>
      </section>
    </div>
  );
}
