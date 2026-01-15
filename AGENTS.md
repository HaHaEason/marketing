# 宣传内容生成平台 - AGENTS.md

## 1. 项目背景与目标

### 1.1 核心理念
本项目旨在构建一个智能化的宣传内容生成平台。其核心逻辑是从**待营销对象**（Target Audience）和**下单动机**（Purchase Motivation）出发，逆向设计并生成具有针对性的营销内容。

### 1.2 业务流程
1.  **对象分析**: 明确待营销对象的画像（Persona）。
2.  **动机挖掘**: 识别触发下单的关键动机（痛点、爽点、痒点）。
3.  **内容生成**: 基于对象和动机，自动/辅助生成多种形式的营销内容：
    -   **文章**: 软文、评测、深度解析。
    -   **视频**: 短视频脚本、口播文案。
    -   **图文**: 社交媒体海报、朋友圈文案、信息长图。

## 2. 技术栈架构

*   **前端**: React + Next.js + Tailwind CSS
*   **后端**: Python RESTful API + PostgreSQL

## 3. 设计与实现原则

### 3.1 前端 (React + Next.js + Tailwind CSS)

*   **组件化设计 (Atomic Design)**:
    *   遵循原子设计理念，将 UI 拆解为原子 (Atoms)、分子 (Molecules)、组织 (Organisms)。
    *   确保组件的高复用性和单一职责。
*   **样式规范 (Tailwind CSS)**:
    *   优先使用 Utility-first class，避免手写复杂 CSS。
    *   建立统一的 `tailwind.config.js` 主题配置（颜色、字体、间距），确保视觉一致性。
    *   复杂组件样式可抽取为自定义 layer 或组件类，但在 HTML 中保持原子化类名为首选。
*   **数据获取与状态管理**:
    *   利用 Next.js 的 Server Components 和 Server Actions 优化首屏加载和 SEO。
    *   客户端状态管理保持轻量，必要时使用 Context API 或 Zustand，避免过度设计。
*   **响应式与无障碍 (Accessibility)**:
    *   移动端优先 (Mobile First) 的响应式设计策略。
    *   遵循 WAI-ARIA 标准，确保内容可访问性。

### 3.2 后端 (Python RESTful API + PostgreSQL)

*   **依赖与环境管理 (uv)**:
    *   **工具**: 统一使用 `uv` 进行 Python 依赖管理和环境管理。
    *   **版本**: 锁定 Python 版本为 **3.12**。
    *   **执行**: 所有 Python 程序的执行（包括运行服务器、测试、脚本）必须通过 `uv run` 命令进行，严禁直接使用系统 `python` 或未托管的 `venv`。
*   **API 设计 (RESTful)**:
    *   资源导向的 URL 设计 (e.g., `GET /api/audiences`, `POST /api/contents`)。
    *   使用标准 HTTP 状态码准确表达请求结果。
    *   统一的响应体格式 (JSON)，包含 data, error, meta 等字段。
*   **数据库设计 (PostgreSQL)**:
    *   **规范化**: 遵循第三范式 (3NF) 设计表结构，减少数据冗余。
    *   **SQL 管理**: 数据库初始化 SQL 脚本统一保存在 `init_db.sql` 文件中。
    *   **JSONB 使用**: 对于灵活的营销内容属性（如不同平台的元数据），合理利用 JSONB 类型，兼顾关系型的严谨与 NoSQL 的灵活。
*   **代码分层 (Layered Architecture)**:
    *   **Router Layer**: 处理 HTTP 请求与响应。
    *   **Service Layer**: 包含核心业务逻辑（如“从动机生成内容”的算法/逻辑）。
    *   **Repository/DAO Layer**: 封装数据库操作，隔离 SQL 细节。
*   **配置管理**:
    *   使用 `.env` 文件进行环境配置。
    *   必须明确支持并区分 **开发 (dev)**、**生产 (prod)**、**单元测试 (test)** 三种环境的启动配置。
*   **类型安全**:
    *   强制使用 Python Type Hints。
    *   使用 Pydantic 进行数据验证和序列化/反序列化。

### 3.3 运维与流程控制

*   **脚本管理**:
    *   前端和后端均需配备独立的 Shell 脚本来管理项目的生命周期（启动、停止）。
    *   **执行方式**: 后端脚本内部必须封装 `uv run` 命令。
    *   **热加载控制**: 启动脚本需支持参数（如 `--reload` / `--no-reload`）以控制是否开启代码热加载。
    *   **进程与日志**:
        *   启动后必须将进程 **PID** 写入固定目录。
        *   标准输出 (stdout) 和标准错误 (stderr) 必须重定向并保存到固定的**日志目录**。

### 3.4 开发协作规范

*   **需求来源**:
    *   **Project MCP 驱动**: 不依赖静态文档驱动开发。需求来源直接对接 Project MCP 工具提供的 Feature 和 Task 数据。
*   **测试驱动**:
    *   关键业务逻辑（尤其是内容生成算法）需编写单元测试。
