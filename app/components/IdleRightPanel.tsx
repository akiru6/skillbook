import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOG_ENTRIES = [
  { time: "14:02:01", tag: "INFO", text: "Connecting to bank API...", tagColor: "text-sky-400" },
  { time: "14:02:02", tag: "PROCESSING", text: "Fetching transaction history...", tagColor: "text-amber-400" },
  { time: "14:02:03", tag: "SUCCESS", text: "342 transactions synced.", tagColor: "text-highlight" },
  { time: "14:02:04", tag: "AI-AGENT", text: "Auto-categorizing expenses...", tagColor: "text-violet-400" },
  { time: "14:02:05", tag: "PROCESSING", text: "Matching invoices to payments...", tagColor: "text-amber-400" },
  { time: "14:02:06", tag: "SUCCESS", text: "97.3% match rate achieved.", tagColor: "text-highlight" },
  { time: "14:02:07", tag: "INFO", text: "Generating Q3 tax estimate...", tagColor: "text-sky-400" },
  { time: "14:02:08", tag: "AI-AGENT", text: "Detecting anomalous entries...", tagColor: "text-violet-400" },
  { time: "14:02:09", tag: "WARN", text: "Duplicate entry #4821 flagged.", tagColor: "text-amber-300" },
  { time: "14:02:10", tag: "SUCCESS", text: "Cash flow forecast ready.", tagColor: "text-highlight" },
  { time: "14:02:11", tag: "INFO", text: "Compiling audit report...", tagColor: "text-sky-400" },
  { time: "14:02:12", tag: "AI-AGENT", text: "Running compliance checks...", tagColor: "text-violet-400" },
  { time: "14:02:13", tag: "SUCCESS", text: "All checks passed. Report exported.", tagColor: "text-highlight" },
  { time: "14:02:14", tag: "INFO", text: "Session complete. Standing by...", tagColor: "text-sky-400" },
];

const MAX_VISIBLE = 12;
const DELAYS = [500, 900, 300, 1100, 600, 400, 1000, 700, 350, 800, 550, 950, 450, 750];

function StreamingTerminal() {
  const [lines, setLines] = useState<typeof LOG_ENTRIES>([]);
  const indexRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const addLine = () => {
      setLines((prev) => {
        const next = [...prev, LOG_ENTRIES[indexRef.current % LOG_ENTRIES.length]];
        if (next.length > MAX_VISIBLE) next.shift();
        return next;
      });
      const delayIdx = indexRef.current % DELAYS.length;
      indexRef.current++;
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      });
      timeoutRef.current = setTimeout(addLine, DELAYS[delayIdx]);
    };

    timeoutRef.current = setTimeout(addLine, 600);
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div className="w-full max-w-lg" style={{ perspective: "1200px" }}>
      <div
        className="relative border-[3px] border-foreground/80 bg-[hsl(0,0%,5%)] shadow-[12px_16px_0px_hsl(var(--border))]"
        style={{
          transform: "rotateY(-15deg) rotateX(10deg) skewY(-1.5deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Terminal header */}
        <div className="flex items-center justify-between border-b-[3px] border-foreground/80 px-4 py-2.5 bg-[hsl(0,0%,8%)]">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/90" />
            <span className="w-3 h-3 rounded-full bg-amber-400/90" />
            <span className="w-3 h-3 rounded-full bg-emerald-400/90" />
          </div>
          <span className="font-mono text-[11px] text-white/40 tracking-wider">
            skillbook — agent.process
          </span>
          <div className="w-12" />
        </div>

        {/* Terminal body */}
        <div
          ref={scrollRef}
          className="p-4 h-[320px] overflow-hidden font-mono text-[12px] md:text-[13px] leading-relaxed"
        >
          <AnimatePresence initial={false}>
            {lines.map((line, i) => (
              <motion.div
                key={`${indexRef.current}-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="flex gap-2 whitespace-nowrap"
              >
                <span className="text-white/25 shrink-0">[{line.time}]</span>
                <span className={`shrink-0 font-bold ${line.tagColor}`}>
                  [{line.tag}]
                </span>
                <span className="text-white/70">{line.text}</span>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Blinking cursor */}
          <div className="mt-1 flex items-center gap-1">
            <span className="text-white/25 font-mono text-[12px]">{">"}</span>
            <span className="inline-block w-2 h-4 bg-highlight animate-blink" />
          </div>
        </div>

        {/* Status bar */}
        <div className="border-t-[3px] border-foreground/80 px-4 py-1.5 bg-[hsl(0,0%,8%)] flex items-center justify-between font-mono text-[10px] text-white/30">
          <span>⚡ skillbook/awesome-accounting</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            LIVE
          </span>
        </div>
      </div>
    </div>
  );
}

export default function IdleRightPanel() {
  return (
    <div className="hidden md:flex flex-1 max-w-xl w-full flex-col items-center justify-center gap-6 animate-fade-in">
      <StreamingTerminal />
      <p className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
        ← click a tab to open
      </p>
    </div>
  );
}
