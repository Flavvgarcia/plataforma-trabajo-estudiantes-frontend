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
        <span className="text-base text-zinc-800">{label}</span>
        <span className="text-base font-bold text-zinc-900">{value.toFixed(1)}</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-200">
        <div
          className="h-full rounded-full bg-indigo-600"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
