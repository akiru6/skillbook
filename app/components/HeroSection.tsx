import { useState } from "react";
import { ArrowRight, Star, BookOpen, Mail, Globe, Github, Send, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, Link } from "react-router";
import { getTranslations, type Language } from "@/i18n";
import IdleRightPanel from "./IdleRightPanel";
import GuideContent from "./GuideContent";

const TAB_ICONS: Record<string, React.FC<{ className?: string }>> = {
  guide: BookOpen,
  contact: Mail,
};

const TABS = [
  { id: "guide", label: "GUIDE" },
  { id: "contact", label: "CONTACT" },
] as const;

type TabId = (typeof TABS)[number]["id"];

/* ── Realistic 3D page-flip variants ── */
const pageFlipVariants = {
  initial: {
    rotateY: -120,
    opacity: 0,
    scale: 1,
  },
  animate: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 15,
      mass: 1.2,
    },
  },
  exit: {
    rotateY: 90,
    opacity: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] as const },
  },
};



/* ── Social platform SVG icons ── */
const DouyinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 6h3.18a10 10 0 0 0 9.82 8v6a16 16 0 0 1-9.82-3.36V30a10 10 0 1 1-7-9.54V27a4 4 0 1 0 3.82 4V6z" />
  </svg>
);

const XiaohongshuIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="6" width="32" height="36" rx="4" />
    <path d="M18 18l6 8 6-8" />
    <line x1="24" y1="26" x2="24" y2="34" />
  </svg>
);

const WechatVideoIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="8" width="40" height="32" rx="4" />
    <polygon points="20,16 34,24 20,32" fill="currentColor" stroke="none" />
  </svg>
);

const BilibiliIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 8l5 6h10l5-6" />
    <rect x="8" y="14" width="32" height="24" rx="4" />
    <circle cx="19" cy="26" r="2" fill="currentColor" />
    <circle cx="29" cy="26" r="2" fill="currentColor" />
  </svg>
);

const ShareIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const SOCIAL_PLATFORMS = [
  { icon: DouyinIcon, key: "douyin" as const, url: "#" },
  { icon: XiaohongshuIcon, key: "xiaohongshu" as const, url: "#" },
  { icon: WechatVideoIcon, key: "wechatVideo" as const, url: "#" },
  { icon: BilibiliIcon, key: "bilibili" as const, url: "#" },
];

/* ── Contact Page — The Imprint ── */
const ContactContent = ({ lang }: { lang: Language }) => {
  const [socialOpen, setSocialOpen] = useState(false);
  const t = getTranslations(lang).contact;

  return (
    <div className="p-6 space-y-6 h-full flex flex-col">
      <p className="font-mono text-[11px] text-muted-foreground tracking-[0.2em] uppercase">{t.sectionLabel}</p>
      <div className="space-y-4">
        <h2 className="text-3xl md:text-[2.25rem] font-bold leading-snug tracking-tight text-foreground/90">
          {t.heading1}
          {lang === 'zh' ? (
            <span className="text-highlight italic underline decoration-highlight decoration-[3px] underline-offset-[6px] decoration-dashed mx-1">
              {t.headingHighlight}
            </span>
          ) : (
            <span className="text-highlight italic mx-2.5">
              {t.headingHighlight}
            </span>
          )}
          {t.heading2}
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-[280px]">
          {t.description}
        </p>
      </div>

      {/* Brutalist stamps — staggered flow layout */}
      <div className="flex-1 flex flex-col mt-4" style={{ gap: "6px" }}>
        {/* 1. Submit a Skill — orange */}
        <a
          href="https://github.com/akiru6/skillsbook-remix/issues/new?template=submit-skill.yml"
          target="_blank"
          rel="noopener noreferrer"
          className="rotate-[-2deg] border-[3px] border-foreground bg-highlight text-accent-foreground shadow-[5px_5px_0px_hsl(var(--border))] px-5 py-3.5 font-mono text-sm font-bold flex items-center gap-3 hover:-translate-y-1 hover:shadow-[5px_7px_0px_hsl(var(--border))] transition-all w-[92%]"
        >
          <Send className="w-5 h-5 shrink-0" />
          <span className="text-lg">{t.submitSkill}</span>
          <ArrowRight className="w-4 h-4 ml-auto" />
        </a>

        {/* 2. Email — lavender */}
        <a
          href={`mailto:${t.emailAddress}`}
          className="rotate-[1.5deg] ml-3 border-[3px] border-foreground bg-[hsl(var(--macaron-lavender))] shadow-[5px_5px_0px_hsl(var(--border))] px-5 py-3.5 font-mono text-sm font-bold flex items-center gap-3 hover:-translate-y-1 hover:shadow-[5px_7px_0px_hsl(var(--border))] transition-all w-[88%]"
        >
          <Mail className="w-5 h-5 shrink-0" />
          <span className="text-lg">{t.email}</span>
          <span className="ml-auto text-xs opacity-60">{t.emailAddress}</span>
        </a>

        {/* 3. Social Media — accordion with page-tab flip animation */}
        <div className="rotate-[-1deg] ml-1" style={{ perspective: "800px" }}>
          {/* Main Social Media button */}
          <button
            onClick={() => setSocialOpen((prev) => !prev)}
            className="relative z-10 border-[3px] border-foreground bg-[hsl(var(--macaron-sky))] shadow-[5px_5px_0px_hsl(var(--border))] px-5 py-3.5 font-mono text-sm font-bold flex items-center gap-3 hover:-translate-y-1 hover:shadow-[5px_7px_0px_hsl(var(--border))] transition-all w-[90%]"
          >
            <ShareIcon className="w-5 h-5 shrink-0" />
            <span className="text-lg">{t.socialMedia}</span>
            <motion.span
              animate={{ rotate: socialOpen ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="ml-auto"
            >
              <ChevronDown className="w-4 h-4" />
            </motion.span>
          </button>

          {/* Expanded platform list — connected to parent via left border */}
          <AnimatePresence>
            {socialOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-[5px] pt-1.5 ml-3 pl-3 border-l-[3px] border-foreground/20">
                  {SOCIAL_PLATFORMS.map((p, i) => {
                    const Icon = p.icon;
                    const tabColors = [
                      "bg-[hsl(var(--macaron-peach))]",
                      "bg-[hsl(var(--macaron-mint))]",
                      "bg-[hsl(var(--macaron-yellow))]",
                      "bg-[hsl(var(--macaron-lavender))]",
                    ];
                    return (
                      <motion.a
                        key={p.key}
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ rotateX: -90, opacity: 0 }}
                        animate={{ rotateX: 0, opacity: 1 }}
                        exit={{ rotateX: -90, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 18,
                          delay: i * 0.06,
                        }}
                        style={{ transformOrigin: "top center" }}
                        className={`${tabColors[i]} border-[2px] border-foreground shadow-[3px_3px_0px_hsl(var(--border))] px-4 py-2 font-mono text-sm font-bold flex items-center gap-3 hover:-translate-y-0.5 hover:shadow-[3px_4px_0px_hsl(var(--border))] transition-all cursor-pointer`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="text-[13px]">{t.platforms[p.key]}</span>
                        <span className="ml-auto text-[11px] opacity-50 font-medium">{t.handles[p.key]}</span>
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const CONTENT_MAP: Record<TabId, React.FC<any>> = {
  guide: GuideContent,
  contact: ContactContent,
};

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<TabId | null>(null);
  const isBookOpen = activeTab !== null;

  const [searchParams, setSearchParams] = useSearchParams();
  const lang = (searchParams.get("lang") === "en" ? "en" : "zh") as Language;
  const t = getTranslations(lang).hero;

  const handleTabClick = (tabId: TabId) => {
    setActiveTab((prev) => (prev === tabId ? null : tabId));
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-6 py-10 md:py-16">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-8 lg:gap-16 items-stretch">
        {/* Left Card + Book Tabs */}
        <div className="flex flex-col md:flex-row flex-1 max-w-xl w-full relative z-10">
          <div className="border-brutalist shadow-brutalist-lg bg-card p-6 md:p-12 flex-1 flex flex-col pt-10 md:pt-14 relative z-10">
            {lang === 'en' ? (
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                {t.titleBase}{" "}
                <span className="text-highlight italic whitespace-nowrap text-4xl md:text-5xl lg:text-[3.5rem]">
                  {t.titleHighlight}
                </span>{" "}
                {t.titleSuffix && <span className="block mt-1">{t.titleSuffix}</span>}
                <span className="underline decoration-highlight decoration-4 underline-offset-4 whitespace-nowrap">{t.titleUnderline}</span>
              </h1>
            ) : (
              <h1 className="flex flex-col items-start gap-[4px] md:gap-[12px]">
                <span className="text-[2.75rem] md:text-[2.75rem] lg:text-[4.0rem] font-bold tracking-tight text-foreground/90 whitespace-nowrap leading-none">{t.titleBaseLine1}</span>
                <span className="text-[2.75rem] md:text-[2.75rem] lg:text-[4.0rem] font-bold tracking-tight text-foreground/90 whitespace-nowrap leading-none">{t.titleBaseLine2}</span>
                <span className="text-[2.25rem] md:text-[2.75rem] lg:text-[3.8rem] font-black italic text-highlight underline decoration-highlight decoration-4 underline-offset-[12px] decoration-dashed whitespace-nowrap leading-tight">{t.titleHighlight}</span>
                <span className="text-[2.75rem] md:text-[2.75rem] lg:text-[4.0rem] font-black text-foreground underline decoration-foreground decoration-[5px] underline-offset-8 whitespace-nowrap leading-none">{t.titleUnderline}</span>
              </h1>
            )}

            <p className={`${lang === 'zh' ? 'mt-10 md:mt-9' : 'mt-8'} text-muted-foreground text-base md:text-lg leading-relaxed max-w-md transition-all`}>
              {t.description}
            </p>

            <div className={`flex flex-wrap gap-3 ${lang === 'zh' ? 'mt-7 md:mt-9' : 'mt-6 md:mt-8'} transition-all`}>
              <a
                href="#skills"
                className="border-brutalist shadow-brutalist bg-highlight text-accent-foreground px-6 py-3 font-mono text-sm font-bold flex items-center gap-2 hover:-translate-y-0.5 transition-transform"
              >
                {t.browseSkills} <ArrowRight className="w-4 h-4" />
              </a>
              <button 
                onClick={() => handleTabClick("guide")}
                className="border-brutalist shadow-brutalist bg-card px-6 py-3 font-mono text-sm font-bold hover:-translate-y-0.5 transition-transform"
              >
                {t.whatIsSkill}
              </button>
            </div>

            <div className={`mt-auto ${lang === 'zh' ? 'pt-6 md:pt-10' : 'pt-5 md:pt-10'} flex items-center gap-4`}>
              <a 
                href="https://github.com/akiru6/accounting-skills" 
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden border-brutalist shadow-brutalist bg-primary text-primary-foreground px-5 py-3 font-mono text-sm font-bold flex items-center gap-2.5 hover:-translate-y-1 hover:shadow-brutalist-lg transition-all"
              >
                {/* 悬停时的光泽扫过特效 */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1s_forwards] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                <Github className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span className="tracking-wide">akiru6/accounting-skills</span>
              </a>
            </div>
          </div>

          {/* Book-style tabs — vertical on md+, read top-to-bottom (rotate-90) */}
          <div className="hidden md:flex flex-col border-brutalist border-l-0 relative z-20">
            {TABS.map((tab) => {
              const Icon = TAB_ICONS[tab.id];
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`
                    border-b-[2.5px] border-r-[2.5px] border-t-0 first:border-t-[2.5px] border-border border-l-0
                    h-28 w-11 flex items-center justify-center
                    transition-colors
                    ${activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-foreground hover:bg-secondary"
                    }
                  `}
                >
                  <span className="rotate-90 flex items-center gap-1.5 whitespace-nowrap font-mono text-xs font-bold tracking-widest">
                    {Icon && <Icon className="w-3.5 h-3.5" />}
                    {tab.label}
                  </span>
                </button>
              );
            })}

            {/* Language Toggle — same style tab, warm accent color */}
            <Link
              to={`?lang=${lang === 'en' ? 'zh' : 'en'}`}
              preventScrollReset
              className="border-b-[2.5px] border-r-[2.5px] border-t-0 border-border border-l-0 h-28 w-11 flex items-center justify-center transition-colors bg-highlight text-accent-foreground hover:bg-[hsl(var(--highlight-light))]"
            >
              <span className="rotate-90 flex items-center gap-1.5 whitespace-nowrap font-mono text-xs font-bold tracking-widest">
                <Globe className="w-3.5 h-3.5" />
                {lang === 'en' ? '中文' : 'EN'}
              </span>
            </Link>
            <div className="flex-1 border-r-[2.5px] border-border" />
          </div>

          {/* Mobile horizontal tabs */}
          <div className="flex md:hidden border-brutalist border-t-0">
            {TABS.map((tab) => {
              const Icon = TAB_ICONS[tab.id];
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`
                    flex-1 border-r-[2.5px] border-border
                    px-3 py-3 font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-1.5
                    transition-colors
                    ${activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-foreground hover:bg-secondary"
                    }
                  `}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  {tab.label}
                </button>
              );
            })}

            {/* Direct Language Toggle Button (Mobile - Binder clip top) */}
            <div className="pl-3 pr-2 py-0 flex items-center relative overflow-visible z-20">
              <Link
                to={`?lang=${lang === 'en' ? 'zh' : 'en'}`}
                preventScrollReset
                className="relative px-3 py-2 font-mono text-xs font-black tracking-wider flex items-center justify-center gap-1.5 transition-all border-[2.5px] border-foreground bg-foreground text-background shadow-[3px_3px_0px_hsl(var(--highlight))] rounded-t-xl origin-bottom rotate-[8deg] hover:rotate-[2deg] hover:-translate-y-1 hover:bg-highlight hover:text-accent-foreground"
              >
                <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 flex gap-1 opacity-90 transition-colors">
                  <div className="w-2.5 h-[2.5px] border-[1.5px] border-background group-hover:border-accent-foreground rounded-full" />
                  <div className="w-2.5 h-[2.5px] border-[1.5px] border-background group-hover:border-accent-foreground rounded-full" />
                </div>
                <Globe className="w-3.5 h-3.5 opacity-90 mb-1.5" />
                <span className="mb-1.5">{lang === 'en' ? '中' : 'EN'}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right side — idle state or open book panel with page-flip */}
        {isBookOpen ? (
          <div
            className="flex-1 max-w-xl w-full border-brutalist shadow-brutalist-lg bg-card flex flex-col overflow-hidden"
            style={{ perspective: "1200px" }}
          >
            <div className="border-b-[2.5px] border-border px-4 py-2.5 flex items-center justify-between bg-window-header shrink-0">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-highlight" />
                <span className="w-3 h-3 rounded-full bg-highlight-light" />
                <span className="w-3 h-3 rounded-full bg-muted-foreground/30" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                {activeTab === "guide" ? ".claude/skills/" : activeTab === "contact" ? "the-imprint/" : "~/playbook"}
              </span>
            </div>
            <div className="flex-1 overflow-y-auto" style={{ perspective: "1200px" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={pageFlipVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="h-full"
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "left center",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {activeTab && (() => { const C = CONTENT_MAP[activeTab]; return <C lang={lang} />; })()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <IdleRightPanel />
        )}
      </div>
    </section>
  );
}
