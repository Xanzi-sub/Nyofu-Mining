import Link from "next/link";
import { AlertCircle, CheckCircle2, ShieldCheck } from "lucide-react";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { login } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
    message?: string;
    redirectTo?: string;
  }>;
}) {
  const { error, message, redirectTo } = await searchParams;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f4f5f6]">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center px-6 py-16">
        <div className="w-full max-w-[430px]">
          {/* Header */}
          <div className="mb-7">
            <div className="mb-5 flex h-10 w-10 items-center justify-center border border-[#d9dee3] bg-white">
              <ShieldCheck className="h-5 w-5 text-[#b9973e]" />
            </div>

            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#96782d]">
              Investor Portal
            </p>

            <h1 className="mt-2 text-[27px] font-semibold tracking-[-0.02em] text-[#17212b]">
              Welcome back
            </h1>

            <p className="mt-2 text-[13px] leading-5 text-[#68737d]">
              Sign in to access your Mining Connect Africa portfolio.
            </p>
          </div>

          {/* Form card */}
          <div className="border border-[#d9dee3] bg-white">
            <div className="border-b border-[#e4e7e9] px-7 py-5">
              <h2 className="text-[14px] font-semibold text-[#26323d]">
                Sign in to your account
              </h2>
              <p className="mt-1 text-[12px] text-[#89929b]">
                Enter your registered credentials below.
              </p>
            </div>

            <div className="px-7 py-7">
              {message && (
                <div className="mb-5 flex items-start gap-2 border border-[#cbdccf] bg-[#f4f9f5] px-4 py-3 text-[12px] leading-5 text-[#2f6b42]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{message}</span>
                </div>
              )}

              {error && (
                <div className="mb-5 flex items-start gap-2 border border-[#e3caca] bg-[#fbf5f5] px-4 py-3 text-[12px] leading-5 text-[#9b3d3d]">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form action={login} className="space-y-5">
                <input
                  type="hidden"
                  name="redirectTo"
                  value={redirectTo ?? "/dashboard"}
                />

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
                    className="h-10 w-full border border-[#cbd2d8] bg-white px-3 text-[13px] text-[#26323d] outline-none transition-colors placeholder:text-[#a0a8af] focus:border-[#b9973e]"
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
                    autoComplete="current-password"
                    placeholder="Enter your password"
                  />
                </div>

                <SubmitButton
                  pendingLabel="Signing in"
                  className="h-10 w-full bg-[#b9973e] px-4 text-[12px] font-semibold text-white transition-colors hover:bg-[#a98735]"
                >
                  Sign in
                </SubmitButton>
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-5 text-center">
            <p className="text-[12px] text-[#7a858f]">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-[#96782d] hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>

          <p className="mt-8 text-center text-[10px] leading-4 text-[#9aa2a9]">
            Mining Connect Africa &middot; Investor Portal
          </p>
        </div>
      </div>
    </div>
  );
}