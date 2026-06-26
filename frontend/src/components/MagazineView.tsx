import React from "react";
import { MABAR_ESSAYS, INDIAN_OCEAN_DISPATCHES } from "../mabarData";

interface MagazineViewProps {
  readingArticleId: string | null;
  activeMagazineCategory: string;
  setActiveMagazineCategory: React.Dispatch<React.SetStateAction<string>>;
  setReadingArticleId: React.Dispatch<React.SetStateAction<string | null>>;
  handleNavigation: (view: any) => void;
}

export default function MagazineView({
  readingArticleId,
  activeMagazineCategory,
  setActiveMagazineCategory,
  setReadingArticleId,
  handleNavigation: _handleNavigation,
}: MagazineViewProps) {
  return (
    <section className="py-12 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 max-w-350 mx-auto w-full pt-10 sm:pt-15">
      <div className="border-b border-teal/15 pb-8 mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-teal">
          Knowledge Production
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold uppercase mt-1 text-teal font-sans">
          Evident Magazine
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-light mt-2 max-w-162.5">
          Critique, decolonial geopolitics, Islamic thought, and commentary on knowledge orders,
          published to resist dead institutional tab systems.
        </p>
      </div>

      {/* If reading a full article */}
      {readingArticleId ? (
        (() => {
          const article = [...MABAR_ESSAYS, ...INDIAN_OCEAN_DISPATCHES].find(
            (a) => a.id === readingArticleId
          );
          if (!article) return <p>Article not found.</p>;

          return (
            <div className="max-w-212.5 mx-auto flex flex-col gap-6">
              <button
                onClick={() => setReadingArticleId(null)}
                className="text-xs text-gold hover:underline self-start bg-transparent border-0 cursor-pointer flex items-center gap-1 font-semibold"
              >
                &larr; Back to Editorial List
              </button>

              <div className="bg-white border border-slate-200/85 shadow-md rounded-2xl p-6 sm:p-10 flex flex-col gap-6">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-xs uppercase font-bold text-teal">{article.category}</span>
                  <h2 className="text-2xl sm:text-4xl font-bold font-serif text-teal mt-2 leading-tight">
                    {article.title}
                  </h2>
                  <p className="text-sm font-medium text-gold font-serif italic mt-2">
                    {article.subtitle}
                  </p>
                  <div className="flex items-center gap-4 mt-6 text-xs text-slate-405">
                    <span>
                      Author: <strong className="text-slate-700">{article.author}</strong>
                    </span>
                    <span>|</span>
                    <span>Published: {article.date}</span>
                    <span>|</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <div className="text-sm sm:text-base leading-relaxed text-slate-700 font-light font-sans flex flex-col gap-4">
                  <p className="font-semibold text-slate-800">{article.excerpt}</p>
                  <p className="mt-4">{article.body}</p>
                  <p className="mt-2 text-xs text-slate-400">
                    This is a prototype essay demonstrating Evident Magazine's active public
                    critique wing. The platform encourages scholars to submit commentaries linking
                    classical textual archives with modern global decolonial themes.
                  </p>
                </div>

                {/* Social mock actions */}
                <div className="border-t border-slate-100 pt-6 mt-6 flex flex-wrap gap-3 items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="bg-slate-100 rounded-full px-3 py-1 border border-slate-200/60 text-slate-600 font-medium">
                      #Decolonial
                    </span>
                    <span className="bg-slate-100 rounded-full px-3 py-1 border border-slate-200/60 text-slate-600 font-medium">
                      #IndianOcean
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => alert("Shared on X")}
                      className="bg-transparent border-0 text-slate-500 hover:text-gold cursor-pointer font-medium"
                    >
                      Share on X
                    </button>
                    <span>|</span>
                    <button
                      onClick={() => alert("PDF link copied")}
                      className="bg-transparent border-0 text-slate-500 hover:text-gold cursor-pointer font-medium"
                    >
                      Copy PDF Link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })()
      ) : (
        <div className="flex flex-col gap-12">
          {/* Category filters */}
          <div className="flex flex-wrap bg-slate-100 rounded-lg p-1 border border-slate-200/80 w-max">
            {[
              "All",
              "Ethics & Jurisprudence",
              "Decolonial Geopolitics",
              "Knowledge & Technology",
              "Indian Ocean Dispatches",
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveMagazineCategory(cat)}
                className={`px-3 py-1.5 rounded text-xs font-semibold border-0 cursor-pointer transition-all ${
                  activeMagazineCategory === cat
                    ? "bg-teal text-white shadow-sm"
                    : "bg-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Essays Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...MABAR_ESSAYS, ...INDIAN_OCEAN_DISPATCHES]
              .filter((a) => {
                if (activeMagazineCategory !== "All" && a.category !== activeMagazineCategory)
                  return false;
                return true;
              })
              .map((article) => (
                <div
                  key={article.id}
                  className="bg-white border border-slate-200/80 hover:border-teal/30 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg shadow-sm"
                >
                  <div>
                    <div className="flex justify-between items-center text-[9px] uppercase font-bold tracking-wide border-b border-slate-100 pb-2 mb-4">
                      <span className="text-teal">{article.category}</span>
                      <span className="text-slate-400">{article.readTime}</span>
                    </div>
                    <h3 className="text-base font-bold text-teal font-serif group-hover:text-gold transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-1 italic line-clamp-1">
                      {article.subtitle}
                    </p>
                    <p className="text-xs text-slate-600 mt-3 font-light leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-4 mt-6 flex justify-between items-center text-xs">
                    <span className="text-[10px] text-slate-405">
                      By {article.author.split(",")[0]}
                    </span>
                    <button
                      onClick={() => setReadingArticleId(article.id)}
                      className="text-xs text-gold hover:underline font-semibold bg-transparent border-0 cursor-pointer"
                    >
                      Read Essay &rarr;
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Indian Ocean Dispatches Dedicated series box */}
          <div className="bg-teal/5 border border-teal/10 p-8 rounded-2xl mt-8">
            <div className="max-w-175 mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-teal">
                Writing Series
              </span>
              <h3 className="text-2xl font-bold font-serif text-teal mt-1">
                Indian Ocean Dispatches
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light mt-2">
                A structured six-part editorial series tracking scholastic circulation routes, legal
                consultations, and colonial resistances linking Calicut to Yemen, East Africa, and
                Sumatra.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {INDIAN_OCEAN_DISPATCHES.map((disp, idx) => (
                <div
                  key={disp.id}
                  className="bg-white border border-slate-200/80 p-5 rounded-xl hover:border-gold/45 transition-all flex flex-col justify-between min-h-45 hover:shadow-md"
                >
                  <div>
                    <span className="text-[8px] uppercase tracking-wider text-gold font-bold">
                      Dispatch {idx + 1}
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 mt-1 line-clamp-2">
                      {disp.title}
                    </h4>
                  </div>
                  <button
                    onClick={() => setReadingArticleId(disp.id)}
                    className="text-[11px] text-teal font-semibold hover:underline bg-transparent border-0 cursor-pointer self-start p-0 mt-4"
                  >
                    Open Dispatch &rarr;
                  </button>
                </div>
              ))}
            </div>

            {/* Compiles Download */}
            <div className="mt-8 border-t border-slate-100 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <span className="text-xs text-slate-500">
                Series Completion Status: <strong className="text-slate-700">3 of 6 Published</strong>
              </span>
              <button
                onClick={() =>
                  alert("Full PDF compilation available upon series completion in late 2026.")
                }
                className="px-4 py-2 bg-transparent hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer transition-all"
              >
                Download PDF Compilation (Planned)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
