const styles = {
  primary: "bg-ember text-white shadow-glow hover:-translate-y-0.5 hover:shadow-lift",
  ghost: "border border-ink/20 text-ink hover:border-ink/50"
};

export default function Button({ children, variant = "primary", href = "#" }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-wide transition ${styles[variant]}`}
    >
      {children}
    </a>
  );
}
