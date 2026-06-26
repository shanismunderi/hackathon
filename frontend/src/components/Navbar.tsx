import React, { useState, useRef, useEffect } from "react";
import logoUrl from "../assets/logo.png";

interface NavbarProps {
  currentView: string;
  handleNavigation: (view: any) => void;
  t: any;
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  setActiveResearchTab: (tab: "papers" | "briefs" | "projects") => void;
  language: "en" | "ml" | "ar";
  setLanguage: (lang: "en" | "ml" | "ar") => void;
}

export default function Navbar({
  currentView,
  handleNavigation,
  t,
  theme,
  setTheme,
  setActiveResearchTab,
  language,
  setLanguage,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [researchOpen, setResearchOpen] = useState(false);

  const researchRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (researchRef.current && !researchRef.current.contains(e.target as Node)) {
        setResearchOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navLinks = [
    { key: "about", label: t.about },
    { key: "atlas", label: t.atlas },
    { key: "archive", label: t.archive },
    { key: "finance", label: t.finance },
    { key: "events", label: t.events },
    { key: "contribute", label: t.portal },
  ];

  const handleLinkClick = (key: string) => {
    handleNavigation(key);
    setMobileMenuOpen(false);
    setResearchOpen(false);
  };

  const getLanguageLabel = (code: string) => {
    switch (code) {
      case "ml": return "മല";
      case "ar": return "عرب";
      default:   return "EN";
    }
  };

  const navBtnBase =
    "mobbin-nav-link text-xs px-4 py-2 rounded-full font-medium transition-all duration-200 cursor-pointer";
  const navBtnActive =
    "bg-slate-100 dark:bg-slate-800 text-teal dark:text-white font-semibold";
  const navBtnInactive =
    "text-slate-600 dark:text-slate-400 hover:text-teal dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-850";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-9000 flex justify-center px-6 py-4 transition-all duration-300">
        <div
          className="mobbin-nav w-full max-w-300 grid grid-cols-[1fr_auto_1fr] items-center px-6 py-3.5 rounded-full border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/75 backdrop-blur-md shadow-sm"
          style={{ direction: "ltr" }}
        >
          {/* Logo */}
          <div className="flex items-center justify-self-start">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); handleLinkClick("home"); }}
              className="flex items-center shrink-0 hover:opacity-85 transition-opacity"
            >
              <img src={logoUrl} alt="Malabar Decolonial Space" className="h-8 w-auto object-contain header-logo" />
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1.5 justify-self-center">
            {navLinks.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleLinkClick(key)}
                className={`${navBtnBase} ${currentView === key ? navBtnActive : navBtnInactive}`}
              >
                {label}
              </button>
            ))}

            {/* Research Hub Dropdown — click-toggle */}
            <div ref={researchRef} className="relative">
              <button
                onClick={() => setResearchOpen((o) => !o)}
                className={`${navBtnBase} flex items-center gap-1 ${
                  ["research", "magazine", "cocoon"].includes(currentView) ? navBtnActive : navBtnInactive
                }`}
              >
                <span>{t.research}</span>
                <svg
                  className="w-2.5 h-2.5 transition-transform duration-200"
                  style={{ transform: researchOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {researchOpen && (
                <div
                  className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-52 z-9100"
                  style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.14))" }}
                >
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-1.5 rounded-2xl flex flex-col gap-0.5">
                    {[
                      { label: "Working Papers",    tab: "papers"   as const },
                      { label: "Policy Briefs",     tab: "briefs"   as const },
                      { label: "Research Projects", tab: "projects" as const },
                    ].map(({ label, tab }) => (
                      <button
                        key={tab}
                        onClick={() => { handleLinkClick("research"); setActiveResearchTab(tab); }}
                        className="w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-teal dark:hover:text-white border-0 bg-transparent cursor-pointer transition-colors"
                      >
                        {label}
                      </button>
                    ))}

                    <div className="h-px bg-slate-200/70 dark:bg-slate-800/80 my-1" />

                    <button
                      onClick={() => handleLinkClick("magazine")}
                      className="w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-teal dark:hover:text-white border-0 bg-transparent cursor-pointer transition-colors"
                    >
                      Evident Magazine
                    </button>
                    <button
                      onClick={() => handleLinkClick("cocoon")}
                      className="w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-teal dark:hover:text-white border-0 bg-transparent cursor-pointer transition-colors"
                    >
                      Cocoon Library
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 justify-self-end">
            {/* Language Switcher */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangDropdownOpen((o) => !o)}
                className="w-9 h-9 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 hover:bg-slate-100 dark:hover:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300 cursor-pointer flex items-center justify-center transition-all duration-200"
              >
                {getLanguageLabel(language)}
              </button>

              {langDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xl p-1.5 flex flex-col gap-0.5 z-9200"
                  style={{ direction: language === "ar" ? "rtl" : "ltr" }}
                >
                  {(
                    [
                      { code: "en", label: "English" },
                      { code: "ml", label: "മലയാളം" },
                      { code: "ar", label: "العربية" },
                    ] as const
                  ).map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setLangDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium cursor-pointer border-0 bg-transparent transition-colors ${
                        language === lang.code
                          ? "bg-slate-100 dark:bg-slate-800 text-teal dark:text-white font-semibold"
                          : "text-slate-650 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-teal dark:hover:text-white"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle Theme"
              className="w-9 h-9 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 cursor-pointer flex items-center justify-center transition-all duration-200 shrink-0"
            >
              {theme === "dark" ? (
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z" />
                </svg>
              ) : (
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="w-9 h-9 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 cursor-pointer flex items-center justify-center transition-all duration-200 lg:hidden"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-24 select-none pointer-events-none" />

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-9999 bg-white dark:bg-slate-950 flex flex-col p-6 overflow-y-auto animate-fadeIn"
          style={{ direction: language === "ar" ? "rtl" : "ltr" }}
        >
          <div className="flex items-center justify-between pb-5 border-b border-slate-200 dark:border-slate-800">
            <img src={logoUrl} alt="Malabar Decolonial Space" className="h-7 w-auto object-contain header-logo" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-9 h-9 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-550/5 dark:bg-slate-900 text-slate-600 dark:text-slate-405 cursor-pointer flex items-center justify-center transition-all"
            >
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-1.5 mt-6">
            {navLinks.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleLinkClick(key)}
                className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-150 border-0 ${
                  currentView === key
                    ? "bg-slate-100 dark:bg-slate-900 text-teal dark:text-white"
                    : "bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50"
                }`}
              >
                {label}
              </button>
            ))}

            <div className="h-px bg-slate-150 dark:bg-slate-850 my-2.5" />
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-550 uppercase px-4 tracking-wider mb-1 block">
              {t.research}
            </span>

            {[
              { label: "— Working Papers",    tab: "papers"   as const, view: "research" },
              { label: "— Policy Briefs",     tab: "briefs"   as const, view: "research" },
              { label: "— Research Projects", tab: "projects" as const, view: "research" },
              { label: "— Evident Magazine",  tab: null,                view: "magazine"  },
              { label: "— Cocoon Library",    tab: null,                view: "cocoon"    },
            ].map(({ label, tab, view }) => (
              <button
                key={label}
                onClick={() => {
                  handleLinkClick(view);
                  if (tab) setActiveResearchTab(tab);
                }}
                className="w-full text-left px-4 py-3 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 border-0 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
