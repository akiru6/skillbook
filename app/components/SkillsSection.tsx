import { useState } from "react";
import { Search } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { getTranslations, type Language } from "@/i18n";

const CATEGORIES_DATA = [
  { id: "ALL", color: "bg-secondary" },
  { id: "INVOICING", color: "bg-[hsl(var(--macaron-mint))]" },
  { id: "EXPENSES", color: "bg-[hsl(var(--macaron-pink))]" },
  { id: "TAX", color: "bg-[hsl(var(--macaron-yellow))]" },
  { id: "BANKING", color: "bg-[hsl(var(--macaron-lavender))]" },
  { id: "REPORTING", color: "bg-[hsl(var(--macaron-peach))]" },
  { id: "CONTRACTS", color: "bg-[hsl(var(--macaron-sky))]" },
] as const;

const CATEGORY_BADGE_COLOR: Record<string, string> = {
  INVOICING: "bg-[hsl(var(--macaron-mint))]",
  EXPENSES: "bg-[hsl(var(--macaron-pink))]",
  TAX: "bg-[hsl(var(--macaron-yellow))]",
  BANKING: "bg-[hsl(var(--macaron-lavender))]",
  REPORTING: "bg-[hsl(var(--macaron-peach))]",
  CONTRACTS: "bg-[hsl(var(--macaron-sky))]",
};

/**
 * 🎓 数据流变化：
 *
 * Lovable (之前):  SKILLS 硬编码在组件内部
 * Remix   (现在):  loader() → page 组件 → SkillsSection props
 *
 * 这样做的好处：
 * 1. 数据和 UI 解耦 — 组件只负责渲染，不关心数据从哪来
 * 2. 未来换数据源很简单 — 只改 loader()，组件完全不用动
 * 3. SSR 友好 — 数据在服务端获取，页面首次加载就有完整内容
 */
interface Skill {
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

interface SkillsSectionProps {
  skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const [searchParams] = useSearchParams();
  const lang = (searchParams.get("lang") === "en" ? "en" : "zh") as Language;
  const t = getTranslations(lang).skillsIndex;

  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = activeCategory === "ALL" || skill.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="px-4 md:px-6 py-12 md:py-20 max-w-5xl mx-auto">
      {/* Mobile horizontal category tabs — above the title */}
      <div className="flex md:hidden overflow-x-auto gap-2 mb-4 pb-1 scrollbar-hide">
        {CATEGORIES_DATA.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`
              border-brutalist px-3 py-1.5 font-mono text-[10px] font-bold tracking-wider transition-colors whitespace-nowrap shrink-0
              ${cat.color}
              ${activeCategory === cat.id ? "shadow-brutalist" : ""}
            `}
          >
            {t.categories[cat.id as keyof typeof t.categories]}
          </button>
        ))}
      </div>

      <div className="flex">
        {/* Main book content */}
        <div className="flex-1 min-w-0">
          {/* Book Title Header */}
          <div className="border-brutalist shadow-brutalist bg-card p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="font-mono text-xs text-muted-foreground tracking-widest mb-1">{t.toc}</p>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{t.title}</h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="border-brutalist bg-background flex items-center px-3 py-2 gap-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent outline-none font-mono text-sm w-40 placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Table of Contents Rows */}
          <div className="border-x-[2.5px] border-b-[2.5px] border-border bg-card">
            {/* Column Headers */}
            <div className="flex items-center px-4 py-2 border-b-[2.5px] border-border bg-secondary">
              <span className="font-mono text-[10px] text-muted-foreground font-bold w-[3.5rem] shrink-0">{t.colCh}</span>
              <span className="font-mono text-[10px] text-muted-foreground font-bold">{t.colTitle}</span>
              <div className="flex-1" />
              <span className="font-mono text-[10px] text-muted-foreground font-bold hidden md:block w-28 text-left">{t.colAuthor}</span>
              <span className="font-mono text-[10px] text-muted-foreground font-bold hidden md:block w-28 text-left">{t.colCategory}</span>
              <span className="font-mono text-[10px] text-muted-foreground font-bold w-12 text-right">{t.colPg}</span>
            </div>

            {filteredSkills.map((skill) => {
              const isPlanned = skill.status === "planned";
              const RowTag = isPlanned ? "div" : Link;
              const linkProps = isPlanned ? {} : { to: `/skills/${skill.id}?lang=${lang}`, preventScrollReset: true };

              return (
                <RowTag
                  {...(linkProps as any)}
                  key={skill.id}
                  className={`group flex items-start md:items-center px-3 md:px-4 py-3 md:py-4 border-b-[1px] border-border/40 transition-all duration-150 block no-underline
                  ${isPlanned
                      ? "opacity-50 cursor-not-allowed grayscale"
                      : "cursor-pointer hover:bg-[hsl(50_100%_85%)] hover:border-y-[2.5px] hover:border-border hover:-my-[1.5px] hover:relative hover:z-10"
                    }`}
                >
                  {/* Chapter number */}
                  <span className={`font-mono text-base md:text-lg font-bold text-muted-foreground transition-colors w-[2.5rem] md:w-[3.5rem] shrink-0 pt-0.5 md:pt-0 ${!isPlanned && 'group-hover:text-foreground'}`}>
                    {skill.chapter}
                  </span>
                  {/* Title & description — stacked on mobile */}
                  <div className="flex-1 min-w-0 md:shrink-0 md:max-w-[45%] md:flex-none pr-2">
                    <div className="flex items-baseline gap-2">
                      <h3 className={`text-base md:text-lg font-bold truncate transition-colors flex items-center gap-2 ${!isPlanned && 'group-hover:text-foreground'}`}>
                        {skill.title}
                        {isPlanned && <span className="font-mono text-[10px] bg-foreground text-background px-1.5 py-0.5 rounded-sm whitespace-nowrap">{t.inPlan}</span>}
                      </h3>
                      <span className="text-sm text-muted-foreground font-mono hidden sm:inline whitespace-nowrap">{skill.subtitle}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{skill.description}</p>
                    {/* Mobile-only: author + category below description */}
                    <div className="flex items-center gap-2 mt-1.5 md:hidden">
                      <span className="font-mono text-[10px] text-muted-foreground font-bold">{skill.author}</span>
                      <span className={`border-brutalist px-1.5 py-0 text-[10px] sm:text-xs font-mono font-bold ${CATEGORY_BADGE_COLOR[skill.category] || "bg-tag"}`}>
                        {t.categories[skill.category as keyof typeof t.categories] || skill.category}
                      </span>
                    </div>
                  </div>
                  {/* Dotted leader — desktop only */}
                  <div className="hidden md:block flex-1 border-b-2 border-dotted border-muted-foreground/30 mx-3 min-w-[2rem] translate-y-[-1px]" />
                  {/* Author — desktop only */}
                  <span className={`font-mono text-xs text-muted-foreground font-bold hidden md:block w-28 text-left transition-colors ${!isPlanned && 'group-hover:text-foreground'}`}>
                    {skill.author}
                  </span>
                  {/* Category badge — desktop only */}
                  <div className="hidden md:flex w-28 justify-start">
                    <span className={`border-brutalist px-2 py-0.5 text-xs font-mono font-bold transition-colors ${CATEGORY_BADGE_COLOR[skill.category] || "bg-tag"}`}>
                      {t.categories[skill.category as keyof typeof t.categories] || skill.category}
                    </span>
                  </div>
                  {/* Page number */}
                  <span className={`font-mono text-sm font-bold text-muted-foreground transition-all w-10 md:w-12 text-right shrink-0 pt-0.5 md:pt-0 ${!isPlanned && 'group-hover:text-highlight group-hover:text-base'}`}>
                    {skill.page}
                  </span>
                </RowTag>
              )
            })}

            {/* Footer */}
            <div className="px-4 py-3 bg-secondary flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">
                {filteredSkills.length} {t.footerChapters}
              </span>
              <a href="#" className="font-mono text-xs font-bold text-highlight hover:underline">
                {t.footerSubmit}
              </a>
            </div>
          </div>
        </div>

        {/* Dictionary-style side index — desktop only */}
        <div className="hidden md:flex flex-col gap-0 ml-0">
          {CATEGORIES_DATA.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  relative border-[2.5px] border-l-0 border-border
                  px-2.5 py-3 font-mono text-[10px] font-bold tracking-wider
                  transition-all duration-150 text-foreground
                  ${cat.color}
                  ${isActive
                    ? "-ml-3 pl-5 z-10 shadow-brutalist"
                    : "hover:-ml-1 hover:pl-3.5"
                  }
                `}
                style={{ writingMode: "vertical-lr" }}
              >
                {t.categories[cat.id as keyof typeof t.categories]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Old mobile category pills — replaced by scrollable row above title */}
    </section>
  );
}