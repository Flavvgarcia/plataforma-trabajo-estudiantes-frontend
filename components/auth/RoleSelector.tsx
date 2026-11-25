"use client";

import type { UserRole } from "./authService";

interface RoleSelectorProps {
  role: UserRole;
  onChange: (role: UserRole) => void;
}

const ROLE_OPTIONS: ReadonlyArray<{ value: UserRole; label: string }> = [
  { value: "estudiante", label: "Soy estudiante" },
  { value: "empresa", label: "Soy empresa" },
];

export function RoleSelector({ role, onChange }: RoleSelectorProps) {
  return (
    <fieldset className="m-0 border-0 p-0">
      <legend className="sr-only">Tipo de cuenta</legend>
      <div className="grid grid-cols-2 gap-[10px]">
        {ROLE_OPTIONS.map((option) => {
          const isSelected = role === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(option.value)}
              className={`flex min-h-[48px] w-full cursor-pointer items-center justify-center rounded-[12px] border-2 border-[#3730A3] px-3 text-[15px] leading-none font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3730A3] ${
                isSelected
                  ? "bg-[#3730A3] text-white"
                  : "bg-white text-[#3730A3] hover:bg-[#EEEDFC]"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
