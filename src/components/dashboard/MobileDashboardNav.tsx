"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Landmark,
  LayoutDashboard,
  Receipt,
  Settings,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Portfolio", icon: LayoutDashboard },
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
      <div className="mx-auto grid max-w-lg grid-cols-5">
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
                "flex min-h-16 flex-col items-center justify-center gap-1 px-1 text-[9px] font-medium transition-colors",
                active ? "text-[#96782D]" : "text-[#7A858F]"
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={active ? 2 : 1.7} />
              <span className="max-w-full truncate">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
