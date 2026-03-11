import { useState } from "react";
import { ArrowRight, Star, BookOpen, Mail, Globe, Github, MessageCircle, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, Link } from "react-router";
import { getTranslations, type Language } from "@/i18n";
import IdleRightPanel from "./IdleRightPanel";
import GuideContent from "./GuideContent";

const TAB_ICONS: Record<string, React.FC<{ className?: string }>> = {
  guide: BookOpen,
  contact: Mail,
  lang: Globe,
};

const TABS = [
  { id: "guide", label: "GUIDE" },
  { id: "contact", label: "CONTACT" },
  { id: "lang", label: "EN / 中" },
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

/* ── Language Page — Dictionary Index ── */
const LangContent = ({ lang }: { lang: Language }) => {
  const t = getTranslations(lang).langPanel;

  return (
    <div className="p-8 md:p-12 h-full flex flex-col relative overflow-hidden">
      {/* Decorative book elements */}
      <div className="absolute top-12 right-12 w-24 h-24 border-[1px] border-foreground/10 rounded-full flex items-center justify-center opacity-50">
        <Globe className="w-8 h-8 text-muted-foreground/30 stroke-[1px]" />
      </div>

      <p className="font-mono text-[11px] text-muted-foreground tracking-[0.2em] uppercase mb-12">{t.edition}</p>

      <div className="max-w-md mt-4 relative z-10">
        <h3 className="text-2xl font-bold tracking-tight mb-10">{t.preferences}</h3>

        <div className="flex flex-col gap-8">
          {/* Active: English */}
          <Link
            to="?lang=en"
            preventScrollReset
            className={`group relative w-full text-left transition-all block ${lang === 'en' ? '' : 'opacity-60 hover:opacity-100 hover:-translate-y-[1px]'}`}
          >
            {lang === 'en' ? (
              <div className="absolute -inset-x-5 -inset-y-4 border-[3px] border-foreground bg-highlight shadow-[5px_5px_0px_hsl(var(--border))] z-0" />
            ) : (
              <div className="absolute -inset-x-5 -inset-y-4 border-[2px] border-dashed border-foreground/30 bg-card group-hover:border-solid group-hover:border-[3px] group-hover:border-foreground group-hover:bg-highlight/20 transition-all z-0" />
            )}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className={`text-4xl font-bold tracking-tighter ${lang === 'en' ? 'text-accent-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>En</span>
                <span className={`font-mono text-sm font-bold ${lang === 'en' ? 'text-accent-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>{t.enDefault}</span>
              </div>
              {lang === 'en' ? (
                <span className="font-mono text-[10px] bg-foreground text-background px-2.5 py-1 font-bold tracking-widest leading-none">{t.active}</span>
              ) : (
                <span className="font-mono text-[10px] border-[1.5px] border-foreground/30 text-foreground/50 px-2 py-0.5 font-bold tracking-widest group-hover:border-foreground group-hover:text-foreground transition-colors leading-none">{t.switch}</span>
              )}
            </div>
          </Link>

          {/* Inactive: Chinese */}
          <Link
            to="?lang=zh"
            preventScrollReset
            className={`group relative w-full text-left mt-2 transition-all block ${lang === 'zh' ? '' : 'opacity-60 hover:opacity-100 hover:-translate-y-[1px]'}`}
          >
            {lang === 'zh' ? (
              <div className="absolute -inset-x-5 -inset-y-4 border-[3px] border-foreground bg-[hsl(var(--macaron-peach))] shadow-[5px_5px_0px_hsl(var(--border))] z-0" />
            ) : (
              <div className="absolute -inset-x-5 -inset-y-4 border-[2px] border-dashed border-foreground/30 bg-card group-hover:border-solid group-hover:border-[3px] group-hover:border-foreground group-hover:bg-[hsl(var(--macaron-peach))]/20 transition-all z-0" />
            )}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className={`text-4xl font-bold tracking-tighter ${lang === 'zh' ? 'text-foreground' : 'text-muted-foreground group-hover:text-[hsl(var(--macaron-coral))] transition-colors'}`}>中</span>
                <span className={`font-mono text-sm font-bold ${lang === 'zh' ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>{t.zhWip}</span>
              </div>
              {lang === 'zh' ? (
                <span className="font-mono text-[10px] bg-foreground text-background px-2.5 py-1 font-bold tracking-widest leading-none">{t.active}</span>
              ) : (
                <span className="font-mono text-[10px] border-[1.5px] border-foreground/30 text-foreground/50 px-2 py-0.5 font-bold tracking-widest group-hover:border-foreground group-hover:text-foreground transition-colors leading-none">{t.switch}</span>
              )}
            </div>
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t-[2px] border-dotted border-border/50">
          <p className="font-mono text-[11px] text-muted-foreground leading-relaxed md:pr-10">
            {t.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ── Contact Page — The Imprint ── */
const ContactContent = () => (
  <div className="p-6 space-y-6 h-full flex flex-col">
    <p className="font-mono text-[11px] text-muted-foreground tracking-[0.2em] uppercase">§ The Imprint</p>
    <h2 className="text-4xl md:text-5xl font-bold leading-[1.05] tracking-tight">
      Want to<br />
      <span className="text-highlight italic">contribute</span><br />
      a skill?
    </h2>
    <p className="text-muted-foreground text-sm max-w-xs">
      Join our community of solopreneurs building accounting automations together.
    </p>

    {/* Staggered brutalist stamps */}
    <div className="flex-1 relative mt-4">
      <a
        href="#"
        className="absolute top-0 left-0 rotate-[-2deg] border-[3px] border-foreground bg-highlight text-accent-foreground shadow-[5px_5px_0px_hsl(var(--border))] px-6 py-4 font-mono text-sm font-bold flex items-center gap-3 hover:-translate-y-1 hover:shadow-[5px_7px_0px_hsl(var(--border))] transition-all w-[85%]"
      >
        <Send className="w-5 h-5 shrink-0" />
        <span className="text-lg">Submit a Skill</span>
        <ArrowRight className="w-4 h-4 ml-auto" />
      </a>
      <a
        href="#"
        className="absolute top-[72px] left-[12px] rotate-[1.5deg] border-[3px] border-foreground bg-[hsl(var(--macaron-lavender))] shadow-[5px_5px_0px_hsl(var(--border))] px-6 py-4 font-mono text-sm font-bold flex items-center gap-3 hover:-translate-y-1 hover:shadow-[5px_7px_0px_hsl(var(--border))] transition-all w-[80%]"
      >
        <Github className="w-5 h-5 shrink-0" />
        <span className="text-lg">GitHub Discussions</span>
      </a>
      <a
        href="#"
        className="absolute top-[144px] left-[4px] rotate-[-1deg] border-[3px] border-foreground bg-[hsl(var(--macaron-sky))] shadow-[5px_5px_0px_hsl(var(--border))] px-6 py-4 font-mono text-sm font-bold flex items-center gap-3 hover:-translate-y-1 hover:shadow-[5px_7px_0px_hsl(var(--border))] transition-all w-[75%]"
      >
        <MessageCircle className="w-5 h-5 shrink-0" />
        <span className="text-lg">Discord Community</span>
      </a>
    </div>
  </div>
);

const CONTENT_MAP: Record<TabId, React.FC<any>> = {
  guide: GuideContent,
  contact: ContactContent,
  lang: LangContent,
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
        <div className="flex flex-col md:flex-row flex-1 max-w-xl w-full">
          <div className="border-brutalist shadow-brutalist-lg bg-card p-6 md:p-12 flex-1 flex flex-col">
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
              <h1 className="flex flex-col items-start gap-[8px] md:gap-[12px]">
                <span className="text-[2.75rem] md:text-[2.75rem] lg:text-[4rem] font-bold tracking-tight text-foreground/90 whitespace-nowrap leading-none">{t.titleBaseLine1}</span>
                <span className="text-[2.75rem] md:text-[2.75rem] lg:text-[4rem] font-bold tracking-tight text-foreground/90 whitespace-nowrap leading-none">{t.titleBaseLine2}</span>
                <span className="text-[2.25rem] md:text-[2.75rem] lg:text-[3.8rem] font-black italic text-highlight underline decoration-highlight decoration-4 underline-offset-[12px] decoration-dashed whitespace-nowrap leading-tight">{t.titleHighlight}</span>
                <span className="text-[2.75rem] md:text-[2.75rem] lg:text-[4rem] font-black text-foreground underline decoration-foreground decoration-[5px] underline-offset-8 whitespace-nowrap leading-none">{t.titleUnderline}</span>
              </h1>
            )}

            <p className="mt-6 text-muted-foreground text-lg leading-relaxed max-w-md">
              {t.description}
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href="#skills"
                className="border-brutalist shadow-brutalist bg-highlight text-accent-foreground px-6 py-3 font-mono text-sm font-bold flex items-center gap-2 hover:-translate-y-0.5 transition-transform"
              >
                {t.browseSkills} <ArrowRight className="w-4 h-4" />
              </a>
              <button className="border-brutalist shadow-brutalist bg-card px-6 py-3 font-mono text-sm font-bold hover:-translate-y-0.5 transition-transform">
                {t.whatIsSkill}
              </button>
            </div>

            <div className="mt-auto pt-10 flex items-center gap-4">
              <a href="#" className="border-brutalist shadow-brutalist bg-primary text-primary-foreground px-4 py-2.5 font-mono text-sm font-bold flex items-center gap-2 hover:-translate-y-0.5 transition-transform">
                <span>⚡</span>
                <span>skillbooks/awesome-accounting</span>
              </a>
              <div className="flex items-center gap-1.5 font-mono text-sm text-muted-foreground">
                <Star className="w-4 h-4 fill-highlight text-highlight" />
                <span className="font-bold">86</span>
              </div>
            </div>
          </div>

          {/* Book-style tabs — vertical on md+, read top-to-bottom (rotate-90) */}
          <div className="hidden md:flex flex-col border-brutalist border-l-0">
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
                    flex-1 border-r-[2.5px] last:border-r-0 border-border
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
                {activeTab === "guide" ? ".claude/skills/" : activeTab === "contact" ? "the-imprint/" : activeTab === "lang" ? "the-index/" : "~/playbook"}
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
