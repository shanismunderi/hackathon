import React from "react";
import {
  RESEARCH_PAPERS,
  RESEARCH_PROJECTS,
  RESEARCH_CITATIONS,
} from "../mabarData";

interface ResearchViewProps {
  activeResearchTab: "papers" | "briefs" | "projects";
  copiedCitationId: string | null;
  downloadingPaperId: string | null;
  downloadProgress: number;
  citationsSearchQuery: string;
  citationsPage: number;
  selectedBriefId: string;
  regulatoryBoard: string;
  simulatorOutput: any | null;
  selectedComparisonRegion: string;
  setActiveResearchTab: React.Dispatch<React.SetStateAction<"papers" | "briefs" | "projects">>;
  setCitationsSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setCitationsPage: React.Dispatch<React.SetStateAction<number>>;
  setSelectedBriefId: React.Dispatch<React.SetStateAction<string>>;
  setRegulatoryBoard: React.Dispatch<React.SetStateAction<string>>;
  setSimulatorOutput: React.Dispatch<React.SetStateAction<any | null>>;
  setSelectedComparisonRegion: React.Dispatch<React.SetStateAction<string>>;
  handleMockDownload: (paperId: string) => void;
  handleCopyCitation: (id: string, text: string) => void;
  handleNavigation: (view: any) => void;
}

export default function ResearchView({
  activeResearchTab,
  copiedCitationId,
  downloadingPaperId,
  downloadProgress,
  citationsSearchQuery,
  citationsPage,
  selectedBriefId: _selectedBriefId,
  regulatoryBoard,
  simulatorOutput,
  selectedComparisonRegion: _selectedComparisonRegion,
  setActiveResearchTab,
  setCitationsSearchQuery,
  setCitationsPage,
  setSelectedBriefId: _setSelectedBriefId,
  setRegulatoryBoard,
  setSimulatorOutput,
  setSelectedComparisonRegion: _setSelectedComparisonRegion,
  handleMockDownload,
  handleCopyCitation,
  handleNavigation,
}: ResearchViewProps) {
  return (
    <section className="py-12 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 max-w-350 mx-auto w-full pt-10 sm:pt-15">
      <div className="border-b border-teal/15 pb-8 mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-gold">
          Hasanath Institute of IR
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold uppercase mt-1">Research Hub</h1>

        {/* Tab Selector */}
        <div className="flex bg-slate-100 dark:bg-slate-800/60 rounded-xl p-1 border border-slate-200 dark:border-slate-700 w-max mt-6 gap-0.5">
          {[
            { id: "papers", label: "Working Papers" },
            { id: "briefs", label: "Policy Briefs" },
            { id: "projects", label: "Research Projects" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveResearchTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-bold border-0 cursor-pointer transition-all ${
                activeResearchTab === tab.id
                  ? "bg-white dark:bg-slate-900 text-gold shadow-sm border border-slate-200 dark:border-slate-700"
                  : "bg-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab: Papers / Briefs lists */}
      {(activeResearchTab === "papers" || activeResearchTab === "briefs") && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 flex flex-col gap-6">
              {RESEARCH_PAPERS.filter((p) => {
                const isBrief = p.type === "Policy Brief";
                return activeResearchTab === "briefs" ? isBrief : !isBrief;
              }).map((paper) => (
                <div
                  key={paper.id}
                  className="bg-white border border-slate-200/60 hover:border-gold/25 p-6 rounded-2xl transition-all"
                >
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-base font-bold text-teal font-serif">{paper.title}</h3>
                    <span className="text-[10px] text-slate-400">{paper.pdfSize}</span>
                  </div>
                  <p className="text-[10px] text-gold mt-1">Author: {paper.author}</p>
                  <p className="text-xs text-slate-700 mt-3 font-light leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/40">
                    {paper.abstract}
                  </p>

                  {/* Keywords */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {paper.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="text-[9px] bg-slate-50 text-slate-500 rounded-full px-2 py-0.5 border border-slate-200/50"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>

                  {/* Download and cite buttons row */}
                  <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => handleMockDownload(paper.id)}
                      className="px-4 py-2 bg-teal hover:bg-teal-dark text-white text-xs font-bold uppercase rounded cursor-pointer border border-teal/20 transition-all flex items-center gap-1.5"
                    >
                      {downloadingPaperId === paper.id ? (
                        <span>Downloading ({downloadProgress}%)</span>
                      ) : (
                        <>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                          </svg>
                          <span>Download PDF ({paper.downloadCount})</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleCopyCitation(paper.id, paper.citation)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase rounded cursor-pointer border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-1.5"
                    >
                      {copiedCitationId === paper.id ? (
                        <span className="text-emerald-600">Citation Copied!</span>
                      ) : (
                        <span>Cite Research</span>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right panel: Policy alignment simulator */}
            {activeResearchTab === "briefs" && (
              <div className="lg:col-span-1 bg-white border border-slate-200/60 p-6 rounded-2xl shadow-xs">
                <h3 className="text-sm font-bold uppercase tracking-wider text-teal border-b border-slate-100 pb-2 mb-4 font-sans">
                  Policy Alignment Simulator
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-light mb-6 font-sans">
                  Choose a target regulatory board and mock-simulate local alignment possibilities for
                  decolonial archives.
                </p>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-500 uppercase text-[9px] tracking-wide font-bold">
                      Target Regulatory Board
                    </label>
                    <select
                      value={regulatoryBoard}
                      onChange={(e) => {
                        setRegulatoryBoard(e.target.value);
                        setSimulatorOutput(null);
                      }}
                      className="bg-slate-50 border border-slate-350 px-3 py-2 text-xs rounded text-slate-800 focus:outline-none focus:border-teal cursor-pointer font-sans"
                    >
                      <option value="Waqf Board">State Waqf Board</option>
                      <option value="Cooperative Registrar">Registrar of Cooperatives</option>
                      <option value="Archaeological Survey">Archaeological Survey of India</option>
                      <option value="Central Bank (RBI)">Reserve Bank of India (RBI)</option>
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      let alignment = "";
                      let solution = "";
                      let barrier = "";
                      let impact = "";

                      if (regulatoryBoard === "Waqf Board") {
                        alignment = "Partially Aligned (65% compliance)";
                        solution =
                          "Draft a petition under Waqf Act Sec. 32 to authorize local agricultural lease cooperatives on unused lands.";
                        barrier =
                          "High bureaucratic delays in resolving property titles in municipal records.";
                        impact = "Unlocks $45k/year in rental yield for local student stipends.";
                      } else if (regulatoryBoard === "Cooperative Registrar") {
                        alignment = "Highly Aligned (85% compliance)";
                        solution =
                          "Incorporate under Multi-State Cooperative Societies Act. Structure risk-sharing interest-free microfinance models.";
                        barrier =
                          "Explicit federal rules require cooperative name definitions to avoid 'banking' terms.";
                        impact = "Creates a model for remittance equity capital mobilization.";
                      } else if (regulatoryBoard === "Central Bank (RBI)") {
                        alignment = "Low Alignment (25% compliance)";
                        solution =
                          "Apply for NBFC license (Non-Deposit-Taking). Reserve funds strictly for direct equity-backed trades.";
                        barrier =
                          "Banking Regulation Act Section 21 requires RBI licensed commercial banks to utilize interest-based guidelines.";
                        impact = "Establishes a legal NBFC venture capital pool in Calicut.";
                      } else {
                        alignment = "Not Aligned (15% compliance)";
                        solution =
                          "Create bilateral agreements with regional university cells to digitize texts independently.";
                        barrier = "Federal bilateral treaties override local state initiatives.";
                        impact = "Unified digital archive exchanges.";
                      }

                      setSimulatorOutput({ alignment, solution, barrier, impact });
                    }}
                    className="py-2 bg-teal hover:bg-teal-dark text-white font-bold uppercase rounded cursor-pointer transition-colors border-0 shadow-xs font-sans text-xs"
                  >
                    Simulate Alignment
                  </button>

                  {simulatorOutput && (
                    <div className="bg-slate-100 border border-slate-200 p-4 rounded-xl flex flex-col gap-2 text-[11px] leading-relaxed text-slate-750 animate-fade-in font-sans">
                      <div>
                        <strong className="text-teal font-medium uppercase text-[9px] tracking-wide block">
                          Alignment Outcome:
                        </strong>
                        <span className="font-bold text-gold">{simulatorOutput.alignment}</span>
                      </div>
                      <div>
                        <strong className="text-teal font-medium uppercase text-[9px] tracking-wide block">
                          Proposed Policy Action:
                        </strong>
                        <span>{simulatorOutput.solution}</span>
                      </div>
                      <div>
                        <strong className="text-teal font-medium uppercase text-[9px] tracking-wide block">
                          Regulatory Barrier:
                        </strong>
                        <span>{simulatorOutput.barrier}</span>
                      </div>
                      <div>
                        <strong className="text-teal font-medium uppercase text-[9px] tracking-wide block">
                          Estimated Impact:
                        </strong>
                        <span className="font-bold text-emerald-600">{simulatorOutput.impact}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Citations & References Database Table */}
          <div className="mt-12 bg-white border border-slate-200/60 p-6 sm:p-8 rounded-3xl shadow-xs w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-105 pb-4 mb-6 gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal bg-teal/10 px-2.5 py-0.5 rounded border border-teal/20 font-sans inline-block mb-1">
                  Scholastic Index
                </span>
                <h3 className="text-lg font-bold text-teal font-sans">
                  Citations & References Database
                </h3>
                <p className="text-xs text-slate-500 font-light font-sans mt-0.5">
                  Cataloged classical manuscripts, treaties, and legal codes referenced in Malabar Decolonial Space
                  working papers.
                </p>
              </div>

              <input
                type="text"
                placeholder="Search citation database..."
                value={citationsSearchQuery}
                onChange={(e) => {
                  setCitationsSearchQuery(e.target.value);
                  setCitationsPage(1);
                }}
                className="bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs rounded-lg text-slate-850 focus:outline-none focus:border-teal min-w-56 font-sans"
              />
            </div>

            {/* Scrollable table container */}
            <div className="overflow-x-auto w-full border border-slate-100 rounded-xl">
              <table className="w-full text-left border-collapse text-xs font-sans">
                <thead>
                  <tr className="bg-slate-50 text-slate-750 border-b border-slate-200 uppercase text-[9px] font-bold tracking-wider">
                    <th className="p-3">Author</th>
                    <th className="p-3">Title</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Year</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Citation Key</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {(() => {
                    const filtered = RESEARCH_CITATIONS.filter((item) => {
                      if (!citationsSearchQuery) return true;
                      const q = citationsSearchQuery.toLowerCase();
                      return (
                        item.author.toLowerCase().includes(q) ||
                        item.title.toLowerCase().includes(q) ||
                        item.type.toLowerCase().includes(q) ||
                        item.year.includes(q) ||
                        item.location.toLowerCase().includes(q)
                      );
                    });

                    const limit = 3;
                    const start = (citationsPage - 1) * limit;
                    const pageItems = filtered.slice(start, start + limit);

                    if (pageItems.length === 0) {
                      return (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-slate-450 font-light">
                            No citation records found matching your search.
                          </td>
                        </tr>
                      );
                    }

                    return (
                      <>
                        {pageItems.map((cit) => (
                          <tr key={cit.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-3 font-semibold text-slate-800">{cit.author}</td>
                            <td className="p-3 font-serif italic text-teal">{cit.title}</td>
                            <td className="p-3">{cit.type}</td>
                            <td className="p-3 font-mono">{cit.year}</td>
                            <td className="p-3">{cit.location}</td>
                            <td className="p-3">
                              <button
                                onClick={() => handleCopyCitation(cit.id, cit.citation)}
                                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border-0 rounded cursor-pointer font-bold text-[10px]"
                              >
                                {copiedCitationId === cit.id ? "Copied!" : "Copy Cite"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </>
                    );
                  })()}
                </tbody>
              </table>
            </div>

            {/* Table pagination */}
            {(() => {
              const filtered = RESEARCH_CITATIONS.filter((item) => {
                if (!citationsSearchQuery) return true;
                const q = citationsSearchQuery.toLowerCase();
                return (
                  item.author.toLowerCase().includes(q) ||
                  item.title.toLowerCase().includes(q) ||
                  item.type.toLowerCase().includes(q) ||
                  item.year.includes(q) ||
                  item.location.toLowerCase().includes(q)
                );
              });
              const limit = 3;
              const totalPages = Math.ceil(filtered.length / limit);
              if (totalPages <= 1) return null;

              return (
                <div className="flex items-center justify-between mt-4 text-xs font-sans">
                  <span className="text-slate-450">
                    Showing Page <strong>{citationsPage}</strong> of <strong>{totalPages}</strong>{" "}
                    ({filtered.length} entries)
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={citationsPage === 1}
                      onClick={() => setCitationsPage((p) => Math.max(1, p - 1))}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border-0 rounded cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed font-bold"
                    >
                      Prev
                    </button>
                    <button
                      disabled={citationsPage === totalPages}
                      onClick={() => setCitationsPage((p) => Math.min(totalPages, p + 1))}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border-0 rounded cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed font-bold"
                    >
                      Next
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </>
      )}

      {/* Tab: Projects list */}
      {activeResearchTab === "projects" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {RESEARCH_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="bg-white border border-teal/15 p-6 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] uppercase font-bold text-teal bg-teal/10 px-2 py-0.5 rounded border border-teal/25">
                    {proj.status}
                  </span>
                  <span className="text-xs text-slate-400">{proj.timeline}</span>
                </div>
                <h3 className="text-base font-bold text-teal uppercase tracking-wider">
                  {proj.title}
                </h3>
                <p className="text-xs text-gold font-medium mt-1">
                  Research Question:{" "}
                  <span className="font-light italic text-slate-700">"{proj.question}"</span>
                </p>
                <p className="text-xs text-slate-600 mt-4 leading-relaxed font-light">
                  {proj.description}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4 mt-6">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase">Team Leads</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {proj.team.map((t) => (
                    <span
                      key={t}
                      className="bg-slate-50 text-[10px] text-slate-700 rounded px-2.5 py-1 border border-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => handleNavigation("contribute")}
                  className="mt-6 w-full text-center py-2 bg-teal/10 hover:bg-teal/20 text-teal text-xs font-semibold rounded-lg cursor-pointer border border-teal/30 transition-colors"
                >
                  Call for Collaborators &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
