import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { verifyItnSignature } from "@/lib/payfast";
import type { PaymentStatus } from "@/lib/types/database";

// PayFast's server-to-server endpoint used to confirm that an ITN payload genuinely
// originated from PayFast (recommended validation step alongside signature checking).
function getValidateUrl() {
  const isSandbox = process.env.NEXT_PUBLIC_PAYFAST_SANDBOX !== "false";
  return isSandbox
    ? "https://sandbox.payfast.co.za/eng/query/validate"
    : "https://www.payfast.co.za/eng/query/validate";
}

export async function POST(request: Request) {
  const rawBody = await request.text();

  // Preserve field order exactly as received — required for signature verification.
  const params = new URLSearchParams(rawBody);
  const data: Record<string, string> = {};
  for (const [key, value] of params.entries()) {
    data[key] = value;
  }

  const signatureValid = verifyItnSignature(data, process.env.PAYFAST_PASSPHRASE);
  if (!signatureValid) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  try {
    const validateResponse = await fetch(getValidateUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: rawBody,
    });
    const validateText = (await validateResponse.text()).trim();
    if (validateText !== "VALID") {
      return NextResponse.json({ error: "PayFast could not validate this payload." }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Could not reach PayFast for validation." }, { status: 502 });
  }

  const investmentId = data.m_payment_id;
  const paymentStatusValue = (data.payment_status ?? "FAILED").toUpperCase();
  const paymentStatuses: PaymentStatus[] = ["COMPLETE", "PENDING", "FAILED"];
  const amount = Number(data.amount_gross ?? data.amount ?? 0);

  if (!investmentId) {
    return NextResponse.json({ error: "Missing m_payment_id." }, { status: 400 });
  }

  if (!paymentStatuses.includes(paymentStatusValue as PaymentStatus) || !Number.isFinite(amount)) {
    return NextResponse.json({ error: "Invalid payment status or amount." }, { status: 400 });
  }

  if (
    process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID &&
    data.merchant_id !== process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID
  ) {
    return NextResponse.json({ error: "Unexpected merchant." }, { status: 400 });
  }

  const paymentStatus = paymentStatusValue as PaymentStatus;

  const supabase = createAdminClient();

  const { data: investment, error: investmentError } = await supabase
    .from("investments")
    .select("id, user_id, amount")
    .eq("id", investmentId)
    .single();

  if (investmentError || !investment) {
    return NextResponse.json({ error: "Investment not found." }, { status: 404 });
  }

  if (amount !== Number(investment.amount)) {
    return NextResponse.json({ error: "Payment amount does not match investment." }, { status: 400 });
  }

  if (data.pf_payment_id) {
    const { data: existingPayment, error: existingPaymentError } = await supabase
      .from("payments")
      .select("id")
      .eq("payfast_payment_id", data.pf_payment_id)
      .maybeSingle();

    if (existingPaymentError) {
      return NextResponse.json({ error: "Could not check payment status." }, { status: 500 });
    }

    if (existingPayment) {
      return new NextResponse("OK", { status: 200 });
    }
  }

  const { error: paymentError } = await supabase.from("payments").insert({
    investment_id: investment.id,
    user_id: investment.user_id,
    payfast_payment_id: data.pf_payment_id ?? null,
    amount,
    status: paymentStatus,
    pf_payment_data: data,
  });

  if (paymentError) {
    return NextResponse.json({ error: "Could not record payment." }, { status: 500 });
  }

  if (paymentStatus === "COMPLETE") {
    const { error: investmentUpdateError } = await supabase
      .from("investments")
      .update({ status: "active" })
      .eq("id", investment.id);

    if (investmentUpdateError) {
      return NextResponse.json({ error: "Could not activate investment." }, { status: 500 });
    }
  }

  return new NextResponse("OK", { status: 200 });
}
