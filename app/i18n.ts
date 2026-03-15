export type Language = "en" | "zh";

export const translations = {
    en: {
        hero: {
            titleBase: "The Ultimate",
            titleBaseLine1: "The Ultimate",
            titleBaseLine2: "",
            titleHighlight: "Accounting Skills",
            titleSuffix: "Playbook for",
            titleUnderline: "Solopreneurs",
            description: "Discover reusable accounting automation skills tailored for solopreneurs. Plug & play to manage your finance effortlessly.",
            browseSkills: "Browse Skills",
            whatIsSkill: "What is a Skill?",
        },
        langPanel: {
            edition: "§ Edition & Language",
            preferences: "Reading Preferences",
            enDefault: "International (English)",
            zhWip: "中文 (Default)",
            active: "ACTIVE",
            switch: "SWITCH",
            disclaimer: "* The playbook is currently designed with Chinese as the primary language. The English translation is provided as the International edition."
        },
        guide: {
            newToSkills: "✨ New to Skills?",
            definitionPrefix: "A Skill is a ",
            definitionHighlight: "portable folder",
            definitionSuffix1: " that gives any AI agent ",
            definitionSuffix2: "superpowers",
            description: "Drop it in, and your agent knows how to handle invoicing, taxes, and more. 🚀",
            clickToPeek: "click any item to peek inside!",
            items: {
                skillMd: "The Brain — metadata & instructions",
                scripts: "Executable automations",
                references: "Static docs & knowledge",
                assets: "Templates & resources"
            },
            toolLabel: "Your AI Tool",
            toolTabs: {
                antigravity: "Antigravity",
                claude: "Claude",
                openclaw: "OpenClaw",
            },
            rootLabels: {
                antigravity: "your-project/",
                claude: "your-project/",
                openclaw: "openclaw/",
            },
            rootHints: {
                antigravity: "Your project root",
                claude: "Your project root",
                openclaw: "OpenClaw home directory",
            },
            directoryPaths: {
                antigravity: ".agents/skills/my-skill/",
                claude: ".claude/skills/my-skill/",
                openclaw: "skills/my-skill/",
            },
            pathHints: {
                projectRoot: "Your project root",
                fixedPath: "Fixed path (do not modify)",
                skillFolder: "Your skill folder (customizable name)",
            },
            titleBarPaths: {
                antigravity: ".agents/skills/",
                claude: ".claude/skills/",
                openclaw: "skills/",
            },
            peek: {
                skillMd: {
                    title: "SKILL.md",
                    description: "The brain of the skill. It defines the core instructions, required inputs, and the role the AI agent will play.",
                },
                scripts: {
                    title: "scripts/",
                    description: "Executable files. The AI agent can trigger these scripts during its workflow to process data or call external APIs.",
                    file1: "run_audit.py",
                    comment1: "# Core processing logic",
                    file2: "validate.py",
                    comment2: "# Data verification",
                    file3: "generate_pdf.js",
                    comment3: "# PDF compilation",
                },
                references: {
                    title: "references/",
                    description: "Static knowledge base. Drop in PDFs, CSVs, or rules here. The AI will read these to understand your specific accounting standards.",
                    file1: "CAS_standards_2024.pdf",
                    file2: "tax_rate_table_CN.json",
                    file3: "currency_codes_ISO4217.csv",
                },
                assets: {
                    title: "assets/",
                    description: "Templates and media. The AI uses these static files to format the final output, like invoices or reports.",
                    file1: "journal_entry_template.csv",
                    file2: "invoice_template.html",
                    file3: "brand_logo.svg",
                },
            },
            fullView: {
                back: "Back",
                usageLine1: "Drop this folder into your",
                usageLine2: "skills/ directory and",
                usageLine3: "invoke via your AI agent.",
            },
        },
        contact: {
            sectionLabel: "§ The Imprint",
            heading1: "Want to",
            headingHighlight: "contribute",
            heading2: "a skill?",
            description: "Join our community of solopreneurs building accounting automations together.",
            submitSkill: "Submit a Skill",
            email: "Email Us",
            emailAddress: "glorious.rain@gmail.com",
            socialMedia: "Social Media",
            platforms: {
                douyin: "Douyin",
                xiaohongshu: "Xiaohongshu",
                wechatVideo: "WeChat Video",
                bilibili: "Bilibili",
            },
            handles: {
                douyin: "智能之心 Ex-machina",
                xiaohongshu: "智能之心 Ex-machina",
                wechatVideo: "智能信心 Mind-Ex-Machina",
                bilibili: "智能之心 Ex-machina",
            },
        },
        skillsIndex: {
            toc: "TABLE OF CONTENTS",
            title: "SKILLS INDEX",
            searchPlaceholder: "Search chapters...",
            colCh: "CH.",
            colTitle: "TITLE",
            colAuthor: "AUTHOR",
            colCategory: "CATEGORY",
            colPg: "PG.",
            inPlan: "IN PLAN",
            footerChapters: "chapters · Community Edition",
            footerSubmit: "SUBMIT A CHAPTER →",
            categories: {
                ALL: "ALL",
                INVOICING: "INV",
                EXPENSES: "EXP",
                TAX: "TAX",
                BANKING: "BNK",
                REPORTING: "RPT",
                CONTRACTS: "CTR"
            }
        },
        skillDetail: {
            metaTitlePrefix: "Skill:",
            metaDescription: "Learn how to use this accounting automation skill.",
            closeOverlay: "Close Overlay",
            playbookPrefix: "ACCOUNTING PLAYBOOK",
            authorPrefix: "Author:",
            communityEdition: "Community Edition",
            downloadZip: "DOWNLOAD (.ZIP)",
            viewOnGithub: "VIEW ON GITHUB",
            footerCopyright: "© 2026 SkillBook Playground.",
            footerOpenSource: "Open Source with ❤️"
        }
    },
    zh: {
        hero: {
            titleBase: "专为「一人公司」打造的",
            titleBaseLine1: "为「一人公司」",
            titleBaseLine2: "专门打造的",
            titleHighlight: "财务自动化技能",
            titleSuffix: "", // Used conditionally in old layout, left empty for safety
            titleUnderline: "完全手册",
            description: "发掘可复用的财务自动化组件包，赋能超级个体。即插即用，让 AI 替你轻松搞定账务流。",
            browseSkills: "浏览技能库",
            whatIsSkill: "什么是技能 (Skill)?",
        },
        langPanel: {
            edition: "§ 版本与语言",
            preferences: "阅读偏好",
            enDefault: "International (国际版)",
            zhWip: "中文 (默认版)",
            active: "当前语言",
            switch: "切换",
            disclaimer: "* 本手册以中文作为默认的主语言呈现，同时提供国际版（英文）供参考。"
        },
        guide: {
            newToSkills: "✨ 什么是技能 (Skill)？",
            definitionPrefix: "一个技能其实就是一个",
            definitionHighlight: "标准的文件夹",
            definitionSuffix1: "，它能立刻赋予你的 AI 助手",
            definitionSuffix2: "「超能力」",
            description: "只需把它丢给你的 AI，它就能学会如何处理发票、自动分类支出、核对网银流水等繁杂的专业工作。🚀",
            clickToPeek: "点击下方模块，查看内部解剖图！",
            items: {
                skillMd: "大脑皮层 — 设定核心 Prompt 与指令",
                scripts: "执行机构 — 各类格式的自动化脚本代码",
                references: "知识库 — 静态文档与行业参考资料",
                assets: "输出库 — 标准化模板与示例文件"
            },
            toolLabel: "你的 AI 工具",
            toolTabs: {
                antigravity: "Antigravity",
                claude: "Claude",
                openclaw: "OpenClaw",
            },
            rootLabels: {
                antigravity: "your-project/",
                claude: "your-project/",
                openclaw: "openclaw/",
            },
            rootHints: {
                antigravity: "你的项目根目录",
                claude: "你的项目根目录",
                openclaw: "OpenClaw 主目录",
            },
            directoryPaths: {
                antigravity: ".agents/skills/my-skill/",
                claude: ".claude/skills/my-skill/",
                openclaw: "skills/my-skill/",
            },
            pathHints: {
                projectRoot: "你的项目根目录",
                fixedPath: "固定路径（不可更改）",
                skillFolder: "你的技能文件夹（可自定义名称）",
            },
            titleBarPaths: {
                antigravity: ".agents/skills/",
                claude: ".claude/skills/",
                openclaw: "skills/",
            },
            peek: {
                skillMd: {
                    title: "SKILL.md",
                    description: "技能的大脑。定义核心指令、所需输入、以及 AI 将扮演的角色。",
                },
                scripts: {
                    title: "scripts/",
                    description: "可执行文件。AI 在工作流中可以触发这些脚本来处理数据或调用外部 API。",
                    file1: "run_audit.py",
                    comment1: "# 核心处理逻辑",
                    file2: "validate.py",
                    comment2: "# 数据校验",
                    file3: "generate_pdf.js",
                    comment3: "# PDF 生成",
                },
                references: {
                    title: "references/",
                    description: "静态知识库。把 PDF、CSV 或规则文件放进来，AI 会读取它们来理解你特定的会计准则。",
                    file1: "CAS_standards_2024.pdf",
                    file2: "tax_rate_table_CN.json",
                    file3: "currency_codes_ISO4217.csv",
                },
                assets: {
                    title: "assets/",
                    description: "模板与媒体文件。AI 用这些静态文件来格式化最终输出，如发票或报表。",
                    file1: "journal_entry_template.csv",
                    file2: "invoice_template.html",
                    file3: "brand_logo.svg",
                },
            },
            fullView: {
                back: "返回",
                usageLine1: "将此文件夹放入你的",
                usageLine2: "skills/ 目录，",
                usageLine3: "然后通过 AI 助手调用即可。",
            },
        },
        contact: {
            sectionLabel: "§ 联络簿",
            heading1: "想要",
            headingHighlight: "贡献",
            heading2: "一个技能？",
            description: "加入，与独立创业者一起，共同打造财务自动化生态。",
            submitSkill: "提交技能",
            email: "联系邮箱",
            emailAddress: "glorious.rain@gmail.com",
            socialMedia: "社交媒体",
            platforms: {
                douyin: "抖音",
                xiaohongshu: "小红书",
                wechatVideo: "微信视频号",
                bilibili: "B站",
            },
            handles: {
                douyin: "智能之心 Ex-machina",
                xiaohongshu: "智能之心 Ex-machina",
                wechatVideo: "智能信心 Mind-Ex-Machina",
                bilibili: "智能之心 Ex-machina",
            },
        },
        skillsIndex: {
            toc: "目录",
            title: "技能索引",
            searchPlaceholder: "搜索章节...",
            colCh: "章节",
            colTitle: "标题",
            colAuthor: "贡献者",
            colCategory: "类目",
            colPg: "页码",
            inPlan: "计划筹备中",
            footerChapters: "个章节 · 社区合力打造",
            footerSubmit: "提交新技能 →",
            categories: {
                ALL: "全部",
                INVOICING: "发票管理",
                EXPENSES: "费用报销",
                TAX: "税务合规",
                BANKING: "银企对账",
                REPORTING: "报表分析",
                CONTRACTS: "合同法务"
            }
        },
        skillDetail: {
            metaTitlePrefix: "技能：",
            metaDescription: "学习如何使用此财务自动化技能。",
            closeOverlay: "关闭弹窗",
            playbookPrefix: "会计技能手册",
            authorPrefix: "作者：",
            communityEdition: "社区版",
            downloadZip: "下载 (.ZIP) 包",
            viewOnGithub: "在 GITHUB 仓库查看",
            footerCopyright: "© 2026 SkillBook Playground.",
            footerOpenSource: "开源驱动 ❤️"
        }
    }
};

export function getTranslations(lang: Language) {
    return translations[lang];
}
