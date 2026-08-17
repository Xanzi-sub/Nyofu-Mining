"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  LayoutDashboard,
  Wallet,
  Receipt,
  Landmark,
  Settings,
  LogOut,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/app/dashboard/actions";
import { SubmitButton } from "@/components/ui/SubmitButton";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/invest",
    label: "Investments",
    icon: Wallet,
  },
  {
    href: "/dashboard/transactions",
    label: "Transactions",
    icon: Receipt,
  },
  {
    href: "/dashboard/withdrawals",
    label: "Withdrawals",
    icon: Landmark,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isNavigating, startNavigation] = useTransition();

  function navigate(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    startNavigation(() => router.push(href));
  }

  return (
    <aside className="flex h-screen w-[240px] shrink-0 flex-col bg-[#17212B] text-white">
      {/* Company identity */}
      <div className="flex h-20 items-center border-b border-r border-[#D9DEE3] bg-white px-5">
        <Link href="/" onClick={(event) => navigate(event, "/")} className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Mining Connect Africa"
            width={64}
            height={64}
            className="h-16 w-16 object-contain"
          />

          <div>
            <p className="text-[13px] font-semibold leading-none text-[#17212B]">
              Mining Connect
            </p>
            <p className="mt-1 text-[10px] text-[#7A858F]">
              Africa
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="px-3 py-6">
        <p className="px-3 pb-2 text-[10px] font-medium text-white/35">
          Account
        </p>

        <div className="space-y-0.5">
          {links.map((link) => {
            const Icon = link.icon;

            const active =
              link.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(event) => navigate(event, link.href)}
                className={cn(
                  "flex h-10 items-center gap-3 border-l-2 px-3 text-[13px] transition-colors",
                  active
                    ? "border-[#C8A951] bg-white/[0.06] text-white"
                    : "border-transparent text-white/55 hover:bg-white/[0.035] hover:text-white"
                )}
              >
                <Icon
                  className={cn(
                    "h-[16px] w-[16px] transition-colors",
                    active ? "text-[#C8A951]" : "text-current"
                  )}
                  strokeWidth={1.7}
                />

                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Sign out */}
      <div className="mt-auto border-t border-white/10 p-3">
        <form action={logout}>
          <SubmitButton
            pendingLabel="Signing out"
            className="flex h-10 w-full items-center gap-3 px-3 text-[13px] text-white/50 transition-colors hover:bg-white/[0.035] hover:text-white"
          >
            <LogOut
              className="h-[16px] w-[16px]"
              strokeWidth={1.7}
            />
            Sign out
          </SubmitButton>
        </form>
      </div>

      {isNavigating && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-white/45 backdrop-blur-sm">
          <div className="flex min-w-32 flex-col items-center gap-3 border border-[#D9DEE3] bg-white px-6 py-5 text-[12px] font-medium text-[#596570]">
            <Loader2 className="h-5 w-5 animate-spin text-[#B9973E]" />
            Loading
          </div>
        </div>
      )}
    </aside>
  );
}