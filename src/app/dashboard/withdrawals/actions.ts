"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requestWithdrawal(formData: FormData) {
  const investmentId = String(formData.get("investmentId") ?? "");
  const amount = Number(formData.get("amount"));

  if (!investmentId || !Number.isFinite(amount) || amount <= 0) {
    redirect("/dashboard/withdrawals?error=Select+an+investment+and+enter+a+valid+amount.");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: investment } = await supabase
    .from("investments")
    .select("id, monthly_return")
    .eq("id", investmentId)
    .eq("user_id", user.id)
    .eq("status", "active")
    .single();

  if (!investment) {
    redirect("/dashboard/withdrawals?error=The+selected+investment+is+not+available+for+a+withdrawal+request.");
  }

  if (amount > Number(investment.monthly_return)) {
    redirect("/dashboard/withdrawals?error=The+request+cannot+exceed+the+projected+monthly+return.");
  }

  const { error } = await supabase.from("withdrawal_requests").insert({
    user_id: user.id,
    investment_id: investment.id,
    amount,
    status: "pending",
  });

  if (error) {
    redirect("/dashboard/withdrawals?error=Could+not+submit+your+withdrawal+request.");
  }

  redirect("/dashboard/withdrawals?message=Withdrawal+request+submitted+for+review.");
}
