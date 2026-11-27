"use client";

import { Star } from "lucide-react";
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
      <span className="text-[15px] text-[#12122B]">{label}</span>
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
              aria-pressed={star === value}
              className={`grid size-11 place-items-center rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#3730A3] ${
                active ? "text-[#B45309]" : "text-[#8C8AA8] hover:text-[#B45309]"
              }`}
            >
              <Star
                size={22}
                fill={active ? "currentColor" : "none"}
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
