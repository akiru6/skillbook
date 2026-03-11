import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import { Download, Github } from "lucide-react";
import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { getSkillMarkdown } from "@/data/skills.server";

export async function loader({ params }: LoaderFunctionArgs) {
    const { skillId } = params;
    if (!skillId) {
        throw new Response("Skill not found", { status: 404 });
    }

    // 核心逻辑：从服务器读取对应的 SKILL.md
    // 在真实环境中，这里可以是通过 GitHub API 读取仓库文件：
    // await fetch(`https://raw.githubusercontent.com/akiru6/accounting-skills/main/${skillId}/SKILL.md`)
    const markdown = await getSkillMarkdown(skillId);

    if (!markdown) {
        throw new Response("Skill not found", { status: 404 });
    }

    // 构造 GitHub 下载链接
    const githubUrl = `https://github.com/akiru6/accounting-skills/tree/main/${skillId}`;

    return { skillId, markdown, githubUrl };
}

export function meta({ params }: any) {
    return [
        { title: `Skill: ${params.skillId} — SkillBooks` },
        { name: "description", content: "Learn how to use this accounting automation skill." },
    ];
}

export default function SkillDetail() {
    const loaderData = useLoaderData<typeof loader>();
    const { skillId, markdown, githubUrl } = loaderData as { skillId: string, markdown: string, githubUrl: string };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-start overflow-y-auto bg-black/60 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-300">
            {/* 内部“书页”卡片容器 */}
            <div className="w-full max-w-4xl bg-background border-[4px] border-border shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] my-auto relative animate-in slide-in-from-bottom-8 duration-500 overflow-hidden">
                {/* 顶部标题与关闭按钮栏 */}
                <div className="px-5 py-4 border-b-[4px] border-border flex justify-between items-center bg-muted">
                    <div className="font-mono text-sm tracking-widest font-bold flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full border-[2.5px] border-border bg-highlight inline-block animate-pulse"></span>
                        PLAYBOOK_DETAIL_VIEW
                    </div>
                    <Link
                        to="/"
                        preventScrollReset={true}
                        className="inline-flex items-center justify-center font-mono text-xl font-bold border-[3px] border-border w-10 h-10 hover:bg-highlight hover:text-highlight-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all bg-card"
                        title="Close Overlay"
                    >
                        ✕
                    </Link>
                </div>

                {/* 顶部书本封面标题区 - 无边距铺满，下方用粗线隔开 */}
                <div className="p-8 md:p-12 border-b-[4px] border-border bg-card relative overflow-hidden">
                    {/* 背景装饰语录 */}
                    <div className="absolute -right-4 -top-8 text-[10rem] md:text-[14rem] text-muted opacity-[0.05] font-bold select-none rotate-12 pointer-events-none">
                        SKILL
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                        <div>
                            <p className="font-mono text-xs text-muted-foreground tracking-widest mb-4 uppercase flex items-center gap-2">
                                <span className="inline-block w-8 h-[2px] bg-highlight"></span>
                                ACCOUNTING PLAYBOOK / {skillId}
                            </p>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
                                {skillId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </h1>
                            <p className="font-mono text-sm text-foreground/80 font-bold bg-muted inline-block px-3 py-1 border-[2px] border-border">
                                Author: @akiru6 · Community Edition
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
                            {/* Download ZIP from GitHub Releases */}
                            <a
                                href={`https://github.com/akiru6/accounting-skills/releases/latest/download/${skillId}.zip`}
                                className="border-brutalist px-8 py-4 font-mono font-bold bg-highlight text-highlight-foreground shadow-brutalist hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all flex items-center justify-center gap-3"
                            >
                                <Download size={20} strokeWidth={3} />
                                <span>DOWNLOAD (.ZIP)</span>
                            </a>
                            {/* View Source Code */}
                            <a
                                href={githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="border-[3px] border-border px-8 py-3 font-mono text-sm font-bold bg-secondary hover:bg-muted text-foreground shadow-brutalist hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all flex items-center justify-center gap-3"
                            >
                                <Github size={20} strokeWidth={2.5} />
                                <span>VIEW ON GITHUB</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Markdown 内容主体。使用 Tailwind Typography (prose) 进行极客排版 */}
                <div className="p-8 md:p-12 bg-background min-h-[50vh]">
                    <article className="prose prose-stone prose-h1:text-3xl prose-h1:font-black prose-h2:text-2xl prose-h2:font-bold prose-h2:border-b-[3px] prose-h2:border-border prose-h2:pb-2 prose-h3:text-xl prose-h3:font-bold prose-a:text-highlight prose-a:font-bold prose-a:underline prose-a:decoration-2 hover:prose-a:bg-highlight hover:prose-a:text-highlight-foreground 
                    
                    prose-code:text-accent prose-code:bg-muted/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm prose-code:font-bold
                    
                    prose-pre:bg-[#EAE8DD] prose-pre:text-foreground prose-pre:border-[3px] prose-pre:border-border prose-pre:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] prose-pre:rounded-none prose-pre:font-mono prose-pre:p-4 prose-pre:my-6
                    prose-pre:prose-code:bg-transparent prose-pre:prose-code:p-0 prose-pre:prose-code:font-normal
                    
                    prose-table:border-[3px] prose-table:border-border prose-th:border-b-[3px] prose-th:border-border prose-th:bg-muted prose-th:p-3 prose-td:p-3 prose-td:border-b prose-td:border-border/50
                    max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm, remarkFrontmatter]}>
                            {markdown}
                        </ReactMarkdown>
                    </article>

                    {/* 底部 Footer */}
                    <div className="mt-20 pt-8 border-t-[3px] border-border border-dashed flex justify-between items-center text-muted-foreground font-mono text-xs font-bold">
                        <p className="bg-muted px-2 py-1 border-[2px] border-transparent">© 2026 SkillBooks Playground.</p>
                        <p className="border-[2px] border-border px-2 py-1">Open Source with ❤️</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
