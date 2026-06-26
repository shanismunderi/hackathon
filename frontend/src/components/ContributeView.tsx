import { useState } from "react";

interface ContributeViewProps {
  t?: any;
}

type ContribType = "article" | "manuscript" | "translation" | "research" | "event";

const SUBMISSION_TYPES: { id: ContribType; icon: string; label: string; sublabel: string; color: string; border: string; bg: string }[] = [
  {
    id: "article",
    icon: "✍️",
    label: "Magazine Essay",
    sublabel: "Critique, theory, geopolitics",
    color: "text-teal",
    border: "border-teal/40",
    bg: "bg-teal/8",
  },
  {
    id: "manuscript",
    icon: "📜",
    label: "Kitab Manuscript",
    sublabel: "Classical text submission",
    color: "text-gold-dark",
    border: "border-gold/40",
    bg: "bg-gold/8",
  },
  {
    id: "translation",
    icon: "🌐",
    label: "Scholastic Translation",
    sublabel: "Arabic · Malayalam · English",
    color: "text-terracotta-dark",
    border: "border-terracotta/40",
    bg: "bg-terracotta/8",
  },
  {
    id: "research",
    icon: "🔬",
    label: "Research Paper",
    sublabel: "Working papers & policy briefs",
    color: "text-slate-700 dark:text-slate-200",
    border: "border-slate-300 dark:border-slate-600",
    bg: "bg-slate-100 dark:bg-slate-800",
  },
  {
    id: "event",
    icon: "📅",
    label: "Event Proposal",
    sublabel: "Lectures, circles & seminars",
    color: "text-teal",
    border: "border-teal/30",
    bg: "bg-teal/5",
  },
];

const GUIDELINES = [
  { icon: "📖", title: "Decolonial Framework", text: "All submissions must engage critically with colonial epistemologies and center Indian Ocean, Malabar, or South-South knowledge systems." },
  { icon: "🔍", title: "Peer Review Process", text: "Manuscripts and research papers undergo a two-stage scholarly review by our Hasanath Institute taskforce before publication." },
  { icon: "🌍", title: "Multilingual Welcome", text: "Submissions in Arabic, Malayalam, and English are all welcome. Translations should indicate source language and script." },
  { icon: "⚖️", title: "Open Access Commitment", text: "MABAR publishes all approved content under Creative Commons licenses to maximize community access." },
];

const STEPS = ["Type", "Details", "Content", "Review"];

export default function ContributeView({ t: _t }: ContributeViewProps) {
  const [step, setStep] = useState(0);
  const [contribType, setContribType] = useState<ContribType>("article");
  const [contribTitle, setContribTitle] = useState("");
  const [contribAuthor, setContribAuthor] = useState("");
  const [contribInstitution, setContribInstitution] = useState("");
  const [contribEmail, setContribEmail] = useState("");
  const [contribAbstract, setContribAbstract] = useState("");
  const [contribContent, setContribContent] = useState("");
  const [contribLanguage, setContribLanguage] = useState("English");
  const [contribKeywords, setContribKeywords] = useState("");
  const [contribAgreement, setContribAgreement] = useState(false);
  const [contribSuccess, setContribSuccess] = useState(false);

  const selectedType = SUBMISSION_TYPES.find(t => t.id === contribType)!;

  const handleReset = () => {
    setStep(0);
    setContribTitle("");
    setContribAuthor("");
    setContribInstitution("");
    setContribEmail("");
    setContribAbstract("");
    setContribContent("");
    setContribKeywords("");
    setContribAgreement(false);
    setContribSuccess(false);
  };

  const canProceed = () => {
    if (step === 0) return true;
    if (step === 1) return contribTitle.trim() !== "" && contribAuthor.trim() !== "" && contribEmail.trim() !== "";
    if (step === 2) return contribContent.trim().length > 50;
    if (step === 3) return contribAgreement;
    return false;
  };

  if (contribSuccess) {
    return (
      <section className="py-12 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 max-w-250 mx-auto w-full pt-10 sm:pt-15">
        <div className="flex flex-col items-center text-center py-16 gap-6">
          <div className="h-20 w-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border-4 border-emerald-200 dark:border-emerald-700 flex items-center justify-center shadow-lg">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-600">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Submission Received</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase mt-1">Contribution Submitted!</h2>
            <p className="text-sm text-slate-500 font-light mt-3 max-w-md leading-relaxed">
              Your <strong className="text-slate-700 dark:text-slate-300">{selectedType.label}</strong> has been submitted to the MABAR scholarly peer-review committee. You will receive a status update at <strong className="text-teal">{contribEmail}</strong> within <strong>14 working days</strong>.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-left w-full max-w-md space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Submission Summary</h4>
            {[
              { label: "Type", value: selectedType.label },
              { label: "Title", value: contribTitle },
              { label: "Author", value: contribAuthor },
              { label: "Language", value: contribLanguage },
            ].map(row => (
              <div key={row.label} className="flex items-start gap-3">
                <span className="text-[9px] uppercase font-bold text-slate-400 w-16 shrink-0 pt-0.5">{row.label}</span>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{row.value}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-teal hover:bg-teal-dark text-white text-xs font-bold uppercase rounded-full border-0 cursor-pointer transition-colors shadow-sm"
            >
              Submit Another
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase rounded-full cursor-pointer transition-colors hover:bg-slate-50"
            >
              Return Home
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 max-w-350 mx-auto w-full pt-10 sm:pt-15">
      {/* Header */}
      <div className="border-b border-teal/15 pb-10 mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-teal">
          Coordinated Scholarship
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold uppercase mt-1">
          Contributor Portal
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-light mt-2 leading-relaxed max-w-2xl">
          Join the Malabar Decolonial Space movement. Submit critique essays for Evident Magazine, classical manuscripts, working papers for Hasanath Institute, or translations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* LEFT: Form */}
        <div className="lg:col-span-2">
          {/* Step Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center gap-0">
              {STEPS.map((s, i) => (
                <div key={s} className="flex items-center flex-1 last:flex-none">
                  <div className={`flex items-center gap-2 shrink-0 ${i <= step ? "opacity-100" : "opacity-40"}`}>
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-black border-2 transition-all ${
                      i < step ? "bg-teal border-teal text-white" :
                      i === step ? "bg-white dark:bg-slate-900 border-teal text-teal shadow-sm" :
                      "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400"
                    }`}>
                      {i < step ? (
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      ) : i + 1}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider hidden sm:block ${i === step ? "text-teal" : "text-slate-400"}`}>
                      {s}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-2 rounded transition-all ${i < step ? "bg-teal" : "bg-slate-200 dark:bg-slate-700"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="glass-card border border-slate-200/80 dark:border-slate-800 shadow-sm rounded-2xl overflow-hidden">
            {/* Step 0: Choose Type */}
            {step === 0 && (
              <div className="p-6 sm:p-8">
                <h2 className="text-base font-bold uppercase tracking-wide mb-1">Select Submission Type</h2>
                <p className="text-xs text-slate-500 font-light mb-6">Choose the category that best matches your scholarly contribution.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SUBMISSION_TYPES.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setContribType(type.id)}
                      className={`flex items-start gap-4 p-4 rounded-xl border-2 text-left cursor-pointer transition-all ${
                        contribType === type.id
                          ? `${type.border} ${type.bg} shadow-sm`
                          : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-900"
                      }`}
                    >
                      <span className="text-2xl leading-none shrink-0">{type.icon}</span>
                      <div>
                        <span className={`text-xs font-bold block ${contribType === type.id ? type.color : "text-slate-700 dark:text-slate-200"}`}>
                          {type.label}
                        </span>
                        <span className="text-[10px] text-slate-400 font-light mt-0.5 block">{type.sublabel}</span>
                      </div>
                      {contribType === type.id && (
                        <div className={`ml-auto shrink-0 h-4 w-4 rounded-full ${type.bg} ${type.border} border flex items-center justify-center`}>
                          <svg className="h-2.5 w-2.5 text-teal" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Details */}
            {step === 1 && (
              <div className="p-6 sm:p-8 flex flex-col gap-5">
                <div>
                  <h2 className="text-base font-bold uppercase tracking-wide mb-1">Author Details</h2>
                  <p className="text-xs text-slate-500 font-light">Tell us about yourself and your submission.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-500 uppercase text-[10px] font-bold tracking-wide">Title / Heading <span className="text-terracotta">*</span></label>
                    <input
                      required type="text" value={contribTitle}
                      onChange={(e) => setContribTitle(e.target.value)}
                      placeholder="e.g. Makhdum II and Indian Ocean Jurisprudence"
                      className="modern-input text-xs"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-500 uppercase text-[10px] font-bold tracking-wide">Author / Scholar Name <span className="text-terracotta">*</span></label>
                    <input
                      required type="text" value={contribAuthor}
                      onChange={(e) => setContribAuthor(e.target.value)}
                      placeholder="e.g. Dr. Amina Ali"
                      className="modern-input text-xs"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-500 uppercase text-[10px] font-bold tracking-wide">Email Address <span className="text-terracotta">*</span></label>
                    <input
                      required type="email" value={contribEmail}
                      onChange={(e) => setContribEmail(e.target.value)}
                      placeholder="scholar@institution.org"
                      className="modern-input text-xs"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-500 uppercase text-[10px] font-bold tracking-wide">Institution / Affiliation</label>
                    <input
                      type="text" value={contribInstitution}
                      onChange={(e) => setContribInstitution(e.target.value)}
                      placeholder="e.g. Al-Azhar University"
                      className="modern-input text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-500 uppercase text-[10px] font-bold tracking-wide">Submission Language</label>
                    <select
                      value={contribLanguage}
                      onChange={(e) => setContribLanguage(e.target.value)}
                      className="modern-input text-xs cursor-pointer"
                    >
                      <option>English</option>
                      <option>Malayalam</option>
                      <option>Arabic</option>
                      <option>Arabic-Malayalam</option>
                      <option>Trilingual</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-slate-500 uppercase text-[10px] font-bold tracking-wide">Keywords (comma-separated)</label>
                    <input
                      type="text" value={contribKeywords}
                      onChange={(e) => setContribKeywords(e.target.value)}
                      placeholder="e.g. Indian Ocean, Waqf, Kitab"
                      className="modern-input text-xs"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-500 uppercase text-[10px] font-bold tracking-wide">Abstract / Short Summary</label>
                  <textarea
                    rows={3} value={contribAbstract}
                    onChange={(e) => setContribAbstract(e.target.value)}
                    placeholder="A brief 2–4 sentence summary of your submission's argument and contribution..."
                    className="modern-input resize-none font-sans font-light leading-relaxed text-xs"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Content */}
            {step === 2 && (
              <div className="p-6 sm:p-8 flex flex-col gap-5">
                <div>
                  <h2 className="text-base font-bold uppercase tracking-wide mb-1">Submission Content</h2>
                  <p className="text-xs text-slate-500 font-light">Paste your full text, manuscript excerpt, or translation below. Minimum 50 characters required.</p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-slate-500 uppercase text-[10px] font-bold tracking-wide">
                      Full Text / Manuscript / Translation <span className="text-terracotta">*</span>
                    </label>
                    <span className={`text-[10px] font-mono ${contribContent.length > 50 ? "text-emerald-600" : "text-slate-400"}`}>
                      {contribContent.length} chars
                    </span>
                  </div>
                  <textarea
                    required rows={14} value={contribContent}
                    onChange={(e) => setContribContent(e.target.value)}
                    placeholder={
                      contribType === "manuscript"
                        ? "Paste the Arabic text, Malayalam transliteration, and your annotations here. Include manuscript location, approximate date, and any known author details..."
                        : contribType === "translation"
                        ? "Include source text (language + script), your translated text, and any translator's notes or commentary on linguistic choices..."
                        : "Paste your article draft, working paper, or event proposal here. Include all sections with clear headings..."
                    }
                    className="modern-input resize-y font-sans font-light leading-relaxed text-xs"
                    style={{ minHeight: "280px" }}
                  />
                </div>

                {contribType === "manuscript" && (
                  <div className="bg-gold/5 border border-gold/20 rounded-xl p-4 flex gap-3">
                    <span className="text-lg shrink-0">📜</span>
                    <div>
                      <p className="text-[11px] font-semibold text-gold-dark">Manuscript Submission Note</p>
                      <p className="text-[10px] text-slate-600 font-light mt-1 leading-relaxed">
                        Please include: manuscript title, author (if known), approximate date, current location/library, physical condition, and whether a scan/photograph is available. Our archival team will follow up within 7 days.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Review & Submit */}
            {step === 3 && (
              <div className="p-6 sm:p-8 flex flex-col gap-6">
                <div>
                  <h2 className="text-base font-bold uppercase tracking-wide mb-1">Review & Submit</h2>
                  <p className="text-xs text-slate-500 font-light">Please verify your submission details before sending to the review committee.</p>
                </div>

                {/* Summary */}
                <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-3">
                  {[
                    { label: "Type", value: `${selectedType.icon} ${selectedType.label}` },
                    { label: "Title", value: contribTitle },
                    { label: "Author", value: contribAuthor },
                    { label: "Email", value: contribEmail },
                    { label: "Institution", value: contribInstitution || "—" },
                    { label: "Language", value: contribLanguage },
                    { label: "Keywords", value: contribKeywords || "—" },
                    { label: "Content", value: `${contribContent.length} characters` },
                  ].map(row => (
                    <div key={row.label} className="flex items-start gap-4">
                      <span className="text-[9px] uppercase font-bold text-slate-400 w-20 shrink-0 pt-0.5">{row.label}</span>
                      <span className="text-xs text-slate-700 dark:text-slate-300 font-medium wrap-break-word">{row.value}</span>
                    </div>
                  ))}
                </div>

                {/* Agreement */}
                <label className="flex gap-3 cursor-pointer group">
                  <div
                    onClick={() => setContribAgreement(!contribAgreement)}
                    className={`mt-0.5 h-4 w-4 rounded border-2 shrink-0 flex items-center justify-center transition-all cursor-pointer ${
                      contribAgreement ? "bg-teal border-teal" : "bg-white dark:bg-slate-900 border-slate-300 group-hover:border-teal"
                    }`}
                  >
                    {contribAgreement && (
                      <svg className="h-2.5 w-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                    I confirm this submission is original, properly attributed, and I consent to MABAR's editorial peer-review process. I understand the content may be published under a Creative Commons license.
                  </span>
                </label>

                <button
                  disabled={!contribAgreement}
                  onClick={() => setContribSuccess(true)}
                  className="w-full text-center py-3.5 bg-gold-dark hover:bg-gold disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold uppercase rounded-xl cursor-pointer border-0 transition-colors shadow-md"
                >
                  Submit for Peer-Review →
                </button>
              </div>
            )}

            {/* Navigation Buttons */}
            {step < 3 && (
              <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
                <button
                  onClick={() => setStep(s => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="px-5 py-2 text-xs font-bold uppercase text-slate-500 hover:text-slate-700 disabled:opacity-0 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer bg-white dark:bg-slate-900 transition-all"
                >
                  ← Back
                </button>
                <span className="text-[10px] text-slate-400 font-mono">Step {step + 1} of {STEPS.length}</span>
                <button
                  onClick={() => setStep(s => Math.min(3, s + 1))}
                  disabled={!canProceed()}
                  className="px-5 py-2 bg-teal hover:bg-teal-dark disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold uppercase rounded-lg cursor-pointer border-0 transition-all"
                >
                  Continue →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Submission Guidelines */}
          <div className="glass-card border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal border-b border-slate-100 dark:border-slate-800 pb-2 mb-5">
              Submission Guidelines
            </h3>
            <div className="flex flex-col gap-5">
              {GUIDELINES.map((g) => (
                <div key={g.title} className="flex gap-3">
                  <span className="text-lg shrink-0 leading-none">{g.icon}</span>
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-700 dark:text-slate-200">{g.title}</h4>
                    <p className="text-[10px] text-slate-500 font-light leading-relaxed mt-0.5">{g.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Review Timeline */}
          <div className="bg-teal/5 border border-teal/15 rounded-2xl p-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal mb-4">Review Timeline</h3>
            <div className="flex flex-col gap-3">
              {[
                { day: "Day 1", action: "Submission received & acknowledged" },
                { day: "Day 3–7", action: "Initial editorial screening" },
                { day: "Day 7–14", action: "Peer review by Hasanath scholars" },
                { day: "Day 14", action: "Decision communicated by email" },
              ].map((step) => (
                <div key={step.day} className="flex gap-3 items-start">
                  <span className="text-[9px] font-black text-teal bg-teal/10 border border-teal/20 px-2 py-0.5 rounded font-mono shrink-0 mt-0.5 whitespace-nowrap">{step.day}</span>
                  <span className="text-[11px] text-slate-600 dark:text-slate-400 font-light leading-relaxed">{step.action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact box */}
          <div className="border border-gold/20 rounded-2xl p-5 bg-gold/5">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-gold-dark mb-2">Questions?</h3>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 font-light leading-relaxed">
              Contact the editorial committee at{" "}
              <a href="mailto:contribute@mabar.in" className="text-teal font-semibold underline">contribute@mabar.in</a>
              {" "}for manuscript access queries or technical submission issues.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
