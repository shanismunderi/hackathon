import { useState, useMemo } from "react";
import { MABAR_GLOSSARY } from "../mabarData";

interface GlossaryViewProps {
  t?: any;
}

const CATEGORIES = [
  { id: "all", label: "All Terms" },
  { id: "finance", label: "Islamic Finance", keywords: ["waqf", "riba", "mudarabah", "musharakah", "qard", "baitulmal", "sukuk", "ijara", "zakat"] },
  { id: "jurisprudence", label: "Jurisprudence", keywords: ["fiqh", "ijtihad", "mappila", "kitab"] },
  { id: "philosophy", label: "Philosophy & Politics", keywords: ["coloniality", "decolonial", "epistemology", "zamorin", "shah bandar"] },
  { id: "spirituality", label: "Spirituality", keywords: ["sufi", "ba'alawi", "silsila", "tasawwuf"] },
];

const getCategoryColor = (term: string): { border: string; badge: string; dot: string } => {
  const t = term.toLowerCase();
  if (["waqf","riba","mudarabah","musharakah","qard al-hasan","baitulmal","sukuk","ijara"].some(k => t.includes(k))) {
    return { border: "border-gold/30 hover:border-gold/60", badge: "bg-gold/10 text-gold-dark border-gold/20", dot: "bg-gold" };
  }
  if (["fiqh","ijtihad","mappila","kitab","muamalat"].some(k => t.includes(k))) {
    return { border: "border-teal/30 hover:border-teal/60", badge: "bg-teal/10 text-teal border-teal/20", dot: "bg-teal" };
  }
  if (["ba'alawi","silsila","sufism","sufi"].some(k => t.includes(k))) {
    return { border: "border-terracotta/30 hover:border-terracotta/60", badge: "bg-terracotta/10 text-terracotta-dark border-terracotta/20", dot: "bg-terracotta" };
  }
  return { border: "border-slate-200/80 hover:border-slate-300", badge: "bg-slate-100 text-slate-600 border-slate-200", dot: "bg-slate-400" };
};

export default function GlossaryView({ t: _t }: GlossaryViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const filteredGlossary = useMemo(() => {
    return MABAR_GLOSSARY.filter((item) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        item.term.toLowerCase().includes(query) ||
        item.definition.toLowerCase().includes(query) ||
        item.context.toLowerCase().includes(query) ||
        (item.arabicScript?.toLowerCase().includes(query) ?? false);

      if (activeCategory === "all") return matchesSearch;
      const cat = CATEGORIES.find(c => c.id === activeCategory);
      const matchesCategory = cat?.keywords?.some(k => item.term.toLowerCase().includes(k) || item.definition.toLowerCase().includes(k)) ?? false;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <section className="py-12 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 max-w-7xl mx-auto w-full pt-10 sm:pt-15">
      {/* Header */}
      <div className="border-b border-teal/15 pb-10 mb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gold-dark">
              Conceptual Clarity
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold uppercase mt-1">
              Concept Glossary
            </h1>
            <p className="text-xs text-slate-500 font-light mt-2 max-w-xl leading-relaxed">
              Specialized decolonial, Islamic legal, and Indian Ocean epistemological terminology used across MABAR's research platforms.
            </p>
          </div>
          {/* Stats pill */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 bg-teal/10 border border-teal/20 rounded-full px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-teal animate-pulse" />
              <span className="text-xs font-bold text-teal">{MABAR_GLOSSARY.length} Terms</span>
            </div>
          </div>
        </div>

        {/* Search + Filter row */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Search */}
          <div className="relative w-full sm:w-80 shrink-0">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search terms, definitions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="modern-input pl-9 text-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-0 cursor-pointer p-0"
              >
                <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                  activeCategory === cat.id
                    ? "bg-teal text-white border-teal shadow-sm"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-teal/40"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      {filteredGlossary.length > 0 && (
        <p className="text-[11px] text-slate-400 mb-6 font-light">
          Showing <strong className="text-slate-600 dark:text-slate-300">{filteredGlossary.length}</strong> of {MABAR_GLOSSARY.length} terms
          {searchQuery && <> matching "<em>{searchQuery}</em>"</>}
        </p>
      )}

      {filteredGlossary.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredGlossary.map((item, idx) => {
            const colors = getCategoryColor(item.term);
            const isExpanded = expandedTerm === item.term;
            return (
              <div
                key={idx}
                onClick={() => setExpandedTerm(isExpanded ? null : item.term)}
                className={`glass-card border ${colors.border} rounded-2xl p-5 shadow-xs transition-all duration-200 cursor-pointer group ${isExpanded ? "md:col-span-2" : ""}`}
              >
                {/* Card header */}
                <div className="flex justify-between items-start gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className={`h-2 w-2 rounded-full shrink-0 ${colors.dot}`} />
                    <h3 className="text-sm font-extrabold uppercase tracking-wide group-hover:text-teal transition-colors">
                      {item.term}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {item.arabicScript && (
                      <span
                        className="font-serif text-gold-dark text-sm font-black tracking-wide"
                        style={{ direction: "rtl" }}
                      >
                        {item.arabicScript}
                      </span>
                    )}
                    <svg
                      className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>
                </div>

                {/* Definition */}
                <p className={`text-xs text-slate-600 dark:text-slate-400 font-light leading-relaxed font-sans ${isExpanded ? "" : "line-clamp-3"}`}>
                  {item.definition}
                </p>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-800/40 space-y-3">
                    <div className="flex gap-2">
                      <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded border ${colors.badge} shrink-0 h-max mt-0.5`}>Context</span>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 font-light leading-relaxed font-sans">{item.context}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded border bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700 shrink-0 h-max mt-0.5">MABAR</span>
                      <p className="text-[11px] text-slate-500 font-light leading-relaxed font-sans">{item.relevance}</p>
                    </div>
                  </div>
                )}

                {/* Click hint */}
                {!isExpanded && (
                  <p className="text-[9px] text-teal/60 font-semibold mt-3 uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to expand →
                  </p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-24 flex flex-col items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <svg className="h-8 w-8 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"/>
            </svg>
          </div>
          <p className="text-sm text-slate-500 font-light font-sans">No matching concepts found.</p>
          <button
            onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
            className="text-xs text-teal font-semibold underline bg-transparent border-0 cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
