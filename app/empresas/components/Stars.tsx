type StarsProps = {
  rating: number;
  size?: number;
  className?: string;
};

function Star({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M12 2.5l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.52l-5.88 3.09 1.12-6.55-4.76-4.64 6.58-.96L12 2.5z" />
    </svg>
  );
}

function StarRow({ size }: { size: number }) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} size={size} />
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
      aria-label={`${rating} de 5 estrellas`}
    >
      <div className="text-zinc-300">
        <StarRow size={size} />
      </div>
      <div
        className="absolute inset-y-0 left-0 overflow-hidden text-amber-500"
        style={{ width: `${percent}%` }}
      >
        <StarRow size={size} />
      </div>
    </div>
  );
}
