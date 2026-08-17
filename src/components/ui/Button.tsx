import {
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
} from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-[#B9973E] text-white hover:bg-[#A98735]",
  outline:
    "border border-[#B9973E] bg-transparent text-[#B9973E] hover:bg-[#B9973E]/10",
  ghost:
    "text-[#AAB2B9] hover:bg-white/5 hover:text-white",
};

const sizes = {
  md: "h-9 px-4 text-[12px]",
  lg: "h-10 px-5 text-[13px]",
};

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        base,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}

interface ButtonLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  size?: Size;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        base,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}