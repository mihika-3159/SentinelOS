export default function Progress({ value, max = 100 }: { value: number; max?: number }) {
  const percentage = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
      <div
        className="bg-primary h-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
