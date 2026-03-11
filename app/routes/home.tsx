/**
 * 🎓 Remix 核心概念：Route 文件
 *
 * 在 Lovable (Vite SPA) 里，这个文件只是一个普通的 React 组件：
 *   export default function Index() { return <div>...</div> }
 *
 * 在 Remix 里，一个 Route 文件可以同时包含：
 * 1. meta()   → SEO 元数据 (title, description)
 * 2. loader() → 服务端数据获取 (这段代码运行在 Node.js 上，浏览器看不到！)
 * 3. action() → 服务端表单处理 (处理 POST 请求)
 * 4. default  → 页面 UI (React 组件)
 *
 * 这就是 Remix 的核心优势：前后端写在同一个文件里。
 */

import type { Route } from "./+types/home";
import { Outlet, useSearchParams } from "react-router";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";

/**
 * 🎓 meta() — SEO 元数据
 *
 * 在 Lovable 里，title 和 description 写死在 index.html 的 <head> 里。
 * Remix 没有 index.html，所以用 meta() 函数来声明。
 *
 * 好处：每个页面可以有不同的 title/description！
 * 而且因为是 SSR，搜索引擎爬虫直接就能读到。
 */
export function meta({ }: Route.MetaArgs) {
  return [
    { title: "SkillBooks — The Ultimate Accounting Skills Playbook" },
    {
      name: "description",
      content:
        "发现可复用的会计自动化技能，专为一人公司打造。即插即用，轻松管理财务。",
    },
  ];
}

/**
 * 🎓 loader() — 服务端数据获取
 *
 * 这是 Remix 最核心的概念！这个函数：
 * - 运行在 Node.js 服务器上（不是浏览器！）
 * - 在页面渲染之前执行
 * - 返回的数据可以在组件里通过 useLoaderData() 获取
 *
 * 现在我们先返回静态数据（和 Lovable 一样是硬编码的），
 * 但未来你可以在这里：
 * - 查询数据库：const skills = await db.query(...)
 * - 调用外部 API：const data = await fetch(...)
 * - 读取环境变量：process.env.DATABASE_URL
 * - 做权限检查：if (!user) throw redirect("/login")
 *
 * 浏览器永远看不到这段代码，所以可以安全地放数据库密码等敏感信息。
 */
export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const lang = url.searchParams.get("lang") === "en" ? "en" : "zh";

  const skillsEN = [
    {
      id: "invoice-extraction",
      chapter: "01",
      title: "Invoice Extraction",
      subtitle: "Data Extractor",
      description: "Extract structured JSON data (dates, amounts, items) from various invoice formats accurately.",
      author: "@akiru6",
      category: "INVOICING",
      page: "012",
      status: "active" as const,
    },
    {
      id: "invoice-posting",
      chapter: "02",
      title: "Invoice Posting",
      subtitle: "Entry Automation",
      description: "Automatically generate and post double-entry accounting journal entries based on extracted invoice data.",
      author: "@akiru6",
      category: "EXPENSES",
      page: "024",
      status: "active" as const,
    },
    {
      id: "tax-estimator",
      chapter: "03",
      title: "Quarterly Tax Estimator",
      subtitle: "Tax Compliance",
      description: "Automatically calculate quarterly estimated tax payments based on income and expenses.",
      author: "@akiru6",
      category: "TAX",
      page: "---",
      status: "planned" as const,
    },
    {
      id: "bank-reconciliation",
      chapter: "04",
      title: "Bank Reconciliation",
      subtitle: "Audit Assistant",
      description: "Match bank transactions with ledgers automatically to speed up monthly close.",
      author: "@akiru6",
      category: "BANKING",
      page: "---",
      status: "planned" as const,
    },
    {
      id: "pl-report",
      chapter: "05",
      title: "P&L Report Generator",
      subtitle: "Visual Analytics",
      description: "Generate 1-click Profit & Loss statements filtering by month, quarter, or year.",
      author: "@akiru6",
      category: "REPORTING",
      page: "---",
      status: "planned" as const,
    },
    {
      id: "contract-reviewer",
      chapter: "06",
      title: "Contract Reviewer",
      subtitle: "Legal Assistant",
      description: "Auto-review financial clauses in contracts and highlight potential compliance risks.",
      author: "Community",
      category: "CONTRACTS",
      page: "---",
      status: "planned" as const,
    },
  ];

  const skillsZH = [
    {
      id: "invoice-extraction", chapter: "01",
      title: "提取结构化发票", subtitle: "数据提取器",
      description: "从各种格式的发票中精准提取结构化 JSON 数据（日期、金额、明细）。",
      author: "@akiru6", category: "INVOICING", page: "012", status: "active" as const,
    },
    {
      id: "invoice-posting", chapter: "02",
      title: "自动生成凭证", subtitle: "入账自动化",
      description: "基于提取的发票数据，自动生成并录入复式记账凭证。",
      author: "@akiru6", category: "EXPENSES", page: "024", status: "active" as const,
    },
    {
      id: "tax-estimator", chapter: "03",
      title: "季度预估税款", subtitle: "税务合规",
      description: "根据收入和支出自动计算并生成季度预估税款报告。",
      author: "@akiru6", category: "TAX", page: "---", status: "planned" as const,
    },
    {
      id: "bank-reconciliation", chapter: "04",
      title: "银企对账助手", subtitle: "审计辅助",
      description: "自动对齐银行流水与本地账本，极大加快月末结账速度。",
      author: "@akiru6", category: "BANKING", page: "---", status: "planned" as const,
    },
    {
      id: "pl-report", chapter: "05",
      title: "利润与损失表", subtitle: "可视化分析",
      description: "一键生成损益表，支持按月、季度或年度自由筛选对比。",
      author: "@akiru6", category: "REPORTING", page: "---", status: "planned" as const,
    },
    {
      id: "contract-reviewer", chapter: "06",
      title: "合同审查助手", subtitle: "法务辅助",
      description: "自动审查合同中的财务条款，并高亮标注潜在合规风险。",
      author: "Community", category: "CONTRACTS", page: "---", status: "planned" as const,
    },
  ];

  return { skills: lang === "zh" ? skillsZH : skillsEN };
}

/**
 * 🎓 default export — 页面 UI
 *
 * 这和 Lovable 的 pages/Index.tsx 几乎一样，
 * 唯一区别是数据从 loader 获取，而不是硬编码在组件里。
 *
 * loaderData 是 loader() 返回的数据，Remix 自动注入。
 */
export default function Home({ loaderData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang") === "en" ? "en" : "zh";

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <SkillsSection skills={loaderData.skills} />

      {/* Footer */}
      <footer className="border-t-[2.5px] border-border px-6 py-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-sm text-muted-foreground">
            {lang === "zh" ? "© 2026 SkillBooks · 财税技能完全手册" : "© 2026 SkillBooks · Accounting Skills Playbook"}
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="#"
              className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Discord
            </a>
            <a
              href="#"
              className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </a>
          </div>
        </div>
      </footer>

      {/* 🔮 嵌套路由 Outlet：当访问 /skills/:id 时，这里会渲染出 SkillDetail 遮罩层 */}
      <Outlet />
    </div>
  );
}
