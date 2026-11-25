"use client";

import Image from "next/image";
import googleIcon from "./assets/google-icon.svg";

interface GoogleAuthButtonProps {
  label?: string;
  disabled?: boolean;
  onClick: () => void;
}

export function GoogleAuthButton({
  label = "Continuar con Google",
  disabled = false,
  onClick,
}: GoogleAuthButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="mt-4 flex min-h-[54px] w-full cursor-pointer items-center justify-center gap-3 rounded-[12px] border-2 border-[#3730A3] bg-[#3730A3] px-4 text-[16px] leading-none font-bold text-white transition-colors hover:border-[#2E2785] hover:bg-[#2E2785] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3730A3] disabled:cursor-not-allowed disabled:opacity-65"
    >
      <span
        aria-hidden="true"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white"
      >
        <Image
          src={googleIcon}
          alt=""
          width={20}
          height={20}
          className="block h-[20px] w-[20px]"
        />
      </span>
      <span>{label}</span>
    </button>
  );
}
