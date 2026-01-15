import Button from "../atoms/Button";
import Badge from "../atoms/Badge";

export default function Header() {
  return (
    <header className="flex flex-col gap-6 pb-10 md:flex-row md:items-center md:justify-between">
      <div className="space-y-4">
        <Badge>persona-first</Badge>
        <h1 className="font-display text-4xl font-semibold leading-tight text-ink md:text-5xl">
          宣传内容生成平台
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-ink/70">
          从目标受众的画像与下单动机出发，反向设计内容策略，快速生成可落地的文章、短视频与社交图文。
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button href="#workflow">查看流程</Button>
        <Button variant="ghost" href="#components">
          组件体系
        </Button>
      </div>
    </header>
  );
}
