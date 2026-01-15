export default function FlowStrip() {
  const steps = [
    "对象画像梳理",
    "动机痛点定位",
    "内容模板匹配",
    "多形态输出"
  ];

  return (
    <section
      id="workflow"
      className="rounded-[32px] border border-ink/10 bg-white/70 p-6 md:p-10"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
            workflow
          </p>
          <h2 className="font-display text-2xl font-semibold text-ink">
            以动机为核心的内容生成路径
          </h2>
        </div>
        <p className="max-w-md text-sm text-ink/70">
          通过结构化流程把策略转译成可执行的内容生产动作，让团队对齐同一套语言。
        </p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {steps.map((step, index) => (
          <div
            key={step}
            className="rounded-2xl border border-ink/10 bg-canvas/80 px-4 py-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">
              step {index + 1}
            </p>
            <p className="mt-3 text-sm font-semibold text-ink">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
