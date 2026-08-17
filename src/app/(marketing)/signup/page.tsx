import Link from "next/link";
import { AlertCircle, ShieldCheck } from "lucide-react";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { TermsModal } from "@/components/ui/TermsModal";
import { signup } from "./actions";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
    package?: string;
  }>;
}) {
  const { error, package: packageId } = await searchParams;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f4f5f6]">
      <div className="mx-auto flex max-w-6xl justify-center px-6 py-12 sm:py-16">
        <div className="w-full max-w-[500px]">
          {/* Header */}
          <div className="mb-7">
            <div className="mb-5 flex h-10 w-10 items-center justify-center border border-[#d9dee3] bg-white">
              <ShieldCheck className="h-5 w-5 text-[#b9973e]" />
            </div>

            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#96782d]">
              Investor Registration
            </p>

            <h1 className="mt-2 text-[27px] font-semibold tracking-[-0.02em] text-[#17212b]">
              Create your account
            </h1>

            <p className="mt-2 text-[13px] leading-5 text-[#68737d]">
              Register for secure access to the Mining Connect Africa investor
              portal.
            </p>
          </div>

          {/* Form */}
          <div className="border border-[#d9dee3] bg-white">
            <div className="border-b border-[#e4e7e9] px-7 py-5">
              <h2 className="text-[14px] font-semibold text-[#26323d]">
                Account details
              </h2>
              <p className="mt-1 text-[12px] text-[#89929b]">
                Please provide accurate information for your investor account.
              </p>
            </div>

            <div className="px-7 py-7">
              {error && (
                <div className="mb-5 flex items-start gap-2 border border-[#e3caca] bg-[#fbf5f5] px-4 py-3 text-[12px] leading-5 text-[#9b3d3d]">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form action={signup} className="space-y-5">
                {packageId && (
                  <input
                    type="hidden"
                    name="packageId"
                    value={packageId}
                  />
                )}

                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-1.5 block text-[12px] font-medium text-[#4d5964]"
                  >
                    Full name
                  </label>

                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    required
                    autoComplete="name"
                    placeholder="John Doe"
                    className="h-10 w-full border border-[#cbd2d8] bg-white px-3 text-[13px] text-[#26323d] outline-none placeholder:text-[#a0a8af] focus:border-[#b9973e]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="mb-1.5 block text-[12px] font-medium text-[#4d5964]"
                  >
                    Phone number
                  </label>

                  <input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    autoComplete="tel"
                    placeholder="+27 82 123 4567"
                    className="h-10 w-full border border-[#cbd2d8] bg-white px-3 text-[13px] text-[#26323d] outline-none placeholder:text-[#a0a8af] focus:border-[#b9973e]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-[12px] font-medium text-[#4d5964]"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="h-10 w-full border border-[#cbd2d8] bg-white px-3 text-[13px] text-[#26323d] outline-none placeholder:text-[#a0a8af] focus:border-[#b9973e]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-[12px] font-medium text-[#4d5964]"
                  >
                    Password
                  </label>

                  <PasswordInput
                    id="password"
                    name="password"
                    required
                    minLength={6}
                    autoComplete="new-password"
                    placeholder="At least 6 characters"
                  />
                </div>

                <div className="border-t border-[#e4e7e9] pt-5">
                  <label className="flex items-start gap-3 text-[12px] leading-5 text-[#68737d]">
                    <input
                      id="signup-terms-accepted"
                      type="checkbox"
                      name="termsAccepted"
                      required
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[#b9973e]"
                    />

                    <span>
                      I have read and accept the{" "}
                      <TermsModal
                        consentInputId="signup-terms-accepted"
                        className="font-medium text-[#96782d] hover:underline"
                      >
                        Terms &amp; Risk Disclosure
                      </TermsModal>
                      .
                    </span>
                  </label>
                </div>

                <SubmitButton
                  pendingLabel="Creating account"
                  className="h-10 w-full bg-[#b9973e] px-4 text-[12px] font-semibold text-white transition-colors hover:bg-[#a98735]"
                >
                  Create account
                </SubmitButton>
              </form>
            </div>
          </div>

          <p className="mt-5 text-center text-[12px] text-[#7a858f]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-[#96782d] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}