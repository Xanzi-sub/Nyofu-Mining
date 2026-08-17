"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function MobileMarketingMenu({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-9 w-9 items-center justify-center border border-[#D9DEE3] text-[#4D5964] hover:bg-[#F4F5F6]"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {isOpen && (
        <div className="absolute inset-x-0 top-[72px] z-50 border-b border-[#D9DEE3] bg-white px-6 py-5 shadow-sm">
          <nav className="grid gap-1" aria-label="Mobile navigation">
            <Link href="/#packages" onClick={closeMenu} className="px-3 py-3 text-[13px] font-medium text-[#4D5964] hover:bg-[#F4F5F6]">
              Investment Tiers
            </Link>
            <Link href="/#mission" onClick={closeMenu} className="px-3 py-3 text-[13px] font-medium text-[#4D5964] hover:bg-[#F4F5F6]">
              Our Mission
            </Link>
            <Link href="/#faq" onClick={closeMenu} className="px-3 py-3 text-[13px] font-medium text-[#4D5964] hover:bg-[#F4F5F6]">
              FAQ
            </Link>
            <Link href="/#contact" onClick={closeMenu} className="px-3 py-3 text-[13px] font-medium text-[#4D5964] hover:bg-[#F4F5F6]">
              Contact
            </Link>
            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-[#E4E7E9] pt-4">
              <Link href={isAuthenticated ? "/dashboard" : "/login"} onClick={closeMenu} className="flex h-9 items-center justify-center border border-[#CBD2D8] text-[12px] font-medium text-[#4D5964] hover:bg-[#F4F5F6]">
                {isAuthenticated ? "Dashboard" : "Log in"}
              </Link>
              {!isAuthenticated && (
                <Link href="/signup" onClick={closeMenu} className="flex h-9 items-center justify-center bg-[#B9973E] text-[12px] font-semibold text-white hover:bg-[#A98735]">
                  Get started
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
