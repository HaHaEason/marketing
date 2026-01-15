import "./globals.css";

export const metadata = {
  title: "宣传内容生成平台",
  description: "以对象和动机为起点的智能化宣传内容生成平台"
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className="bg-canvas text-ink">
        {children}
      </body>
    </html>
  );
}
