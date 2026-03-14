export interface Skill {
  id: string;
  chapter: string;
  title: string;
  subtitle: string;
  description: string;
  author: string;
  category: string;
  page: string;
  status: "active" | "planned";
}

export const skillsEN: Skill[] = [
  {
    id: "project-init",
    chapter: "00",
    title: "Project Initialization",
    subtitle: "Prerequisite",
    description: "Initialize the project, resolve configurations, and prepare the workspace.",
    author: "@akiru6",
    category: "ALL",
    page: "001",
    status: "active",
  },
  {
    id: "document-classifier",
    chapter: "01",
    title: "Document Classifier",
    subtitle: "Smarter Filing",
    description: "Classify and rename unsorted financial documents into a structured taxonomy automatically.",
    author: "@akiru6",
    category: "INVOICING",
    page: "015",
    status: "active",
  },
  {
    id: "invoice-extraction",
    chapter: "02",
    title: "Invoice Extraction",
    subtitle: "Data Extractor",
    description: "Extract structured JSON data (dates, amounts, items) from various invoice formats accurately.",
    author: "@akiru6",
    category: "INVOICING",
    page: "028",
    status: "active",
  },
  {
    id: "invoice-posting",
    chapter: "03",
    title: "Invoice Posting",
    subtitle: "Entry Automation",
    description: "Automatically generate and post double-entry accounting journal entries based on extracted invoice data.",
    author: "@akiru6",
    category: "INVOICING",
    page: "042",
    status: "active",
  },
  {
    id: "expense-reimbursement",
    chapter: "04",
    title: "Expense Reimbursement",
    subtitle: "Claim Processing",
    description: "Process reimbursement claims by validating expenses against receipts and company policies.",
    author: "@akiru6",
    category: "EXPENSES",
    page: "056",
    status: "active",
  },
  {
    id: "bank-reconciliation",
    chapter: "05",
    title: "Bank Reconciliation",
    subtitle: "Audit Assistant",
    description: "Match bank transactions with ledgers automatically to speed up monthly close.",
    author: "@akiru6",
    category: "BANKING",
    page: "---",
    status: "planned",
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
    status: "planned",
  },
  {
    id: "pl-report",
    chapter: "07",
    title: "Simple P&L Generator",
    subtitle: "Visual Analytics",
    description: "Generate a simple Profit & Loss statement based on material purchases, expenses, and sales revenue for solopreneurs.",
    author: "@akiru6",
    category: "REPORTING",
    page: "---",
    status: "planned",
  },
  {
    id: "tax-estimator",
    chapter: "08",
    title: "Freelancer Tax Estimator",
    subtitle: "Tax Compliance",
    description: "Calculate estimated taxes for individual businesses or freelancers based on simplified deduction rules.",
    author: "@akiru6",
    category: "TAX",
    page: "---",
    status: "planned",
  },
];

export const skillsZH: Skill[] = [
  {
    id: "project-init", chapter: "00",
    title: "序章：项目初始化", subtitle: "前置条件",
    description: "初始化项目，解析配置项，并建立统一的工作区环境以供后续所有技能使用。",
    author: "@akiru6", category: "ALL", page: "001", status: "active",
  },
  {
    id: "document-classifier", chapter: "01",
    title: "智能文档分类", subtitle: "文件分发与归档",
    description: "自动识别并分类未整理的财务文件，规范命名并将其归档分类到指定的目录结构。",
    author: "@akiru6", category: "INVOICING", page: "015", status: "active",
  },
  {
    id: "invoice-extraction", chapter: "02",
    title: "提取结构化发票", subtitle: "数据提取器",
    description: "从各种格式的发票中精准提取结构化 JSON 数据（日期、金额、明细）。",
    author: "@akiru6", category: "INVOICING", page: "028", status: "active",
  },
  {
    id: "invoice-posting", chapter: "03",
    title: "自动生成发票凭证", subtitle: "入账自动化",
    description: "基于提取的发票数据，自动生成并录入复式记账的会计凭证。",
    author: "@akiru6", category: "INVOICING", page: "042", status: "active",
  },
  {
    id: "expense-reimbursement", chapter: "04",
    title: "自动化费用报销", subtitle: "报销审批流",
    description: "通过核对发票及公司报销政策，自动处理员工费用报销申请及相关凭证。",
    author: "@akiru6", category: "EXPENSES", page: "056", status: "active",
  },
  {
    id: "bank-reconciliation", chapter: "05",
    title: "银企对账助手", subtitle: "审计辅助",
    description: "自动对齐银行流水与本地账本，极大加快月末结账速度。",
    author: "@akiru6", category: "BANKING", page: "---", status: "planned",
  },
  {
    id: "contract-reviewer", chapter: "06",
    title: "合同审查助手", subtitle: "法务辅助",
    description: "自动审查合同中的商业与财务条款，高亮标注合规风险。",
    author: "Community", category: "CONTRACTS", page: "---", status: "planned",
  },
  {
    id: "pl-report", chapter: "07",
    title: "个体户简易利润表", subtitle: "经营分析",
    description: "针对独立开发者或微型贸易，仅需归集原材料、费用和销售收入即可一键生成收支分析表。",
    author: "@akiru6", category: "REPORTING", page: "---", status: "planned",
  },
  {
    id: "tax-estimator", chapter: "08",
    title: "个体户税务预估", subtitle: "税务合规",
    description: "为个体工商户及自然人提供轻量级的简易税务预估与安全合规提示（如：免税额度监控）。",
    author: "@akiru6", category: "TAX", page: "---", status: "planned",
  },
];
