import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ButtonLink } from "@/components/ui/Button";

export async function Header() {
  const isSupabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  let user = null;

  if (isSupabaseConfigured) {
    const supabase = await createClient();

    ({
      data: { user },
    } = await supabase.auth.getUser());
  }

  return (
    <header className="border-b border-[#D9DEE3] bg-white">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Mining Connect Africa"
            width={36}
            height={36}
            className="rounded-sm"
          />

          <div className="hidden sm:block">
            <div className="text-[14px] font-semibold tracking-tight text-[#17212B]">
              Mining Connect Africa
            </div>
            <div className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.12em] text-[#7A858F]">
              Investment Platform
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <Link
            href="/#packages"
            className="text-[12px] font-medium text-[#596570] hover:text-[#17212B]"
          >
            Investment Tiers
          </Link>

          <Link
            href="/#mission"
            className="text-[12px] font-medium text-[#596570] hover:text-[#17212B]"
          >
            Our Mission
          </Link>

          <Link
            href="/#faq"
            className="text-[12px] font-medium text-[#596570] hover:text-[#17212B]"
          >
            FAQ
          </Link>

          <Link
            href="/#contact"
            className="text-[12px] font-medium text-[#596570] hover:text-[#17212B]"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <ButtonLink href="/dashboard" size="md">
              Dashboard
            </ButtonLink>
          ) : (
            <>
              <ButtonLink
                href="/login"
                variant="ghost"
                size="md"
                className="hidden text-[#596570] hover:bg-[#F4F5F6] hover:text-[#17212B] sm:inline-flex"
              >
                Log In
              </ButtonLink>

              <ButtonLink href="/signup" size="md">
                Get Started
              </ButtonLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}