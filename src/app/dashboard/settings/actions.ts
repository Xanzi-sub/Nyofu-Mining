"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function updateProfile(formData: FormData) {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const phoneNumber = String(formData.get("phoneNumber") ?? "").trim();

  if (!fullName) {
    redirect("/dashboard/settings?error=Full+name+is+required.");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: fullName, phone_number: phoneNumber || null })
    .eq("id", user.id);

  if (error) {
    redirect(`/dashboard/settings?error=${encodeURIComponent("Could not update your profile.")}`);
  }

  redirect("/dashboard/settings?message=Profile+updated.");
}
