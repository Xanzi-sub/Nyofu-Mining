"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BriefcaseBusiness,
  Landmark,
  LogOut,
  Receipt,
  Settings,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/app/dashboard/actions";
import { SubmitButton } from "@/components/ui/SubmitButton";

const links = [
  { href: "/dashboard", label: "Portfolio", icon: BriefcaseBusiness },
  { href: "/dashboard/invest", label: "Invest", icon: Wallet },
  { href: "/dashboard/transactions", label: "Activity", icon: Receipt },
  { href: "/dashboard/withdrawals", label: "Withdraw", icon: Landmark },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function MobileDashboardNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Dashboard navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[#D9DEE3] bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <div className="mx-auto grid max-w-lg grid-cols-6">
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
              className={cn(
                "flex min-h-[68px] flex-col items-center justify-center gap-1.5 px-1 text-[10px] font-semibold transition-colors",
                active ? "text-[#96782D]" : "text-[#7A858F]"
              )}
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.2 : 1.9} />
              <span className="max-w-full truncate">{link.label}</span>
            </Link>
          );
        })}
        <form action={logout} className="contents">
          <SubmitButton
            pendingLabel=""
            className="flex min-h-[68px] flex-col items-center justify-center gap-1.5 px-1 text-[10px] font-semibold text-[#7A858F] transition-colors hover:text-[#A64242]"
          >
            <LogOut className="h-[18px] w-[18px]" strokeWidth={1.9} />
            <span>Sign out</span>
          </SubmitButton>
        </form>
      </div>
    </nav>
  );
}
