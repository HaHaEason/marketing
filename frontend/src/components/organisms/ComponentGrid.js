import FeatureCard from "../molecules/FeatureCard";
import Stat from "../atoms/Stat";

export default function ComponentGrid() {
  const features = [
    {
      title: "Persona 看板",
      description: "结构化沉淀受众画像，标记行业背景、触发场景与内容偏好。",
      accent: "bg-ember/80"
    },
    {
      title: "动机雷达",
      description: "拆解痛点、爽点、痒点，定义驱动购买的核心语言。",
      accent: "bg-teal/80"
    },
    {
      title: "内容工作台",
      description: "多模板输出，支持软文、脚本、海报，一键打包交付。",
      accent: "bg-moss/80"
    }
  ];

  return (
    <section id="components" className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">
            modules
          </p>
          <h2 className="font-display text-2xl font-semibold text-ink">
            原子化组件与业务模块
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Stat label="模板库" value="24+" />
          <Stat label="内容形态" value="3类" />
          <Stat label="协作角色" value="6位" />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}
