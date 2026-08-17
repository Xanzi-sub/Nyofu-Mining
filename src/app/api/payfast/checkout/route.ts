import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { buildPayfastCheckout, getPayfastProcessUrl } from "@/lib/payfast";
import { TERMS_VERSION } from "@/lib/legal";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const packageId = body?.packageId as string | undefined;
  const termsAccepted = body?.termsAccepted === true;

  if (!packageId) {
    return NextResponse.json({ error: "packageId is required." }, { status: 400 });
  }

  if (!termsAccepted) {
    return NextResponse.json(
      { error: "You must accept the investment terms before proceeding." },
      { status: 400 }
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const isSandbox = process.env.NEXT_PUBLIC_PAYFAST_SANDBOX !== "false";
  const siteHost = new URL(siteUrl).hostname;

  if (!isSandbox && (siteHost === "localhost" || siteHost === "127.0.0.1")) {
    return NextResponse.json(
      {
        error:
          "Live PayFast checkout requires a public HTTPS site URL. Set NEXT_PUBLIC_SITE_URL to your deployed domain before accepting payments.",
      },
      { status: 400 }
    );
  }

  const { data: pkg, error: pkgError } = await supabase
    .from("packages")
    .select("*")
    .eq("id", packageId)
    .eq("active", true)
    .single();

  if (pkgError || !pkg) {
    return NextResponse.json({ error: "Investment package not found." }, { status: 404 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const { data: investment, error: investError } = await supabase
    .from("investments")
    .insert({
      user_id: user.id,
      package_id: pkg.id,
      amount: pkg.min_amount,
      monthly_return: pkg.monthly_return,
      status: "pending",
      terms_accepted_at: new Date().toISOString(),
      terms_version: TERMS_VERSION,
    })
    .select()
    .single();

  if (investError || !investment) {
    console.error("Could not create investment:", investError);

    if (investError?.code === "42703") {
      return NextResponse.json(
        { error: "Your database schema is out of date. Run 0002_legal_consent_and_withdrawals.sql in Supabase." },
        { status: 500 }
      );
    }

    return NextResponse.json({ error: "Could not create investment." }, { status: 500 });
  }

  const fields = buildPayfastCheckout({
    merchantId: process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID!,
    merchantKey: process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY!,
    passphrase: process.env.PAYFAST_PASSPHRASE,
    returnUrl: `${siteUrl}/dashboard/invest/success?investment=${investment.id}`,
    cancelUrl: `${siteUrl}/dashboard/invest/cancel?investment=${investment.id}`,
    notifyUrl: `${siteUrl}/api/webhooks/payfast`,
    nameFirst: profile?.full_name,
    email: user.email,
    paymentId: investment.id,
    amount: Number(pkg.min_amount),
    itemName: `MCA ${pkg.name} Investment`,
    itemDescription: `Mining Connect Africa - ${pkg.name} tier investment`,
  });

  return NextResponse.json({
    url: getPayfastProcessUrl(),
    fields,
  });
}
