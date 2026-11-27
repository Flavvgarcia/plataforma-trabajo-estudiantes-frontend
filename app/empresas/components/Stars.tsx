import { Star } from "lucide-react";

type StarsProps = {
  rating: number;
  size?: number;
  className?: string;
};

function StarRow({ size }: { size: number }) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={size}
          fill="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
          className="shrink-0"
        />
      ))}
    </div>
  );
}

export default function Stars({ rating, size = 18, className = "" }: StarsProps) {
  const clamped = Math.max(0, Math.min(5, rating));
  const percent = (clamped / 5) * 100;

  return (
    <div
      className={`relative inline-flex ${className}`}
      role="img"
      aria-label={`${rating.toFixed(1)} de 5 estrellas`}
    >
      <div className="text-[#C9C7DD]">
        <StarRow size={size} />
      </div>
      <div
        className="absolute inset-y-0 left-0 overflow-hidden text-[#B45309]"
        style={{ width: `${percent}%` }}
      >
        <StarRow size={size} />
      </div>
    </div>
  );
}
