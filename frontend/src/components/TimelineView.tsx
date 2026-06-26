import { useState, useMemo } from "react";
import { MABAR_TIMELINE } from "../mabarData";

interface TimelineViewProps {
  t?: any;
}

const CATEGORY_CONFIG: Record<string, { color: string; bg: string; border: string; dot: string; label: string }> = {
  "Scholarship": {
    color: "text-teal", bg: "bg-teal/10 dark:bg-teal/15", border: "border-teal/25", dot: "bg-teal", label: "Scholarship"
  },
  "Colonial Disruption": {
    color: "text-terracotta-dark", bg: "bg-terracotta/10 dark:bg-terracotta/15", border: "border-terracotta/25", dot: "bg-terracotta", label: "Colonial Disruption"
  },
  "Resistance": {
    color: "text-gold-dark", bg: "bg-gold/10 dark:bg-gold/15", border: "border-gold/25", dot: "bg-gold", label: "Resistance"
  },
  "Modern Institutions": {
    color: "text-slate-600 dark:text-slate-300", bg: "bg-slate-100 dark:bg-slate-800", border: "border-slate-200 dark:border-slate-700", dot: "bg-slate-400", label: "Modern"
  },
};

const CATEGORIES = ["All", "Scholarship", "Colonial Disruption", "Resistance", "Modern Institutions"];

// Sort events chronologically by parsing the year
const parseYear = (y: string): number => {
  const n = parseInt(y.replace(/[^0-9]/g, ""));
  if (y.toLowerCase().includes("ce") || parseInt(y) > 0) return n;
  return n;
};

export default function TimelineView({ t: _t }: TimelineViewProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const sorted = useMemo(() => {
    return [...MABAR_TIMELINE].sort((a, b) => parseYear(a.year) - parseYear(b.year));
  }, []);

  const filtered = useMemo(() => {
    if (activeFilter === "All") return sorted;
    return sorted.filter(e => e.category === activeFilter);
  }, [sorted, activeFilter]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: MABAR_TIMELINE.length };
    MABAR_TIMELINE.forEach(e => { c[e.category] = (c[e.category] ?? 0) + 1; });
    return c;
  }, []);

  return (
    <section className="py-12 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 max-w-300 mx-auto w-full pt-10 sm:pt-15">
      {/* Header */}
      <div className="border-b border-teal/15 pb-10 mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-light">
          Chronological Context
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold uppercase mt-1">
          Decolonial Timeline
        </h1>
        <p className="text-xs text-slate-500 font-light mt-2 max-w-2xl leading-relaxed">
          Major historical milestones in Malabar Islamic scholarship, anti-colonial resistance, and maritime trans-oceanic network building — from the first Arab traders to the digital archive era.
        </p>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2.5 mt-8">
          {CATEGORIES.map((cat) => {
            const cfg = cat === "All" ? null : CATEGORY_CONFIG[cat];
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                  isActive
                    ? cat === "All"
                      ? "bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 border-slate-800 dark:border-slate-200"
                      : `${cfg?.bg} ${cfg?.color} ${cfg?.border} shadow-sm`
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300"
                }`}
              >
                {cfg && (
                  <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot} shrink-0`} />
                )}
                {cat === "Colonial Disruption" ? "Disruption" : cat}
                <span className={`font-mono text-[9px] ${isActive ? "opacity-80" : "opacity-50"}`}>
                  {counts[cat] ?? 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-10">
        {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => (
          <div key={key} className="flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full ${cfg.dot}`} />
            <span className="text-[10px] text-slate-500 font-medium">{cfg.label}</span>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Center spine */}
        <div className="absolute left-5 sm:left-7 top-0 bottom-0 w-0.5 bg-linear-to-b from-teal/40 via-slate-200 dark:via-slate-800 to-transparent" />

        <div className="space-y-8">
          {filtered.map((item, idx) => {
            const cfg = CATEGORY_CONFIG[item.category];
            return (
              <div key={idx} className="relative group flex gap-6 sm:gap-8 pl-14 sm:pl-18">
                {/* Dot */}
                <div
                  className={`absolute left-2.5 sm:left-4 top-5 h-5 w-5 rounded-full border-4 border-white dark:border-slate-950 shadow-sm flex items-center justify-center transition-all duration-200 group-hover:scale-125 ${cfg.dot}`}
                />

                {/* Card */}
                <div className={`flex-1 glass-card rounded-2xl border ${cfg.border} shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden`}>
                  {/* Top accent bar */}
                  <div className={`h-0.5 w-full ${cfg.dot}`} />

                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        {/* Year badge */}
                        <span className={`${cfg.bg} ${cfg.color} ${cfg.border} border px-3 py-1 rounded-lg text-xs font-black font-mono tracking-wider shrink-0`}>
                          {item.year}
                        </span>
                        {/* Category badge */}
                        <span className={`text-[9px] uppercase tracking-wider font-extrabold ${cfg.color} opacity-70`}>
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-sm font-extrabold uppercase tracking-wide leading-snug mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* End cap */}
        <div className="flex items-center gap-4 mt-10 pl-0">
          <div className="h-px flex-1 bg-linear-to-r from-teal/20 to-transparent" />
          <span className="text-[10px] text-slate-400 font-light uppercase tracking-wider">Present</span>
        </div>
      </div>

      {/* Summary stats */}
      <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12 border-t border-slate-200/50 dark:border-slate-800/50">
        {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => (
          <div key={key} className={`${cfg.bg} border ${cfg.border} rounded-2xl p-5 text-center`}>
            <div className={`text-3xl font-black ${cfg.color}`}>{counts[key] ?? 0}</div>
            <div className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${cfg.color} opacity-70`}>{cfg.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
