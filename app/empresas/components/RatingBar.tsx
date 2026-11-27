type RatingBarProps = {
  label: string;
  value: number;
  max?: number;
};

export default function RatingBar({ label, value, max = 5 }: RatingBarProps) {
  const percent = Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[15px] text-[#12122B]">{label}</span>
        <span className="text-[15px] font-bold text-[#12122B]">
          {value.toFixed(1)}
        </span>
      </div>
      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-[#EEEDFC]"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
      >
        <div
          className="h-full rounded-full bg-[#3730A3]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
