"use client";

import { useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

type PasswordInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

export function PasswordInput({
  className,
  ...props
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <input
        {...props}
        type={isVisible ? "text" : "password"}
        className={`h-10 w-full border border-[#CBD2D8] bg-white px-3 pr-10 text-[13px] text-[#26323D] outline-none placeholder:text-[#A1A9B0] focus:border-[#B9973E] ${
          className ?? ""
        }`}
      />

      <button
        type="button"
        onClick={() => setIsVisible((visible) => !visible)}
        aria-label={
          isVisible ? "Hide password" : "Show password"
        }
        title={isVisible ? "Hide password" : "Show password"}
        className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-[#89929B] hover:text-[#4D5964]"
      >
        {isVisible ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}