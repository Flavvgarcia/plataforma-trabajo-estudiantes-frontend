"use client";

import { useState } from "react";

type StarPickerProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

export default function StarPicker({ label, value, onChange }: StarPickerProps) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-zinc-800">{label}</span>
      <div className="flex items-center" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((star) => {
          const active = star <= (hover || value);

          return (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              onMouseEnter={() => setHover(star)}
              aria-label={`${label}: ${star} de 5 estrellas`}
              className={`p-0.5 transition-colors ${
                active
                  ? "text-amber-500"
                  : "text-zinc-300 hover:text-amber-400"
              }`}
            >
              <svg
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2.5l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.52l-5.88 3.09 1.12-6.55-4.76-4.64 6.58-.96L12 2.5z" />
              </svg>
            </button>
          );
        })}
      </div>
    </div>
  );
}
