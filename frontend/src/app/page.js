import Header from "@/components/organisms/Header";
import FlowStrip from "@/components/organisms/FlowStrip";
import ComponentGrid from "@/components/organisms/ComponentGrid";

const signals = [
  {
    label: "输入",
    text: "目标受众 + 动机标签"
  },
  {
    label: "推理",
    text: "内容策略与结构拆解"
  },
  {
    label: "输出",
    text: "文章、短视频与图文包"
  }
];

export default function Home() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16 md:px-12">
      <Header />

      <section className="grid gap-8 md:grid-cols-[2fr_1fr]">
        <div className="rounded-[32px] border border-ink/10 bg-white/70 p-6 shadow-lift md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
            strategy board
          </p>
          <h2 className="mt-4 font-display text-2xl font-semibold text-ink">
            把复杂的营销内容流程，压缩成 3 个关键输入
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/70">
            平台将受众画像与动机信号映射成内容结构，帮助团队在 15 分钟内完成
            从洞察到交付的全链路决策。
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {signals.map((signal) => (
              <div
                key={signal.label}
                className="rounded-2xl border border-ink/10 bg-canvas/70 px-4 py-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
                  {signal.label}
                </p>
                <p className="mt-3 text-sm font-semibold text-ink">{signal.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="rounded-[28px] border border-ink/10 bg-ink p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              proof
            </p>
            <p className="mt-4 text-3xl font-semibold">87%</p>
            <p className="mt-2 text-sm text-white/70">
              营销素材的改稿次数在首次输出后即可显著降低。
            </p>
          </div>
          <div className="rounded-[28px] border border-ink/10 bg-white/70 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
              focus
            </p>
            <p className="mt-4 text-lg font-semibold text-ink">
              核心指标
            </p>
            <ul className="mt-4 space-y-3 text-sm text-ink/70">
              <li>首屏响应 + 语义模板缓存</li>
              <li>内容一致性评分</li>
              <li>多渠道素材同步</li>
            </ul>
          </div>
        </div>
      </section>

      <FlowStrip />
      <ComponentGrid />

      <section className="rounded-[36px] border border-ink/10 bg-ember/90 p-8 text-white md:p-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              next
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold">
              准备进入实现与验证阶段
            </h2>
            <p className="mt-3 max-w-lg text-sm text-white/80">
              前端已准备好基础架构、组件分层与视觉语言，可立即接入后端 API 并扩展具体业务流程。
            </p>
          </div>
          <div className="rounded-3xl border border-white/20 bg-white/10 px-6 py-4 text-sm text-white/80">
            <p className="font-semibold text-white">建议下一步</p>
            <p className="mt-2">接入 Persona API、动机库与内容生成接口</p>
          </div>
        </div>
      </section>
    </main>
  );
}
