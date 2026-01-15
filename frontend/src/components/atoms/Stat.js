export default function Stat({ label, value }) {
  return (
    <div className="space-y-1 rounded-2xl border border-ink/10 bg-white/70 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
        {label}
      </p>
      <p className="text-lg font-semibold text-ink">{value}</p>
    </div>
  );
}
