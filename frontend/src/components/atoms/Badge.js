export default function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink/70">
      {children}
    </span>
  );
}
