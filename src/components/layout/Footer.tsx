import Image from "next/image";
import Link from "next/link";
import { Mail, AtSign, Globe } from "lucide-react";
import { TermsModal } from "@/components/ui/TermsModal";

export function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-[#D9DEE3] bg-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Mining Connect Africa"
                width={34}
                height={34}
                className="rounded-sm"
              />

              <div>
                <p className="text-[14px] font-semibold text-[#17212B]">
                  Mining Connect Africa
                </p>
                <p className="mt-0.5 text-[9px] uppercase tracking-[0.12em] text-[#7A858F]">
                  Investment Platform
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-[12px] leading-5 text-[#68737D]">
              A platform connecting investors with opportunities associated
              with responsible mining operations across Africa.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#B9973E]">
              Contact
            </h4>

            <ul className="mt-4 space-y-3 text-[12px] text-[#68737D]">
              <li className="flex items-center gap-2.5">
                <AtSign className="h-3.5 w-3.5 text-[#9A7A2E]" />
                miningconnectafrica
              </li>

              <li className="flex items-center gap-2.5">
                <Mail className="h-3.5 w-3.5 text-[#9A7A2E]" />
                miningconnectafrica@outlook.com
              </li>

              <li className="flex items-center gap-2.5">
                <Globe className="h-3.5 w-3.5 text-[#9A7A2E]" />
                www.miningconnectafrica.com
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#B9973E]">
              Resources
            </h4>

            <ul className="mt-4 space-y-3 text-[12px] text-[#89929B]">
              <li>
                <Link href="/#packages" className="hover:text-[#17212B]">
                  Investment Tiers
                </Link>
              </li>

              <li>
                <Link href="/#mission" className="hover:text-[#17212B]">
                  Our Mission
                </Link>
              </li>

              <li>
                <Link href="/#faq" className="hover:text-[#17212B]">
                  FAQ
                </Link>
              </li>

              <li>
                <TermsModal className="hover:text-[#17212B]">
                  Terms &amp; Risk Disclosure
                </TermsModal>
              </li>

              <li>
                <Link href="/login" className="hover:text-[#17212B]">
                  Investor Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-[#D9DEE3] pt-5 text-[10px] text-[#7A858F] md:flex-row">
          <p>
            © {new Date().getFullYear()} Mining Connect Africa. All rights
            reserved.
          </p>

          <p>
            Investments are subject to risk. Projected returns are not
            guaranteed.
          </p>
        </div>
      </div>
    </footer>
  );
}