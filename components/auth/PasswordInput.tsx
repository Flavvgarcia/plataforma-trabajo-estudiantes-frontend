"use client";

import { useState } from "react";
import { AUTH_ERROR_CLASS, AUTH_INPUT_CLASS } from "./useAccessibleValidation";

interface PasswordInputProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  autoComplete: "current-password" | "new-password";
  errorId: string;
  errorMessage: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  minLength?: number;
  pattern?: string;
  describedBy?: string;
  enterKeyHint?: "done" | "next" | "go";
  hintContent?: React.ReactNode;
}

export function PasswordInput({
  id,
  name,
  label,
  placeholder,
  autoComplete,
  errorId,
  errorMessage,
  value,
  onChange,
  required = true,
  minLength,
  pattern,
  describedBy,
  enterKeyHint = "done",
  hintContent,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="group flex flex-col">
      <label
        htmlFor={id}
        className="mb-1.5 text-[13px] leading-[1.35] font-bold text-[#12122B]"
      >
        {label}
      </label>

      {hintContent}

      <div className="relative">
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          enterKeyHint={enterKeyHint}
          required={required}
          minLength={minLength}
          pattern={pattern}
          aria-invalid="false"
          aria-describedby={describedBy}
          data-error={errorId}
          className={`${AUTH_INPUT_CLASS} pr-[48px]`}
        />

        <button
          type="button"
          aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
          aria-pressed={visible}
          onClick={() => setVisible((prev) => !prev)}
          className="absolute top-1/2 right-1 flex h-[44px] w-[44px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-[8px] text-[#4A4A68] transition-colors hover:bg-[#EEEDFC] hover:text-[#3730A3] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#3730A3]"
        >
          {visible ? (
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
              <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>

      <div id={errorId} className={AUTH_ERROR_CLASS}>
        <span role="img" aria-label="Error" className="shrink-0 font-bold">
          !
        </span>
        <span>{errorMessage}</span>
      </div>
    </div>
  );
}
