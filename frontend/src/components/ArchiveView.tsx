import React from "react";
import { KITAB_REPOSITORY } from "../mabarData";

interface ArchiveViewProps {
  selectedKitabId: string | null;
  kitabSearchQuery: string;
  kitabGenreFilter: string;
  kitabAnnotationTab: "historical" | "jurisprudential" | "decolonial" | "indianOcean" | "comparativeTheory";
  kitabTranslationTab: "arabic" | "english" | "malayalam";
  submitSuccess: boolean;
  reviewQueue: any[];
  archiveCenturyFilter: string;
  archiveOwnershipFilter: string;
  archiveStatusFilter: string;
  transcriptionInput: string;
  selectedTranscriptionId: string;
  transcriptionScore: number | null;
  setSelectedKitabId: React.Dispatch<React.SetStateAction<string | null>>;
  setKitabSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setKitabGenreFilter: React.Dispatch<React.SetStateAction<string>>;
  setKitabAnnotationTab: React.Dispatch<React.SetStateAction<"historical" | "jurisprudential" | "decolonial" | "indianOcean" | "comparativeTheory">>;
  setKitabTranslationTab: React.Dispatch<React.SetStateAction<"arabic" | "english" | "malayalam">>;
  setSubmitSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setReviewQueue: React.Dispatch<React.SetStateAction<any[]>>;
  setArchiveCenturyFilter: React.Dispatch<React.SetStateAction<string>>;
  setArchiveOwnershipFilter: React.Dispatch<React.SetStateAction<string>>;
  setArchiveStatusFilter: React.Dispatch<React.SetStateAction<string>>;
  setTranscriptionInput: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTranscriptionId: React.Dispatch<React.SetStateAction<string>>;
  setTranscriptionScore: React.Dispatch<React.SetStateAction<number | null>>;
  handleNavigation: (view: any) => void;
}

export default function ArchiveView({
  selectedKitabId,
  kitabSearchQuery,
  kitabGenreFilter,
  kitabAnnotationTab,
  kitabTranslationTab,
  submitSuccess,
  reviewQueue,
  archiveCenturyFilter,
  archiveOwnershipFilter,
  archiveStatusFilter,
  transcriptionInput,
  selectedTranscriptionId,
  transcriptionScore,
  setSelectedKitabId,
  setKitabSearchQuery,
  setKitabGenreFilter,
  setKitabAnnotationTab,
  setKitabTranslationTab,
  setSubmitSuccess,
  setReviewQueue,
  setArchiveCenturyFilter,
  setArchiveOwnershipFilter,
  setArchiveStatusFilter,
  setTranscriptionInput,
  setSelectedTranscriptionId,
  setTranscriptionScore,
  handleNavigation,
}: ArchiveViewProps) {
  return (
    <section className="py-12 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 max-w-7xl mx-auto w-full pt-10 sm:pt-15">
      <div className="border-b border-slate-200 pb-8 mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal">
            Living Archive
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase mt-1 text-teal font-sans">
            Kitab Repository
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-light mt-2 max-w-162.5">
            Documenting, translating, and interpreting Malabar's Kitab literature—an Arabic-Malayalam
            textual tradition that is local, cosmopolitan, autonomous, and continuous.
          </p>
        </div>
      </div>

      {selectedKitabId ? (
        (() => {
          const kitab = KITAB_REPOSITORY.find((k) => k.id === selectedKitabId);
          if (!kitab) return <p>Kitab not found.</p>;

          return (
            <div className="flex flex-col gap-6">
              {/* Back header */}
              <div className="flex items-center justify-between bg-slate-100/60 p-4 rounded-xl border border-slate-200/50">
                <button
                  onClick={() => setSelectedKitabId(null)}
                  className="text-xs text-gold font-semibold hover:underline flex items-center gap-1 bg-transparent border-0 cursor-pointer"
                >
                  &larr; Back to Catalog
                </button>
                <span className="text-xs text-slate-500 font-light">
                  Genre:{" "}
                  <strong className="text-teal font-bold uppercase">{kitab.genre}</strong>
                </span>
              </div>

              {/* Meta Section */}
              <div className="bg-[#FDFBF7] border border-[#E3D1BA]/85 rounded-2xl p-6 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] uppercase font-bold text-gold bg-gold/10 px-2.5 py-0.5 rounded border border-gold/20 font-sans inline-block">
                    Genre: {kitab.genre}
                  </span>
                  <span className="text-[10px] text-slate-400 font-sans font-light">
                    Source Status: {kitab.copyrightStatus || "Open Access"}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-serif italic text-teal">
                  {kitab.title}
                </h2>
                <p className="text-xs text-gold font-semibold mt-1">
                  Author: {kitab.author} | Published: {kitab.date}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-xs text-slate-650 border-t border-slate-200/50 pt-3 font-sans">
                  <p>
                    <strong className="text-teal font-semibold">Script / Lang:</strong>{" "}
                    {kitab.languageScript || kitab.language}
                  </p>
                  <p>
                    <strong className="text-teal font-semibold">Subject Area:</strong>{" "}
                    {kitab.subject || "General Ethics"}
                  </p>
                  <p>
                    <strong className="text-teal font-semibold">Time Period:</strong>{" "}
                    {kitab.period || "N/A"}
                  </p>
                  <p>
                    <strong className="text-teal font-semibold">Manuscript Location:</strong>{" "}
                    {kitab.manuscriptLocation}
                  </p>
                </div>
                {kitab.keywords && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {kitab.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="text-[10px] bg-slate-100 border border-slate-200 text-slate-500 px-2 py-0.5 rounded"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-xs text-slate-700 mt-4 leading-relaxed font-light bg-white/60 p-3 rounded-lg border border-slate-200/40 font-sans">
                  {kitab.shortIntro}
                </p>
              </div>

              {/* Dual Columns: Left = Translation Tabs, Right = Decolonial Annotations */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Left Column: Translation Layers */}
                <div className="bg-[#FDFBF7] rounded-2xl p-6 border border-[#E3D1BA]/60 flex flex-col gap-4 shadow-xs">
                  <div className="flex border-b border-slate-100 pb-2 justify-between items-center">
                    <span className="text-xs font-bold text-teal uppercase font-sans">
                      Text Translation Layers
                    </span>
                    <div className="flex bg-slate-100 rounded-full p-0.5 border border-slate-200">
                      {[
                        { id: "english", label: "English" },
                        { id: "malayalam", label: "മലയാളം" },
                        { id: "arabic", label: "العربية" },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setKitabTranslationTab(tab.id as any)}
                          className={`px-3 py-1 rounded-full text-[10px] font-semibold border-0 cursor-pointer ${
                            kitabTranslationTab === tab.id
                              ? "bg-teal text-white"
                              : "bg-transparent text-slate-400 hover:text-teal"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="min-h-55 bg-white/70 p-4 rounded-xl text-slate-800 text-sm leading-relaxed border border-slate-100 font-sans">
                    {kitabTranslationTab === "english" && (
                      <p className="italic text-slate-700">"{kitab.textSnippetEnglish}"</p>
                    )}
                    {kitabTranslationTab === "malayalam" && (
                      <p className="leading-loose text-slate-800">
                        "{kitab.textSnippetMalayalam}"
                      </p>
                    )}
                    {kitabTranslationTab === "arabic" && (
                      <div className="text-right" style={{ direction: "rtl" }}>
                        <p className="font-serif text-teal text-lg leading-loose tracking-wide">
                          {kitab.textSnippetArabic}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Download & Copyright options */}
                  <div className="border-t border-slate-200/50 pt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 font-sans mt-2">
                    <span className="text-[10px] text-slate-400">
                      {kitab.downloadAllowed
                        ? "✔ Download permissions verified by archive curators."
                        : "✕ PDF download restricted under custom preservation terms."}
                    </span>
                    {kitab.downloadAllowed ? (
                      <a
                        href="#download"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Downloading ${kitab.title} manuscript PDF...`);
                        }}
                        className="inline-flex items-center justify-center gap-1.5 py-1.5 px-4 bg-teal hover:bg-teal-dark text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors no-underline border-0"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                        </svg>
                        Download PDF
                      </a>
                    ) : (
                      <button
                        disabled
                        className="py-1.5 px-4 bg-slate-100 border border-slate-200 text-slate-400 text-xs font-semibold rounded-lg cursor-not-allowed"
                      >
                        Download Restricted
                      </button>
                    )}
                  </div>
                </div>

                {/* Right Column: Layered Decolonial Annotations */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-xs flex flex-col gap-4">
                  <div className="flex border-b border-slate-100 pb-2 justify-between items-center">
                    <span className="text-xs font-bold text-gold uppercase font-sans">
                      Scholarly Commentary Layers
                    </span>
                  </div>

                  {/* Annotation Toggles */}
                  <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200/60 font-sans">
                    {[
                      { id: "historical", label: "Historical Context" },
                      { id: "jurisprudential", label: "Jurisprudence (Fiqh)" },
                      { id: "decolonial", label: "Decolonial Theory" },
                      { id: "indianOcean", label: "Ocean Network" },
                      { id: "comparativeTheory", label: "VS. Western Theorists" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setKitabAnnotationTab(tab.id as any)}
                        className={`px-3 py-1.5 rounded text-[10px] font-semibold border-0 cursor-pointer grow ${
                          kitabAnnotationTab === tab.id
                            ? "bg-gold text-white font-bold"
                            : "bg-transparent text-slate-500 hover:text-teal"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Annotation Content */}
                  <div className="bg-gold/5 border border-gold/20 p-4 rounded-xl min-h-40 text-xs leading-relaxed font-light text-slate-800 font-sans">
                    {kitabAnnotationTab === "historical" && (
                      <div>
                        <h4 className="font-bold text-gold uppercase mb-1">Historical Context:</h4>
                        <p>{kitab.annotations.historical}</p>
                      </div>
                    )}
                    {kitabAnnotationTab === "jurisprudential" && (
                      <div>
                        <h4 className="font-bold text-gold uppercase mb-1">Jurisprudential Reading:</h4>
                        <p>{kitab.annotations.jurisprudential}</p>
                      </div>
                    )}
                    {kitabAnnotationTab === "decolonial" && (
                      <div>
                        <h4 className="font-bold text-gold uppercase mb-1">Decolonial Reading:</h4>
                        <p>{kitab.annotations.decolonial}</p>
                      </div>
                    )}
                    {kitabAnnotationTab === "indianOcean" && (
                      <div>
                        <h4 className="font-bold text-gold uppercase mb-1">
                          Indian Ocean Trade Relevance:
                        </h4>
                        <p>{kitab.annotations.indianOcean}</p>
                      </div>
                    )}
                    {kitabAnnotationTab === "comparativeTheory" && (
                      <div>
                        <h4 className="font-bold text-gold uppercase mb-2">Decolonial Synthesis:</h4>
                        <p>{kitab.annotations.comparativeTheory}</p>
                      </div>
                    )}
                  </div>

                  {/* Related Essays */}
                  {kitab.relatedEssays && kitab.relatedEssays.length > 0 && (
                    <div className="border-t border-slate-100 pt-3 mt-2 font-sans">
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Related Scholarly Essays
                      </h5>
                      <div className="flex flex-col gap-1.5">
                        {kitab.relatedEssays.map((essay) => (
                          <button
                            key={essay.title}
                            onClick={() => {
                              handleNavigation("research");
                            }}
                            className="text-left bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded px-2.5 py-1.5 text-[10px] text-teal font-medium flex items-center justify-between cursor-pointer"
                          >
                            <span>{essay.title}</span>
                            <span>&rarr;</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })()
      ) : (
        <div className="flex flex-col gap-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Search & Left catalog panel (Grid 2 cols) */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Search controls */}
              <div className="bg-white p-4 rounded-xl border border-slate-200/60 flex flex-col sm:flex-row gap-3 shadow-xs">
                <input
                  type="text"
                  placeholder="Search by Title, Author, Language, Subject, Period, Location, or Keywords..."
                  value={kitabSearchQuery}
                  onChange={(e) => setKitabSearchQuery(e.target.value)}
                  className="bg-slate-50 border border-slate-200 px-4 py-2.5 text-xs rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal grow font-sans"
                />
                <select
                  value={kitabGenreFilter}
                  onChange={(e) => setKitabGenreFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 px-3 py-2 text-xs rounded-lg text-slate-800 focus:outline-none font-sans cursor-pointer"
                >
                  <option value="all">All Genres</option>
                  <option value="fiqh">Jurisprudence (Fiqh)</option>
                  <option value="kalam">Creed/Theology (Kalam)</option>
                  <option value="tasawwuf">Sufism (Tasawwuf)</option>
                  <option value="mawlid">Devotional / Poetry (Mawlid)</option>
                  <option value="history">History</option>
                  <option value="ethics">Ethics</option>
                  <option value="anti-colonial">Anti-Colonial Writing</option>
                </select>
              </div>

              {/* List of Kitabs */}
              <div className="flex flex-col gap-4">
                {KITAB_REPOSITORY.filter((k) => {
                  if (kitabGenreFilter !== "all" && k.genre !== kitabGenreFilter) return false;
                  if (kitabSearchQuery) {
                    const q = kitabSearchQuery.toLowerCase();
                    return (
                      k.title.toLowerCase().includes(q) ||
                      k.author.toLowerCase().includes(q) ||
                      k.shortIntro.toLowerCase().includes(q) ||
                      (k.language && k.language.toLowerCase().includes(q)) ||
                      (k.languageScript && k.languageScript.toLowerCase().includes(q)) ||
                      (k.subject && k.subject.toLowerCase().includes(q)) ||
                      (k.period && k.period.toLowerCase().includes(q)) ||
                      (k.manuscriptLocation && k.manuscriptLocation.toLowerCase().includes(q)) ||
                      (k.keywords && k.keywords.some((kw) => kw.toLowerCase().includes(q)))
                    );
                  }
                  return true;
                }).map((kitab) => (
                  <div
                    key={kitab.id}
                    className="bg-white hover:bg-slate-50 border border-slate-200/60 hover:border-gold/30 p-5 rounded-2xl transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2 font-sans">
                        <span className="text-[9px] uppercase font-bold text-gold tracking-wide bg-gold/10 px-2 py-0.5 rounded border border-gold/20 inline-block">
                          {kitab.genre}
                        </span>
                        {kitab.subject && (
                          <span className="text-[9px] text-slate-400 font-light">
                            • {kitab.subject}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-teal font-serif">{kitab.title}</h3>
                      <p className="text-xs text-slate-450 mt-1 font-sans">
                        Author: {kitab.author} | Period: {kitab.period || kitab.date}
                      </p>
                      <p className="text-xs text-slate-600 mt-2 font-light leading-relaxed font-sans line-clamp-2">
                        {kitab.shortIntro}
                      </p>
                      {kitab.keywords && (
                        <div className="flex flex-wrap gap-1 mt-2.5">
                          {kitab.keywords.map((kw) => (
                            <span
                              key={kw}
                              className="text-[9px] bg-slate-100 text-slate-450 border border-slate-200/60 px-1.5 py-0.5 rounded"
                            >
                              #{kw}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setSelectedKitabId(kitab.id);
                        setKitabTranslationTab("english");
                        setKitabAnnotationTab("historical");
                      }}
                      className="shrink-0 text-center py-2 px-4 bg-teal hover:bg-teal-dark text-white text-xs font-semibold rounded-lg cursor-pointer border-0 transition-all shadow-xs"
                    >
                      View Annotations
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right panel: Community Submission form */}
            <div className="lg:col-span-1 bg-white border border-slate-200/60 p-6 rounded-2xl shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gold border-b border-slate-100 pb-2 mb-4 font-sans">
                Submit Manuscript Details
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-light mb-6 font-sans">
                Do you hold an old Kitab manuscript, photographic plates, or family logs connected to
                the Indian Ocean networks and Malabari scholarship? Submit the details below to
                contribute to our archive.
              </p>

              {submitSuccess ? (
                <div className="bg-emerald-50 border border-emerald-250 text-emerald-850 p-5 rounded-2xl text-xs font-semibold flex flex-col items-center text-center gap-2.5 font-sans">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-emerald-600 bg-emerald-100 p-1 rounded-full"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <h4 className="font-bold text-sm">Submission Received!</h4>
                  <p className="text-[10px] text-slate-505 font-sans leading-relaxed">
                    Your manuscript metadata has been sent to the review queue. Submissions undergo
                    rigorous scholarly verification before publication.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-2 text-xs text-gold font-bold underline bg-transparent border-0 cursor-pointer font-sans"
                  >
                    Submit another manuscript
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const newSub = {
                      id: "sub-" + Date.now(),
                      title: formData.get("manuscriptTitle"),
                      author: formData.get("manuscriptAuthor"),
                      language: formData.get("manuscriptLanguage"),
                      century: formData.get("manuscriptCentury"),
                      oralHistory: formData.get("manuscriptOralHistory"),
                      location: formData.get("manuscriptLocation"),
                      ownership: formData.get("manuscriptOwnership"),
                      permissions: formData.get("manuscriptPermissions"),
                      status: "Awaiting Verification",
                      submittedAt: new Date().toISOString(),
                    };
                    setReviewQueue([newSub, ...reviewQueue]);
                    setSubmitSuccess(true);
                  }}
                  className="flex flex-col gap-4 text-xs font-sans"
                >
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-500 uppercase text-[9px] tracking-wide font-bold font-sans">
                      Manuscript Title
                    </label>
                    <input
                      required
                      name="manuscriptTitle"
                      type="text"
                      placeholder="e.g. Fathul Mueen Copy of Ponnani"
                      className="bg-slate-50 border border-slate-200 px-3 py-2 text-xs rounded text-slate-850 focus:outline-none focus:border-teal font-sans"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-500 uppercase text-[9px] tracking-wide font-bold font-sans">
                      Author / Scribe
                    </label>
                    <input
                      required
                      name="manuscriptAuthor"
                      type="text"
                      placeholder="e.g. Zain al-Din Makhdum II"
                      className="bg-slate-50 border border-slate-200 px-3 py-2 text-xs rounded text-slate-850 focus:outline-none focus:border-teal font-sans"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-500 uppercase text-[9px] tracking-wide font-bold font-sans">
                      Language / Script
                    </label>
                    <input
                      required
                      name="manuscriptLanguage"
                      type="text"
                      placeholder="e.g. Arabic-Malayalam"
                      className="bg-slate-50 border border-slate-200 px-3 py-2 text-xs rounded text-slate-850 focus:outline-none focus:border-teal font-sans"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-500 uppercase text-[9px] tracking-wide font-bold font-sans">
                      Approximate Century
                    </label>
                    <input
                      name="manuscriptCentury"
                      type="text"
                      placeholder="e.g. 16th Century"
                      className="bg-slate-50 border border-slate-200 px-3 py-2 text-xs rounded text-slate-850 focus:outline-none focus:border-teal font-sans"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-500 uppercase text-[9px] tracking-wide font-bold font-sans">
                      Geographical Location Data
                    </label>
                    <input
                      required
                      name="manuscriptLocation"
                      type="text"
                      placeholder="e.g. Tirurangadi old mosque, Malabar"
                      className="bg-slate-50 border border-slate-200 px-3 py-2 text-xs rounded text-slate-850 focus:outline-none focus:border-teal font-sans"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-500 uppercase text-[9px] tracking-wide font-bold font-sans">
                      Ownership & Custody Type
                    </label>
                    <select
                      name="manuscriptOwnership"
                      className="bg-slate-50 border border-slate-200 px-3 py-2 text-xs rounded text-slate-850 focus:outline-none focus:border-teal font-sans cursor-pointer"
                    >
                      <option value="Private Family Archive">Private Family Archive</option>
                      <option value="Mosque/Waqf Custody">Mosque / Waqf Custody</option>
                      <option value="Public Institution / Museum">Public Institution / Museum</option>
                      <option value="Private Collector">Private Collector</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-500 uppercase text-[9px] tracking-wide font-bold font-sans">
                      Access & Permission Status
                    </label>
                    <select
                      name="manuscriptPermissions"
                      className="bg-slate-50 border border-slate-200 px-3 py-2 text-xs rounded text-slate-850 focus:outline-none focus:border-teal font-sans cursor-pointer"
                    >
                      <option value="Fully Open Access (Publish Digital Scan)">
                        Fully Open Access (Publish Scan)
                      </option>
                      <option value="Academic/Research Access Only">Academic / Research Access Only</option>
                      <option value="Display Metadata/Description Only">
                        Display Metadata / Description Only
                      </option>
                      <option value="Awaiting Archival Negotiation">Awaiting Archival Negotiation</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-500 uppercase text-[9px] tracking-wide font-bold font-sans">
                      Oral History Narrative / Context
                    </label>
                    <textarea
                      required
                      name="manuscriptOralHistory"
                      rows={3}
                      placeholder="Describe any oral histories, transmission stories, or custom practices associated with this manuscript..."
                      className="bg-slate-50 border border-slate-200 px-3 py-2 text-xs rounded text-slate-850 focus:outline-none focus:border-teal font-sans resize-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-500 uppercase text-[9px] tracking-wide font-bold font-sans">
                      Manuscript Photos
                    </label>
                    <div className="border border-dashed border-slate-350 rounded bg-slate-50 p-4 text-center text-slate-400 cursor-pointer hover:border-teal transition-colors">
                      <svg
                        className="mx-auto h-6 w-6 text-slate-355 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                      >
                        <path d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a2.25 2.25 0 01-2.25-2.25V6.75a2.25 2.25 0 012.25-2.25h10.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25H6.75z" />
                      </svg>
                      <span>Click to upload image files (Max 5MB)</span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-center py-2.5 bg-gold hover:bg-gold-light text-white font-bold uppercase rounded cursor-pointer transition-colors border-0 shadow-xs"
                  >
                    Submit to Review Queue
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Scholarly Review Queue */}
          <div className="bg-white border border-slate-200/70 p-6 sm:p-8 rounded-3xl shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4 mb-4 gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold bg-gold/10 px-2.5 py-0.5 rounded border border-gold/20 font-sans inline-block mb-1">
                  Archival Preservation Governance
                </span>
                <h3 className="text-lg font-bold text-teal font-sans">Scholarly Review Queue</h3>
                <p className="text-xs text-slate-505 font-light font-sans mt-0.5">
                  Manuscripts submitted by scholars, mosque committees, and families awaiting forensic
                  text and legal review.
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-1.5 text-xs text-slate-505 font-medium font-sans bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
                <span>Review Panel Online</span>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs leading-relaxed text-amber-800 font-sans mb-6">
              <strong className="font-semibold">⚠️ Digital Preservation Notice:</strong> Letting the
              public edit heritage archives directly can corrupt historical accuracy. To prevent
              digital termites, all submissions undergo a multi-layered review process including
              manuscript origin validation, physical scan verification, and permission confirmation by
              our Scholarly Taskforce.
            </div>

            {/* Preservation Filters row */}
            <div className="flex flex-wrap gap-4 items-center bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6 text-xs font-sans">
              <div className="flex flex-col gap-1.5 min-w-36">
                <label className="text-[9px] uppercase font-bold text-slate-450">Century</label>
                <select
                  value={archiveCenturyFilter}
                  onChange={(e) => setArchiveCenturyFilter(e.target.value)}
                  className="bg-white border border-slate-200 rounded px-2.5 py-1.5 text-slate-800 font-semibold cursor-pointer outline-none"
                >
                  <option value="all">All Centuries</option>
                  <option value="17th Century">17th Century</option>
                  <option value="18th Century">18th Century</option>
                  <option value="16th Century">16th Century</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5 min-w-36">
                <label className="text-[9px] uppercase font-bold text-slate-450">
                  Ownership Custody
                </label>
                <select
                  value={archiveOwnershipFilter}
                  onChange={(e) => setArchiveOwnershipFilter(e.target.value)}
                  className="bg-white border border-slate-200 rounded px-2.5 py-1.5 text-slate-800 font-semibold cursor-pointer outline-none"
                >
                  <option value="all">All Ownership Types</option>
                  <option value="Mosque/Waqf Custody">Mosque / Waqf Custody</option>
                  <option value="Private Archive">Private Archive</option>
                  <option value="Private Family Archive">Private Family Archive</option>
                  <option value="Public Institution / Museum">Public Institution</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5 min-w-36">
                <label className="text-[9px] uppercase font-bold text-slate-450">
                  Verification Status
                </label>
                <select
                  value={archiveStatusFilter}
                  onChange={(e) => setArchiveStatusFilter(e.target.value)}
                  className="bg-white border border-slate-200 rounded px-2.5 py-1.5 text-slate-800 font-semibold cursor-pointer outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="Awaiting Verification">Awaiting Verification</option>
                  <option value="Under Scholarly Review">Under Scholarly Review</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setArchiveCenturyFilter("all");
                  setArchiveOwnershipFilter("all");
                  setArchiveStatusFilter("all");
                }}
                className="mt-4 px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded cursor-pointer border-0 transition-colors font-bold"
              >
                Clear Filters
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviewQueue
                .filter((item) => {
                  if (archiveCenturyFilter !== "all" && item.century !== archiveCenturyFilter)
                    return false;
                  if (
                    archiveOwnershipFilter !== "all" &&
                    item.ownership !== archiveOwnershipFilter
                  )
                    return false;
                  if (archiveStatusFilter !== "all" && item.status !== archiveStatusFilter)
                    return false;
                  return true;
                })
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-gold/30 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3 mb-2 font-sans">
                      <span className="text-[9px] uppercase font-bold text-amber-800 bg-amber-105 border border-amber-200 px-2.5 py-0.5 rounded-md">
                        {item.status}
                      </span>
                      <span className="text-[10px] text-slate-450 font-light">
                        Submitted: {new Date(item.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-teal font-sans">{item.title}</h4>
                    <p className="text-xs text-slate-550 mt-1 font-sans">
                      Scribe/Author:{" "}
                      <strong className="font-medium text-slate-800">{item.author}</strong> |
                      Century: <strong className="font-medium text-slate-800">{item.century}</strong>
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-3 text-[10px] text-slate-500 border-t border-slate-200/50 pt-2 font-sans">
                      <p>
                        <strong>Script:</strong> {item.language}
                      </p>
                      <p>
                        <strong>Location:</strong> {item.location}
                      </p>
                      <p>
                        <strong>Access Model:</strong> {item.ownership}
                      </p>
                      <p>
                        <strong>Permissions:</strong> {item.permissions}
                      </p>
                    </div>
                    <div className="mt-3 bg-white border border-slate-200/50 p-2.5 rounded-lg text-[11px] leading-relaxed text-slate-655 font-sans font-light">
                      <strong className="text-teal font-medium block mb-1 uppercase text-[9px] tracking-wide">
                        Oral History Context:
                      </strong>
                      "{item.oralHistory}"
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Interactive Transcription Playground */}
          <div className="bg-white border border-slate-200/70 p-6 sm:p-8 rounded-3xl shadow-xs mt-8 font-sans">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gold bg-gold/10 px-2.5 py-0.5 rounded border border-gold/20 font-sans inline-block mb-1">
                Scholastic Challenge Wing
              </span>
              <h3 className="text-lg font-bold text-teal font-sans">
                Interactive Transcription Playground
              </h3>
              <p className="text-xs text-slate-500 font-light font-sans mt-0.5">
                Practice transcribing and translating pre-colonial legal codes and ledger entries.
                Your entries are scanned against verified keywords.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: Text Sample */}
              <div className="lg:col-span-6 flex flex-col gap-4">
                <label className="text-slate-500 uppercase text-[9px] tracking-wide font-bold font-sans">
                  Select Manuscript Target
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedTranscriptionId("sub-1");
                      setTranscriptionInput("");
                      setTranscriptionScore(null);
                    }}
                    className={`px-4 py-2 text-xs font-bold rounded-lg border cursor-pointer transition-all ${
                      selectedTranscriptionId === "sub-1"
                        ? "bg-teal text-white border-teal shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-650"
                    }`}
                  >
                    Muzhir al-Haqq Legal Snippet
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTranscriptionId("sub-2");
                      setTranscriptionInput("");
                      setTranscriptionScore(null);
                    }}
                    className={`px-4 py-2 text-xs font-bold rounded-lg border cursor-pointer transition-all ${
                      selectedTranscriptionId === "sub-2"
                        ? "bg-teal text-white border-teal shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-650"
                    }`}
                  >
                    Hadrami Ledger Entry
                  </button>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4">
                  <span className="text-[9px] uppercase font-bold text-gold bg-gold/10 px-2 py-0.5 rounded border border-gold/25">
                    Manuscript Scribing
                  </span>
                  {selectedTranscriptionId === "sub-1" ? (
                    <>
                      <p
                        className="font-serif text-teal text-2xl tracking-wide leading-loose"
                        style={{ direction: "rtl" }}
                      >
                        كِتَابُ الشُّفْعَةِ هُوَ اسْتِحْقَاقُ الشَّرِيكِ انْتِزَاعَ حِصَّةِ شَرِيكِهِ
                      </p>
                      <span className="text-[10px] text-slate-450 font-light italic">
                        Help/Pronunciation: Kitabu-Shuf'ati huwa istihqaqu-Shariki intiza'a hissati
                        sharikihi...
                      </span>
                    </>
                  ) : (
                    <>
                      <p
                        className="font-serif text-teal text-2xl tracking-wide leading-loose"
                        style={{ direction: "rtl" }}
                      >
                        حِسَابُ التَّوَابِلِ وَالْقِرْفَةِ فِي مِينَاءِ كَنُّور سَنَةَ ١٧٨٠
                      </p>
                      <span className="text-[10px] text-slate-450 font-light italic">
                        Help/Pronunciation: Hisabu-Tawabili wal-Qirfati fi mina'i Kannur sanata
                        1780...
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Right: Input & Validation */}
              <div className="lg:col-span-6 flex flex-col gap-4 text-xs">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-500 uppercase text-[9px] tracking-wide font-bold font-sans">
                    Your English Transcription / Translation
                  </label>
                  <textarea
                    rows={4}
                    value={transcriptionInput}
                    onChange={(e) => setTranscriptionInput(e.target.value)}
                    placeholder={
                      selectedTranscriptionId === "sub-1"
                        ? "e.g., The Book of Pre-emption: It is the right of a partner to force the sale of a partner's share..."
                        : "e.g., Spice and cinnamon ledger in the port of Kannur in the year 1780..."
                    }
                    className="bg-slate-50 border border-slate-200 px-3 py-2 text-xs rounded-xl text-slate-800 focus:outline-none focus:border-teal font-sans resize-none leading-relaxed"
                  />
                </div>

                <button
                  onClick={() => {
                    const val = transcriptionInput.toLowerCase();
                    if (selectedTranscriptionId === "sub-1") {
                      if (
                        val.includes("preemption") ||
                        val.includes("pre-emption") ||
                        val.includes("partner") ||
                        val.includes("share") ||
                        val.includes("right")
                      ) {
                        setTranscriptionScore(95);
                      } else {
                        setTranscriptionScore(35);
                      }
                    } else {
                      if (
                        val.includes("spice") ||
                        val.includes("cinnamon") ||
                        val.includes("kannur") ||
                        val.includes("ledger") ||
                        val.includes("port")
                      ) {
                        setTranscriptionScore(90);
                      } else {
                        setTranscriptionScore(30);
                      }
                    }
                  }}
                  className="py-2.5 bg-gold hover:bg-gold-light text-white font-bold uppercase rounded-xl cursor-pointer transition-colors border-0 shadow-xs text-xs"
                >
                  Validate Scribing
                </button>

                {transcriptionScore !== null && (
                  <div
                    className={`p-4 rounded-xl border animate-fade-in ${
                      transcriptionScore >= 90
                        ? "bg-emerald-50 border-emerald-250 text-emerald-850"
                        : "bg-amber-50 border-amber-250 text-amber-850"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-sm font-bold font-mono">Score: {transcriptionScore}%</span>
                      <span className="text-[10px] uppercase font-bold tracking-wide">
                        {transcriptionScore >= 90 ? "✔ Match Found" : "⚠ Under Review"}
                      </span>
                    </div>
                    <p className="text-[11px] font-sans leading-relaxed">
                      {transcriptionScore >= 90
                        ? "Scholarly verification: Excellent! Your transcription matches our historical legal records and lexicon indices."
                        : "Scholarly notice: Your scribed translation is submitted to our curators. Review parameters check text alignment."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
