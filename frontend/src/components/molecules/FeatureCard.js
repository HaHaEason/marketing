export default function FeatureCard({ title, description, accent }) {
  return (
    <div className="group h-full rounded-3xl border border-ink/10 bg-white/70 p-6 shadow-[0_10px_30px_rgba(20,21,22,0.08)] transition hover:-translate-y-1 hover:shadow-lift">
      <div className={`mb-4 h-10 w-10 rounded-2xl ${accent}`} />
      <h3 className="font-display text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink/70">{description}</p>
    </div>
  );
}
