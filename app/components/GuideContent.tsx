import { useState } from "react";
import { ArrowLeft, MousePointerClick, FileCode, Terminal, BookMarked, Layers, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getTranslations, type Language } from "@/i18n";

type ToolId = "antigravity" | "claude";
type PeekTarget = "SKILL.md" | "scripts/" | "references/" | "assets/" | null;

const peekVariants = {
  initial: { opacity: 0, scale: 0.92, y: 8 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -6 },
};

const PeekNote = ({ onClose, bg, rotate, children }: { onClose: () => void; bg: string; rotate: string; children: React.ReactNode }) => (
  <motion.div
    variants={peekVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.2, ease: "easeOut" }}
    className={`relative border-[3px] border-foreground ${bg} p-5 shadow-[6px_6px_0px_hsl(var(--border))] w-[400px] h-auto ${rotate}`}
  >
    {/* Washi tape */}
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-card/60 border-[2px] border-foreground/30 rotate-[3deg] z-10" />
    <button
      onClick={onClose}
      className="absolute -top-3 -right-3 w-7 h-7 border-[3px] border-foreground bg-card flex items-center justify-center font-mono text-xs font-bold hover:bg-highlight hover:text-accent-foreground transition-colors z-20"
    >
      ✕
    </button>
    {children}
  </motion.div>
);

type GuideTranslations = ReturnType<typeof getTranslations>["guide"];

const SkillMdPeek = ({ onClose, t }: { onClose: () => void, t: GuideTranslations }) => (
  <PeekNote onClose={onClose} bg="bg-[hsl(var(--macaron-pink))]" rotate="rotate-[1.5deg]">
    <p className="font-mono text-xs font-bold mb-1.5">{t.peek.skillMd.title}</p>
    <p className="text-xs text-foreground/70 mb-3">{t.peek.skillMd.description}</p>
    <pre className="bg-foreground/5 border-[2px] border-foreground/15 p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap break-words overflow-hidden">
      <code>{`name:        invoice-posting
description: Generates Journal Entries
             based on Invoice JSON & COA.
input:       InvoiceData + coa.json
output:      PostingResult JSON`}</code>
    </pre>
  </PeekNote>
);

const ScriptsPeek = ({ onClose, t }: { onClose: () => void, t: GuideTranslations }) => (
  <PeekNote onClose={onClose} bg="bg-[hsl(var(--macaron-yellow))]" rotate="-rotate-[1deg]">
    <p className="font-mono text-xs font-bold mb-1.5">{t.peek.scripts.title}</p>
    <p className="text-xs text-foreground/70 mb-3">{t.peek.scripts.description}</p>
    <div className="bg-foreground/5 border-[2px] border-foreground/15 p-3 font-mono text-xs space-y-1.5">
      <p className="flex justify-between gap-4"><span className="text-foreground/80">{t.peek.scripts.file1}</span><span className="text-foreground/40">{t.peek.scripts.comment1}</span></p>
      <p className="flex justify-between gap-4"><span className="text-foreground/80">{t.peek.scripts.file2}</span><span className="text-foreground/40">{t.peek.scripts.comment2}</span></p>
      <p className="flex justify-between gap-4"><span className="text-foreground/80">{t.peek.scripts.file3}</span><span className="text-foreground/40">{t.peek.scripts.comment3}</span></p>
    </div>
  </PeekNote>
);

const ReferencesPeek = ({ onClose, t }: { onClose: () => void, t: GuideTranslations }) => (
  <PeekNote onClose={onClose} bg="bg-[hsl(var(--macaron-mint))]" rotate="rotate-[2deg]">
    <p className="font-mono text-xs font-bold mb-1.5">{t.peek.references.title}</p>
    <p className="text-xs text-foreground/70 mb-3">{t.peek.references.description}</p>
    <div className="bg-foreground/5 border-[2px] border-foreground/15 p-3 font-mono text-xs space-y-1.5">
      <p className="flex items-center gap-2"><span className="text-foreground/40">📄</span> {t.peek.references.file1}</p>
      <p className="flex items-center gap-2"><span className="text-foreground/40">📄</span> {t.peek.references.file2}</p>
      <p className="flex items-center gap-2"><span className="text-foreground/40">📄</span> {t.peek.references.file3}</p>
    </div>
  </PeekNote>
);

const AssetsPeek = ({ onClose, t }: { onClose: () => void, t: GuideTranslations }) => (
  <PeekNote onClose={onClose} bg="bg-[hsl(var(--macaron-peach))]" rotate="-rotate-[1.5deg]">
    <p className="font-mono text-xs font-bold mb-1.5">{t.peek.assets.title}</p>
    <p className="text-xs text-foreground/70 mb-3">{t.peek.assets.description}</p>
    <div className="bg-foreground/5 border-[2px] border-foreground/15 p-3 font-mono text-xs space-y-1.5">
      <p className="flex items-center gap-2"><span className="text-foreground/40">📊</span> {t.peek.assets.file1}</p>
      <p className="flex items-center gap-2"><span className="text-foreground/40">📋</span> {t.peek.assets.file2}</p>
      <p className="flex items-center gap-2"><span className="text-foreground/40">🎨</span> {t.peek.assets.file3}</p>
    </div>
  </PeekNote>
);

const PEEK_MAP: Record<string, React.FC<{ onClose: () => void, t: GuideTranslations }>> = {
  "SKILL.md": SkillMdPeek,
  "scripts/": ScriptsPeek,
  "references/": ReferencesPeek,
  "assets/": AssetsPeek,
};

const SkillMdFull = ({ onBack, t }: { onBack: () => void, t: GuideTranslations }) => (
  <div className="animate-slide-in-left p-6 space-y-4">
    <button
      onClick={onBack}
      className="flex items-center gap-1.5 font-mono text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
    >
      <ArrowLeft className="w-3.5 h-3.5" /> {t.fullView.back}
    </button>
    <div className="border-[3px] border-foreground bg-highlight/10 px-3 py-1.5 font-mono text-xs font-bold inline-block">
      📄 .claude/skills/my-skill/SKILL.md
    </div>
    <div className="font-mono text-sm space-y-1 bg-window p-4 border-brutalist">
      <p className="text-highlight font-bold"># Invoice Generator Skill</p>
      <p className="text-muted-foreground">---</p>
      <p><span className="text-highlight">name:</span> invoice-generator</p>
      <p><span className="text-highlight">version:</span> 1.2.0</p>
      <p><span className="text-highlight">author:</span> @liwei</p>
      <p><span className="text-highlight">tags:</span> [invoicing, automation]</p>
      <p className="text-muted-foreground">---</p>
      <p className="pt-2">## Description</p>
      <p className="text-muted-foreground">Auto-generate professional invoices</p>
      <p className="text-muted-foreground">from order data. Supports multi-currency</p>
      <p className="text-muted-foreground">and tax rate calculations.</p>
      <p className="pt-2">## Usage</p>
      <p className="text-muted-foreground">{t.fullView.usageLine1}</p>
      <p className="text-muted-foreground">{t.fullView.usageLine2}</p>
      <p className="text-muted-foreground">{t.fullView.usageLine3}</p>
    </div>
  </div>
);

export default function GuideContent({ lang }: { lang?: Language }) {
  const [viewing, setViewing] = useState<string | null>(null);
  const [peeking, setPeeking] = useState<PeekTarget>(null);
  const [activeTool, setActiveTool] = useState<ToolId>("antigravity");
  const [toolDropdownOpen, setToolDropdownOpen] = useState(false);

  const currentLang = lang || "en";
  const t = getTranslations(currentLang).guide;

  const FILE_TREE_ITEMS = [
    { name: "SKILL.md" as const, icon: <FileCode className="w-3.5 h-3.5" />, color: "bg-highlight/20 text-highlight", desc: t.items.skillMd },
    { name: "scripts/" as const, icon: <Terminal className="w-3.5 h-3.5" />, color: "bg-[hsl(var(--macaron-lavender))]/30 text-[hsl(var(--macaron-lavender))]", desc: t.items.scripts },
    { name: "references/" as const, icon: <BookMarked className="w-3.5 h-3.5" />, color: "bg-[hsl(var(--macaron-mint))]/30 text-[hsl(var(--macaron-mint))]", desc: t.items.references },
    { name: "assets/" as const, icon: <Layers className="w-3.5 h-3.5" />, color: "bg-[hsl(var(--macaron-peach))]/30 text-[hsl(var(--macaron-peach))]", desc: t.items.assets },
  ] as const;

  if (viewing === "SKILL.md") {
    return <SkillMdFull onBack={() => setViewing(null)} t={t} />;
  }

  const handleItemClick = (name: PeekTarget) => {
    setPeeking((prev) => (prev === name ? null : name));
  };

  const PeekComponent = peeking ? PEEK_MAP[peeking] : null;

  return (
    <div className="animate-slide-in-left p-6 space-y-5 relative">
      {/* Speech bubble header */}
      <div className="relative border-[3px] border-foreground bg-[hsl(var(--macaron-yellow))] px-4 py-3 shadow-[4px_4px_0px_hsl(var(--border))]">
        <span className="font-mono text-sm font-bold">{t.newToSkills}</span>
        <div className="absolute -bottom-[14px] left-6 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px] border-t-foreground" />
        <div className="absolute -bottom-[10px] left-[27px] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[11px] border-t-[hsl(var(--macaron-yellow))]" />
      </div>

      {/* Main definition */}
      <h3 className="text-xl font-bold leading-snug pt-2">
        {t.definitionPrefix}
        <span className="text-[hsl(var(--macaron-sky))] underline decoration-[3px] underline-offset-2">{t.definitionHighlight}</span>
        {t.definitionSuffix1}
        <span className="text-highlight italic">{t.definitionSuffix2}</span>.
      </h3>
      <p className="text-muted-foreground text-sm">
        {t.description}
      </p>

      {/* File tree */}
      <div className="pt-4">
        {/* Tool selector */}
        <div className="mb-3 flex items-center gap-2 flex-wrap">
          <span className="font-mono text-[11px] text-muted-foreground whitespace-nowrap">{t.toolLabel}:</span>
          <div className="relative">
            <button
              onClick={() => setToolDropdownOpen(!toolDropdownOpen)}
              className="border-[2px] border-foreground/30 px-2.5 py-1 bg-card font-mono text-[11px] font-bold flex items-center gap-1.5 hover:border-foreground/50 transition-colors"
            >
              {t.toolTabs[activeTool]}
              <ChevronDown className={`w-3 h-3 transition-transform ${toolDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {toolDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 z-30 border-[2px] border-foreground/30 bg-card shadow-[3px_3px_0px_hsl(var(--border))] min-w-[140px]">
                {(["antigravity", "claude"] as ToolId[]).map((tool) => (
                  <button
                    key={tool}
                    onClick={() => { setActiveTool(tool); setToolDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 font-mono text-[11px] font-bold transition-colors ${
                      activeTool === tool
                        ? 'bg-highlight text-accent-foreground'
                        : 'hover:bg-secondary'
                    }`}
                  >
                    {t.toolTabs[tool]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Unified layered tree */}
        <div className="font-mono text-[13px] relative" style={{ lineHeight: '1.4' }}>

          {/* Level 1: your-project/ */}
          <div className="flex items-center gap-1.5 py-1 pl-0.5">
            <span className="text-foreground/40 shrink-0 text-xs">📁</span>
            <span className="font-bold text-foreground/55">your-project/</span>
            <span className="text-muted-foreground/45 text-[10px] ml-auto hidden sm:inline">── {t.pathHints.projectRoot}</span>
          </div>

          {/* Level 2: .agents/skills/ — with L-branch from level 1 */}
          <div className="relative" style={{ paddingLeft: '18px' }}>
            {/* └── branch */}
            <div className="absolute left-[7px] top-0 h-[13px] w-[2px] bg-foreground/20" />
            <div className="absolute left-[7px] top-[13px] w-[9px] h-[2px] bg-foreground/20" />
            <div className="flex items-center gap-1.5 py-1">
              <span className="text-foreground/35 shrink-0 text-xs">📂</span>
              <span className="font-bold text-foreground/50">{t.titleBarPaths[activeTool]}</span>
              <span className="text-muted-foreground/45 text-[10px] ml-auto hidden sm:inline">── {t.pathHints.fixedPath}</span>
            </div>

            {/* Level 3: my-skill/ — with L-branch from level 2 */}
            <div className="relative" style={{ paddingLeft: '20px' }}>
              {/* └── branch */}
              <div className="absolute left-[7px] top-0 h-[13px] w-[2px] bg-foreground/20" />
              <div className="absolute left-[7px] top-[13px] w-[11px] h-[2px] bg-foreground/20" />
              <div className="flex items-center gap-1.5 py-1">
                <span className="text-foreground/35 shrink-0 text-xs">📂</span>
                <span className="border-[1.5px] border-dashed border-highlight/50 px-1.5 py-0.5 font-bold text-highlight bg-highlight/5 text-[12px]">
                  my-skill/
                </span>
                <span className="text-muted-foreground/45 text-[10px] ml-auto hidden sm:inline">── {t.pathHints.skillFolder}</span>
              </div>

              {/* Level 4: Skill contents */}
              <div className="relative" style={{ paddingLeft: '20px' }}>
                {/* Vertical trunk line for all children */}
                <div className="absolute left-[7px] top-0 w-[2px] bg-foreground/20" style={{ height: 'calc(100% - 18px)' }} />

                {FILE_TREE_ITEMS.map((item, i) => {
                  const isLast = i === FILE_TREE_ITEMS.length - 1;
                  const isActive = peeking === item.name;
                  return (
                    <div
                      key={item.name}
                      className={`
                        group relative flex items-center gap-2.5 py-1.5 pr-2 transition-colors duration-150 cursor-pointer
                        ${isActive ? "bg-[hsl(var(--macaron-yellow))]/50" : "hover:bg-[hsl(var(--macaron-yellow))]/30"}
                      `}
                      style={{ paddingLeft: '4px' }}
                      onClick={() => handleItemClick(item.name as PeekTarget)}
                    >
                      {/* ├── or └── branch */}
                      <div className="absolute left-[7px] w-[11px] h-[2px] bg-foreground/20" style={{ top: '50%' }} />
                      {isLast && (
                        <div className="absolute left-[7px] w-[2px] bg-card" style={{ top: '50%', bottom: 0 }} />
                      )}

                      <span className={`shrink-0 w-5 h-5 flex items-center justify-center text-[10px] border-[2px] border-foreground/20 ${item.color}`} style={{ marginLeft: '14px' }}>
                        {item.icon}
                      </span>

                      <span className={`font-bold text-[13px] ${isActive ? "text-highlight underline" : "group-hover:text-highlight"}`}>
                        {item.name}
                      </span>

                      <span className="text-muted-foreground text-[10px] ml-auto hidden sm:inline-flex items-center gap-1">
                        <span className="text-foreground/15">←</span> {item.desc}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 justify-center pt-4 text-muted-foreground">
          <MousePointerClick className="w-4 h-4 text-highlight animate-bounce" />
          <span className="font-mono text-[11px] italic">{t.clickToPeek}</span>
        </div>
      </div>

      {/* Floating peek notes */}
      <AnimatePresence mode="wait">
        {PeekComponent && peeking && (
          <div key={peeking} className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto">
              <PeekComponent onClose={() => setPeeking(null)} t={t} />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
