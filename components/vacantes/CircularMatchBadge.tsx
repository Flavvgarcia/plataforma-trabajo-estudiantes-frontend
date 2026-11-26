interface CircularMatchBadgeProps {
  porcentaje: number;
  size?: number;
}

export function CircularMatchBadge({
  porcentaje,
  size = 56,
}: CircularMatchBadgeProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(porcentaje)));
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clamped / 100) * circumference;

  return (
    <div
      role="img"
      aria-label={`Coincidencia del ${clamped}%`}
      className="relative inline-flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E4E3F1"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#3730A3"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <span className="absolute text-xs font-bold tracking-tight text-[#12122B]">
        {clamped}%
      </span>
    </div>
  );
}
