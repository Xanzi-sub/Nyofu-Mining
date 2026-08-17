import { createHash } from "node:crypto";

const SANDBOX_URL = "https://sandbox.payfast.co.za/eng/process";
const LIVE_URL = "https://www.payfast.co.za/eng/process";

export function getPayfastProcessUrl() {
  const isSandbox = process.env.NEXT_PUBLIC_PAYFAST_SANDBOX !== "false";
  return isSandbox ? SANDBOX_URL : LIVE_URL;
}

/**
 * PayFast expects values URL-encoded with spaces as "+", uppercase hex escapes,
 * and the signature computed over fields in the exact order they are submitted.
 */
function pfEncode(value: string) {
  return encodeURIComponent(value.trim())
    .replace(/%20/g, "+")
    .replace(/%[0-9A-F]{2}/g, (match) => match.toUpperCase());
}

export function buildSignatureString(
  data: Record<string, string | number | undefined>,
  passphrase?: string
) {
  const parts: string[] = [];

  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null || value === "" || key === "signature") {
      continue;
    }
    parts.push(`${key}=${pfEncode(String(value))}`);
  }

  let query = parts.join("&");

  if (passphrase) {
    query += `&passphrase=${pfEncode(passphrase)}`;
  }

  return query;
}

export function generateSignature(
  data: Record<string, string | number | undefined>,
  passphrase?: string
) {
  const query = buildSignatureString(data, passphrase);
  return createHash("md5").update(query).digest("hex");
}

export interface PayfastCheckoutFields {
  merchant_id: string;
  merchant_key: string;
  return_url: string;
  cancel_url: string;
  notify_url: string;
  name_first?: string;
  email_address?: string;
  m_payment_id: string;
  amount: string;
  item_name: string;
  item_description?: string;
  signature: string;
}

export function buildPayfastCheckout(params: {
  merchantId: string;
  merchantKey: string;
  passphrase?: string;
  returnUrl: string;
  cancelUrl: string;
  notifyUrl: string;
  nameFirst?: string;
  email?: string;
  paymentId: string;
  amount: number;
  itemName: string;
  itemDescription?: string;
}): PayfastCheckoutFields {
  const base: Record<string, string | undefined> = {
    merchant_id: params.merchantId,
    merchant_key: params.merchantKey,
    return_url: params.returnUrl,
    cancel_url: params.cancelUrl,
    notify_url: params.notifyUrl,
    name_first: params.nameFirst,
    email_address: params.email,
    m_payment_id: params.paymentId,
    amount: params.amount.toFixed(2),
    item_name: params.itemName,
    item_description: params.itemDescription,
  };

  const signature = generateSignature(base, params.passphrase);

  return {
    merchant_id: base.merchant_id!,
    merchant_key: base.merchant_key!,
    return_url: base.return_url!,
    cancel_url: base.cancel_url!,
    notify_url: base.notify_url!,
    name_first: base.name_first,
    email_address: base.email_address,
    m_payment_id: base.m_payment_id!,
    amount: base.amount!,
    item_name: base.item_name!,
    item_description: base.item_description,
    signature,
  };
}

/** Verifies an ITN payload's signature by recomputing it over the fields in their received order. */
export function verifyItnSignature(
  postData: Record<string, string>,
  passphrase?: string
) {
  const { signature, ...rest } = postData;
  const expected = generateSignature(rest, passphrase);
  return expected === signature;
}

export const PAYFAST_VALID_HOSTS = [
  "www.payfast.co.za",
  "sandbox.payfast.co.za",
  "w1w.payfast.co.za",
  "w2w.payfast.co.za",
];
