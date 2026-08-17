"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TERMS_VERSION } from "@/lib/legal";

export async function signup(formData: FormData) {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const phoneNumber = String(formData.get("phoneNumber") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const packageId = String(formData.get("packageId") ?? "");
  const termsAccepted = formData.get("termsAccepted") === "on";

  if (!fullName || !email || !password) {
    redirect(`/signup?error=${encodeURIComponent("Full name, email and password are required.")}`);
  }

  if (password.length < 6) {
    redirect(`/signup?error=${encodeURIComponent("Password must be at least 6 characters.")}`);
  }

  if (!termsAccepted) {
    redirect(`/signup?error=${encodeURIComponent("You must accept the Terms and Risk Disclosure.")}`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone_number: phoneNumber || null,
        terms_accepted_at: new Date().toISOString(),
        terms_version: TERMS_VERSION,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
    },
  });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  const dest = packageId ? `/dashboard/invest?package=${packageId}` : "/dashboard";
  redirect(`/login?message=${encodeURIComponent("Check your email to confirm your account, then log in.")}&redirectTo=${encodeURIComponent(dest)}`);
}
