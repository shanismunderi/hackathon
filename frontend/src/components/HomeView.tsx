import { useState } from "react";
import earthBgUrl from "../assets/earth_hero_bg.png";
import { MABAR_SPEAKERS, MABAR_PARTNERS, HOME_FAQS } from "../mabarData";

interface HomeViewProps {
  t: any;
  language: "en" | "ml" | "ar";
  theme: "dark" | "light";
  handleNavigation: (view: any) => void;
}

export default function HomeView({ t, language, theme, handleNavigation }: HomeViewProps) {
  const [activePartnerName, setActivePartnerName] = useState<string | null>(null);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION WITH PHOTOGRAPHIC EARTH BACKGROUND */}
      <section
        className="relative max-w-7xl mx-auto w-full px-6 sm:px-12 py-24 sm:py-36 flex flex-col items-center justify-center text-center overflow-hidden min-h-[85svh]"
        style={{ backgroundColor: 'var(--mobbin-bg)' }}
      >
        {/* Cinematic Earth Backdrop */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          {/* Stars/space base background colors */}
          <div className="absolute inset-0 bg-linear-to-b from-dark-bg via-transparent to-dark-bg z-10" />

          {/* Large realistic Earth image scaling and zooming */}
          <div className="absolute inset-0 flex items-center justify-center scale-110 sm:scale-125 transform origin-center opacity-60 filter grayscale-25 contrast-105 brightness-[1.03]">
            <img
              src={earthBgUrl}
              alt="Realistic Curved Earth"
              className="w-full h-full object-cover object-center animate-earth-zoom"
            />
          </div>

          {/* Atmosphere & shadow gradient masks - Mobbin-style */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background: theme === "dark"
                ? 'radial-gradient(circle at center, rgba(20,20,20,0) 0%, rgba(20,20,20,0.85) 60%, #141414 100%)'
                : 'radial-gradient(circle at center, rgba(255,255,255,0) 0%, rgba(255,255,255,0.75) 60%, #ffffff 100%)'
            }}
          />
        </div>

        {/* Centered Hero Content overlaying the dark Earth section */}
        <div className="flex flex-col items-center justify-center text-center max-w-215 relative z-10 mx-auto px-4 mt-6">
          {/* Red metadata date & location tag */}
          <span className="text-[10px] sm:text-xs font-extrabold tracking-[0.25em] text-terracotta-dark uppercase mb-5 select-none drop-shadow-sm">
            {t.heroSubtitle}
          </span>

          {/* Big bold white title */}
          <h1 className="text-4xl sm:text-7xl font-black uppercase tracking-tight leading-[1.08] font-sans text-teal drop-shadow-sm">
            {t.siteName}
          </h1>

          {/* Lighter tagline text */}
          <p className="mt-6 text-base sm:text-xl text-slate-800 font-medium tracking-wide max-w-155 leading-relaxed font-sans">
            {t.tagline}
          </p>

          <p className="mt-4 text-xs sm:text-sm text-slate-500 max-w-150 leading-relaxed font-light font-sans hidden sm:block">
            An autonomous decolonial platform rooted in Malabar, the
            Indian Ocean, Kitab tradition, Islamic finance, and
            South-South knowledge networks. We trace scholarly mobility
            and trade pathways.
          </p>

          {/* Hero buttons — Mobbin style: solid dark + ghost outline */}
          <div className="mt-10 flex flex-wrap gap-3 items-center justify-center">
            <button
              onClick={() => handleNavigation("atlas")}
              className="mobbin-btn-primary flex items-center gap-2"
            >
              <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              <span>{t.exploreAtlas}</span>
            </button>
            <button
              onClick={() => handleNavigation("archive")}
              className="mobbin-btn-secondary flex items-center gap-2"
            >
              <span>{t.visitArchive}</span>
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </section>

      {/* HORIZONTAL STATS BAR CARD */}
      <section className="px-6 py-6 w-full max-w-7xl mx-auto relative z-20">
        <div
          className="rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row justify-between items-center gap-8 max-w-5xl mx-auto w-full"
          style={{ background: 'var(--mobbin-surface)', border: '1px solid var(--mobbin-border)' }}
        >
          {/* Stats with indicators and dividers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 w-full lg:w-auto grow">
            {/* Stat 1 */}
            <div className="flex items-start gap-3 group/stat transition-all duration-300 hover:-translate-y-px">
              <span className="h-2 w-2 rounded-full bg-teal mt-1.5 shrink-0"></span>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-1">
                  Total Manuscripts
                </span>
                <strong className="text-3xl sm:text-4xl font-extrabold text-teal tracking-tight font-sans transition-colors group-hover/stat:text-gold">
                  27k+
                </strong>
                <span className="text-[9px] text-slate-400 block mt-0.5 font-light">
                  Archived & cataloged
                </span>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-start gap-3 group/stat transition-all duration-300 hover:-translate-y-px">
              <span className="h-2 w-2 rounded-full bg-terracotta mt-1.5 shrink-0"></span>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-1">
                  Gulf Remittances
                </span>
                <strong className="text-3xl sm:text-4xl font-extrabold text-teal tracking-tight font-sans transition-colors group-hover/stat:text-terracotta">
                  $12B+
                </strong>
                <span className="text-[9px] text-slate-400 block mt-0.5 font-light">
                  Annual regional flow
                </span>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-start gap-3 group/stat transition-all duration-300 hover:-translate-y-px">
              <span className="h-2 w-2 rounded-full bg-gold mt-1.5 shrink-0"></span>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-1">
                  Scholar Catalog
                </span>
                <strong className="text-3xl sm:text-4xl font-extrabold text-teal tracking-tight font-sans transition-colors group-hover/stat:text-gold">
                  12k+
                </strong>
                <span className="text-[9px] text-slate-400 block mt-0.5 font-light">
                  Connected biographies
                </span>
              </div>
            </div>
          </div>

          {/* Avg rate and Stacked Avatars */}
          <div className="flex items-center justify-between lg:justify-end gap-6 w-full lg:w-auto shrink-0 bg-slate-100/60 px-6 py-4 rounded-3xl border border-slate-200/50 shadow-inner">
            <div className="text-left lg:text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Ecosystem Status
              </span>
              <span className="text-xs font-extrabold text-teal mt-1 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-teal"></span>
                5 Active Pillars
              </span>
            </div>
            <div className="flex -space-x-3 rtl:space-x-reverse">
              {["ZM", "AT", "KM", "AB"].map((init, i) => (
                <div
                  key={i}
                  className={`h-9 w-9 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:z-20 cursor-default ${
                    i === 0
                      ? "bg-teal"
                      : i === 1
                        ? "bg-gold"
                        : i === 2
                          ? "bg-terracotta"
                          : "bg-teal-light"
                  }`}
                  title={
                    i === 0
                      ? "Zain al-Din Makhdum"
                      : i === 1
                        ? "Alawi Thangal"
                        : i === 2
                          ? "Kunjali Marakkar"
                          : "Arakkal Beevi"
                  }
                >
                  {init}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOT TRENDING SECTION (Bento Grid) */}
      <section className="px-6 py-20 sm:py-32 max-w-7xl mx-auto w-full relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Cell 1: Ecosystem Info Intro (spans 2 cols on md) */}
          <div className="md:col-span-2 p-8 flex flex-col justify-between items-start relative" style={{ background: 'var(--mobbin-bg)' }}>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-teal bg-teal/10 px-3.5 py-1.5 rounded-full border border-teal/20 mb-6 inline-block">
                Active Ecosystem Feed
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-teal leading-tight uppercase font-sans">
                Hot Trending{" "}
                <span className="text-gradient-gold-teal block">
                  On This Week.
                </span>
              </h2>
              <p className="mt-4 text-xs sm:text-sm text-slate-650 font-light leading-relaxed max-w-105">
                Explore Zain al-Din Makhdum II's annotations in the Kitab
                repository or navigate through alternative cooperative
                pathways on the Finance Dashboard. Our network is
                constantly updated with new legal texts, research papers,
                and youth editions.
              </p>
            </div>
            <button
              onClick={() => handleNavigation("about")}
              className="mt-8 px-6 py-3 text-xs uppercase cursor-pointer flex items-center gap-2 group border border-slate-300 rounded-full hover:bg-slate-50 transition-all text-teal font-semibold bg-transparent"
            >
              <span>Learn More</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                &rarr;
              </span>
            </button>
          </div>

          {/* Cell 2: Evident Magazine (spans 2 cols on md) */}
          <div
            onClick={() => handleNavigation("magazine")}
            className="md:col-span-2 rounded-2xl p-8 flex flex-col sm:flex-row justify-between items-stretch gap-6 cursor-pointer group transition-all duration-200 relative overflow-hidden mobbin-card"
          >
            {/* Left content */}
            <div className="flex flex-col justify-between items-start flex-1 relative z-10">
              <span className="text-[9px] uppercase font-bold tracking-widest text-teal bg-teal/10 px-2.5 py-1 rounded-md border border-teal/20">
                Pillar 01
              </span>
              <div className="mt-6">
                <h3 className="text-xl font-extrabold text-teal leading-tight group-hover:text-gold transition-colors">
                  Evident Magazine
                </h3>
                <p className="text-[11px] text-slate-500 mt-1.5 uppercase font-light tracking-wider">
                  Decolonial critiques
                </p>
                <p className="text-xs text-slate-600 mt-3 font-light leading-relaxed max-w-55">
                  Scholarly essays analyzing maritime history, sovereign
                  pluralisms, and Southern theory.
                </p>
              </div>
            </div>

            {/* Right visual: Floating mini article preview */}
            <div className="w-full sm:w-37.5 shrink-0 bg-slate-50 rounded-xl border border-slate-200/50 p-4 flex flex-col justify-between shadow-xs relative z-10 self-center sm:self-auto group-hover:-translate-y-1 transition-transform duration-300">
              <span className="text-[8px] uppercase tracking-wider text-teal font-bold">
                Issue #14
              </span>
              <div className="h-0.5 bg-teal/20 w-1/2 my-2 rounded"></div>
              <p className="text-[9px] italic text-slate-800 font-serif leading-snug">
                "Rethinking Oceanic Boundaries Beyond Colonial
                Cartography..."
              </p>
              <div className="flex justify-end mt-4">
                <span className="text-[8px] font-bold text-teal/65 group-hover:text-gold transition-colors uppercase tracking-widest">
                  Read &rarr;
                </span>
              </div>
            </div>
          </div>

          {/* Cell 3: Hasanath Institute (spans 1 col on md) */}
          <div
            onClick={() => handleNavigation("research")}
            className="md:col-span-1 rounded-2xl p-6 flex flex-col justify-between min-h-65 cursor-pointer group transition-all duration-200 relative overflow-hidden mobbin-card"
          >
            {/* Top: Icon & Arrow */}
            <div className="flex justify-between items-start relative z-10">
              <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-200/60 shadow-xs text-teal">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="M12 6v6l4 2" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 text-teal">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>

            {/* Bottom: Text */}
            <div className="relative z-10 mt-8">
              <span className="text-[8px] uppercase tracking-wider font-bold text-teal block mb-2">
                Pillar 02
              </span>
              <h3 className="text-base font-extrabold text-teal leading-tight group-hover:text-gold transition-colors">
                Hasanath Institute
              </h3>
              <p className="text-[10px] text-slate-500 mt-1 uppercase font-light tracking-wider leading-none">
                Scholastic research
              </p>
              <p className="text-[11px] text-slate-600 mt-2.5 font-light leading-relaxed">
                Preserving pre-colonial archives and maritime history.
              </p>
            </div>
          </div>

          {/* Cell 4: Cocoon Library (spans 1 col on md) */}
          <div
            onClick={() => handleNavigation("cocoon")}
            className="md:col-span-1 rounded-2xl p-6 flex flex-col justify-between min-h-65 cursor-pointer group transition-all duration-200 relative overflow-hidden mobbin-card"
          >
            {/* Top: Icon & Arrow */}
            <div className="flex justify-between items-start relative z-10">
              <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-200/60 shadow-xs text-teal">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 text-teal">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>

            {/* Bottom: Text */}
            <div className="relative z-10 mt-8">
              <span className="text-[8px] uppercase tracking-wider font-bold text-teal block mb-2">
                Pillar 03
              </span>
              <h3 className="text-base font-extrabold text-teal leading-tight group-hover:text-gold transition-colors">
                Cocoon Library
              </h3>
              <p className="text-[10px] text-slate-500 mt-1 uppercase font-light tracking-wider leading-none">
                Illustrated youth books
              </p>
              <p className="text-[11px] text-slate-600 mt-2.5 font-light leading-relaxed">
                Ocean-centric storytelling and pre-colonial histories for kids.
              </p>
            </div>
          </div>

          {/* Cell 5: Finance Lab (spans 2 cols on md) */}
          <div
            onClick={() => handleNavigation("finance")}
            className="md:col-span-2 rounded-2xl p-8 flex flex-col sm:flex-row justify-between items-stretch gap-6 cursor-pointer group transition-all duration-200 relative overflow-hidden mobbin-card"
          >
            {/* Left content */}
            <div className="flex flex-col justify-between items-start flex-1 relative z-10">
              <span className="text-[9px] uppercase font-bold tracking-widest text-teal bg-teal/10 px-2.5 py-1 rounded-md border border-teal/20">
                Pillar 04
              </span>
              <div className="mt-6">
                <h3 className="text-xl font-extrabold text-teal leading-tight group-hover:text-gold transition-colors">
                  Finance Lab
                </h3>
                <p className="text-[11px] text-slate-500 mt-1.5 uppercase font-light tracking-wider">
                  Remittance economics
                </p>
                <p className="text-xs text-slate-600 mt-3 font-light leading-relaxed max-w-55">
                  Mapping regional Waqf endowments and interest-free
                  cooperative financial structures.
                </p>
              </div>
            </div>

            {/* Right visual: SVG Live chart preview */}
            <div className="w-full sm:w-40 shrink-0 bg-slate-50 rounded-xl border border-slate-200/60 p-5 flex flex-col justify-between shadow-xs relative z-10 self-center sm:self-auto group-hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-between items-start">
                <span className="text-[8px] uppercase tracking-wider text-terracotta font-black">
                  Waqf Assets
                </span>
                <span className="text-[9px] text-teal font-bold">
                  +$1.2B
                </span>
              </div>

              {/* SVG Line Graph */}
              <div className="my-3 w-full h-10 flex items-center justify-center">
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 100 40"
                >
                  <defs>
                    <linearGradient
                      id="chartGlow"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#0b1a30"
                        stopOpacity="0.4"
                      />
                      <stop
                        offset="100%"
                        stopColor="#0b1a30"
                        stopOpacity="0.0"
                      />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,35 Q15,25 30,30 T60,15 T100,5"
                    fill="none"
                    stroke="#0b1a30"
                    strokeWidth="2"
                    className="animate-pulse"
                  />
                  <path
                    d="M0,35 Q15,25 30,30 T60,15 T100,5 L100,40 L0,40 Z"
                    fill="url(#chartGlow)"
                  />
                  {/* Interactive pulsing point */}
                  <circle
                    cx="100"
                    cy="5"
                    r="3"
                    fill="#e28a3e"
                    className="animate-ping"
                  />
                  <circle cx="100" cy="5" r="2" fill="#e28a3e" />
                </svg>
              </div>

              <span className="text-[7.5px] text-slate-400 font-light block text-right">
                Realtime Ledger Feed
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* TOP LIST SCHOLAR SECTION */}
      <section className="px-6 py-16 sm:py-24 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-20">
        {/* Left Column: Heading */}
        <div className="lg:col-span-4 flex flex-col items-start justify-center">
          <span className="text-xs uppercase font-extrabold tracking-widest text-terracotta bg-terracotta/10 px-3.5 py-1 rounded-full border border-terracotta/20 mb-4">
            Scholastic Registry
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-teal leading-tight uppercase font-sans">
            Top List{" "}
            <span className="text-gradient-gold-teal block">
              Scholars.
            </span>
          </h2>
          <p className="mt-6 text-sm text-slate-650 font-light leading-relaxed max-w-[320px]">
            The intellectual networks of the Indian Ocean, preserving
            classical legal scholarship and anti-colonial heritage across
            maritime nodes.
          </p>
        </div>

        {/* Right Column: Scholar Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              name: "Zain al-Din Makhdum II",
              role: "Master Jurist & Historian",
              location: "Ponnani, Malabar",
              details:
                "Author of Tuhfat al-Mujahidin and Fathul Mueen, linking Ponnani to Mecca and Java.",
              quote:
                "We must write the history of the ocean, not just the history of the land.",
            },
            {
              name: "Sayyid Alawi Thangal",
              role: "Sufi & Agrarian Leader",
              location: "Mampuram, Malabar",
              details:
                "Led tenant mobilization and anti-colonial spiritual defense in the 18th century.",
              quote:
                "Spiritual defense is the foundation of agrarian freedom.",
            },
          ].map((sch, i) => (
            <div
              key={i}
              className="scholar-profile-card p-8 flex flex-col justify-between glass-card border glow-border-gold group"
            >
              {/* Header */}
              <div className="flex items-center gap-4 relative z-10">
                <div className="h-12 w-12 rounded-full bg-teal flex items-center justify-center text-xs font-bold text-white scholar-profile-avatar-border shadow-inner transition-transform group-hover:scale-105">
                  {sch.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-teal leading-none group-hover:text-gold transition-colors">
                    {sch.name}
                  </h4>
                  <span className="text-[10px] text-slate-500 mt-1.5 block uppercase font-bold tracking-widest">
                    {sch.role}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 mt-6 pt-4 border-t border-slate-100 grow">
                <p className="text-xs text-slate-650 leading-relaxed font-light">
                  {sch.details}
                </p>

                {/* Quote block on hover */}
                <blockquote className="font-serif italic text-gold/90 block mt-4 text-xs leading-normal border-l-2 border-gold/30 pl-3 transition-opacity duration-300 group-hover:border-gold">
                  "{sch.quote}"
                </blockquote>
              </div>

              {/* Footer */}
              <div className="relative z-10 border-t border-slate-100 pt-4 mt-6 flex justify-between items-center text-[10px]">
                <span className="text-slate-500 font-bold tracking-wide">
                  LOCATION: {sch.location.toUpperCase()}
                </span>
                <button
                  onClick={() => handleNavigation("atlas")}
                  className="text-gold group-hover:text-gold-light hover:underline bg-transparent border-0 cursor-pointer font-bold uppercase tracking-widest text-[9px] flex items-center gap-1.5 transition-colors"
                >
                  <span>Map Node</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SPEAKERS SECTION */}
      <section className="px-6 py-20 sm:py-32 max-w-7xl mx-auto w-full relative z-20">
        <div className="mb-12 text-center max-w-300 mx-auto w-full">
          <span className="text-xs uppercase font-extrabold tracking-widest text-teal bg-teal/10 px-4 py-1.5 rounded-full border border-teal/20 mb-4 inline-block">
            {language === "ar"
              ? "متحدثو مالابار"
              : language === "ml"
                ? "പ്രഭാഷകർ"
                : "Malabar Voices"}
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-teal leading-tight uppercase font-sans tracking-tight">
            {t.speakersSection}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-light leading-relaxed max-w-162.5 mx-auto">
            {t.speakersDesc}
          </p>
        </div>

        <div className="max-w-7xl mx-auto w-full speakers-gallery-container scrollbar-hide">
          <div className="speakers-gallery-track pt-8 pb-20 overflow-x-auto lg:overflow-visible lg:justify-center items-center gap-4 sm:gap-6">
            {MABAR_SPEAKERS.slice(0, 7).map((spk, index) => (
              <div
                key={spk.id}
                className={`relative w-32 h-64 sm:w-40 sm:h-80 rounded-full overflow-hidden border border-slate-200 group shrink-0 transition-all duration-500 hover:scale-105 hover:border-gold/50 hover:z-30 hover:-translate-y-2 shadow-sm hover:shadow-lg ${
                  index % 2 === 1
                    ? "translate-y-6 sm:translate-y-10"
                    : "-translate-y-2 sm:-translate-y-4"
                }`}
              >
                {/* Speaker Image */}
                <img
                  src={spk.imageUrl}
                  alt={spk.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 filter brightness-[0.85] group-hover:brightness-100"
                  onError={(e) => {
                    const fallbacks = [
                      "1507003211169-0a1dd7228f2d",
                      "1472099645785-5658abf4ff4e",
                      "1519085360753-af0119f7cbe7",
                      "1628157582853-a796fa650a6a",
                      "1560250097-0b93528c311a",
                      "1500648767791-00dcc994a43e",
                      "1506794778202-cad84cf45f1d"
                    ];
                    const fbId = fallbacks[index % fallbacks.length];
                    (e.target as HTMLImageElement).src =
                      `https://images.unsplash.com/photo-${fbId}?auto=format&fit=crop&q=80&w=200`;
                  }}
                />

                {/* Default Gradient Overlay at the bottom */}
                <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent opacity-85 pointer-events-none" />

                {/* Default text label visible (fades out on hover) */}
                <div className="absolute bottom-0 inset-x-0 p-4 pb-8 sm:pb-10 text-center z-10 flex flex-col items-center justify-end group-hover:opacity-0 transition-opacity duration-300">
                  <h4 className="text-[10px] sm:text-xs font-bold text-slate-100 leading-tight">
                    {spk.name}
                  </h4>
                  <p className="text-[8px] text-gold font-semibold uppercase tracking-wider mt-1">
                    {spk.affiliation.split(" / ")[0]}
                  </p>
                </div>

                {/* Hover Info Overlay */}
                <div className="absolute inset-0 bg-[#0b1a30]/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4 sm:p-5 text-center rounded-full">
                  {/* Upper spacing buffer */}
                  <div className="h-6 sm:h-8"></div>

                  {/* Core Info */}
                  <div className="flex flex-col items-center justify-center grow text-white-force">
                    <h4 className="text-[10px] sm:text-xs font-extrabold text-gold leading-tight px-1">
                      {spk.name}
                    </h4>
                    <p className="text-[8px] sm:text-[9px] text-slate-100 font-bold uppercase tracking-wider mt-1.5 leading-tight px-1">
                      {spk.role}
                    </p>
                    <p className="text-[8px] text-slate-300 italic mt-0.5 px-1">
                      {spk.affiliation}
                    </p>

                    {/* Short bio */}
                    <p className="text-[8px] sm:text-[9px] text-slate-200 font-light leading-relaxed mt-2.5 max-h-20 overflow-y-auto px-1 scrollbar-hide">
                      {spk.bio}
                    </p>
                  </div>

                  {/* Topics Tags at bottom */}
                  <div className="flex flex-wrap justify-center gap-1 mt-auto pb-4 sm:pb-6 px-1">
                    {spk.topics.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="text-[7px] sm:text-[8px] text-slate-200 bg-white/10 border border-white/15 px-1.5 py-0.5 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COLLABORATIVE PARTNERS SHOWCASE */}
      <section className="py-20 border-t border-b border-slate-200/40 bg-slate-50/50 w-full relative z-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="text-center mb-10 max-w-xl mx-auto">
            <span className="text-[10px] uppercase font-bold tracking-widest text-teal bg-teal/10 px-3.5 py-1.5 rounded-full border border-teal/20 mb-3 inline-block">
              Coordinating Solidarities
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-teal uppercase font-sans">
              Partner Institutions
            </h3>
            <p className="text-xs text-slate-500 font-light mt-2 leading-relaxed">
              Click on any affiliate body to examine their specific role and collaborative objectives in the Malabar Decolonial Space ecosystem.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {MABAR_PARTNERS.map((partner) => {
              const isActive = activePartnerName === partner.name;
              return (
                <button
                  key={partner.name}
                  onClick={() => setActivePartnerName(isActive ? null : partner.name)}
                  className={`px-6 py-4 rounded-2xl border text-xs font-bold uppercase transition-all duration-300 cursor-pointer shadow-xs ${
                    isActive
                      ? "bg-teal text-white border-teal shadow-md"
                      : "bg-white border-slate-200 text-slate-700 hover:border-teal hover:bg-teal/5"
                  }`}
                >
                  {partner.name}
                </button>
              );
            })}
          </div>

          {/* Partner detail card display */}
          {activePartnerName && (
            (() => {
              const partner = MABAR_PARTNERS.find((p) => p.name === activePartnerName);
              if (!partner) return null;
              return (
                <div
                  className="mt-8 max-w-3xl mx-auto animate-fade-in relative"
                  style={{
                    background: 'var(--mobbin-surface)',
                    border: '1px solid var(--mobbin-border-2)',
                    borderRadius: 16,
                    padding: '24px 28px',
                  }}
                >
                  <div className="absolute right-4 top-4">
                    <button
                      onClick={() => setActivePartnerName(null)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: 24, height: 24, borderRadius: 6,
                        border: '1px solid var(--mobbin-border-2)',
                        background: 'var(--mobbin-bg-2)',
                        color: 'var(--mobbin-text-3)',
                        cursor: 'pointer', fontSize: 11,
                      }}
                    >
                      ✕
                    </button>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-gold bg-gold/10 px-2.5 py-0.5 rounded border border-gold/20 font-sans inline-block mb-3">
                    {partner.role}
                  </span>
                  <h4 className="text-lg font-bold text-teal font-sans">
                    {partner.name}
                  </h4>
                  <p className="text-xs text-slate-650 mt-2 font-light leading-relaxed">
                    {partner.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px]">
                    <span className="text-slate-400 font-bold tracking-wide">
                      COORDINATION TYPE: DIRECT AFFILIATE
                    </span>
                    <span className="text-teal font-bold hover:underline cursor-pointer" onClick={() => handleNavigation("about")}>
                      About Collaborative Framework &rarr;
                    </span>
                  </div>
                </div>
              );
            })()
          )}
        </div>
      </section>

      {/* DECOLONIAL ANALYTICS INDICATORS */}
      <section className="px-6 py-20 max-w-7xl mx-auto w-full relative z-20">
        <div
          className="rounded-2xl p-8 sm:p-12"
          style={{ background: 'var(--mobbin-surface)', border: '1px solid var(--mobbin-border)' }}
        >
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <span className="text-[10px] uppercase font-bold tracking-widest text-terracotta bg-terracotta/10 px-3.5 py-1.5 rounded-full border border-terracotta/20 mb-3 inline-block">
              Ecosystem Data
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-teal uppercase font-sans">
              Decolonial Trade Indicators
            </h3>
            <p className="text-xs text-slate-500 font-light mt-2 leading-relaxed">
              Contrasting the extractive economic indices of colonial enterprises with the self-sustaining, cooperative indices of pre-colonial Indian Ocean trade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Colonial Cartel Indices */}
            <div className="bg-red-500/5 border border-red-500/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-red-750 font-sans uppercase tracking-wide flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse"></span>
                  Colonial Monopolization Metrics
                </h4>
                <p className="text-xs text-slate-500 font-light mt-2 leading-relaxed">
                  European chartered corporations (Portuguese Estado da Índia, EIC) established armed cartels that systematically crushed mutual trade pathways.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-4">
                {[
                  { label: "Interest Extraction", rate: "12% - 24% per annum", desc: "Forced compound debt systems on local cultivators." },
                  { label: "Tax Seizure Rate", rate: "35% - 60% of agrarian yield", desc: "Unilateral landlord collection under colonial rules." },
                  { label: "Commercial Monopolization", rate: "100% spice export controls", desc: "Armed blockades restricting free maritime dhow sailings." }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-start gap-4 border-b border-red-500/10 pb-3">
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">{item.label}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{item.desc}</span>
                    </div>
                    <span className="text-xs font-extrabold text-red-600 shrink-0 font-mono bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">{item.rate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Indian Ocean Cooperative Indices */}
            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-emerald-750 font-sans uppercase tracking-wide flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Oceanic Cooperative Indices
                </h4>
                <p className="text-xs text-slate-500 font-light mt-2 leading-relaxed">
                  Historical networks linking ports like Calicut operated on risk-pooling contracts, mutual aid, and public Waqf trusts.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-4">
                {[
                  { label: "Mutual Risk Sharing", rate: "Mudarabah & Musharakah", desc: "Losses split by capital; profit margins pre-agreed." },
                  { label: "Beneficiary Allocation", rate: "100% direct Waqf yields", desc: "No compound interest; funds allocated to welfare pallis." },
                  { label: "Ocean Commerce Sovereignty", rate: "0% armed cartels", desc: "Monsoon trade sanctuary governed by Shah Bandar guilds." }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-start gap-4 border-b border-emerald-500/10 pb-3">
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">{item.label}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{item.desc}</span>
                    </div>
                    <span className="text-xs font-extrabold text-emerald-600 shrink-0 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">{item.rate}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DECOLONIAL FAQS ACCORDION SECTION */}
      <section className="px-6 py-20 max-w-4xl mx-auto w-full relative z-20">
        <div className="text-center mb-12 max-w-xl mx-auto">
          <span className="text-[10px] uppercase font-bold tracking-widest text-gold bg-gold/10 px-3.5 py-1.5 rounded-full border border-gold/20 mb-3 inline-block">
            FAQ Accordion
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-teal uppercase font-sans">
            Decolonial FAQs
          </h3>
          <p className="text-xs text-slate-500 font-light mt-2 leading-relaxed">
            Explore frequently discussed scholastic concepts about pre-colonial commerce, linguistic autonomy, and interest-free economics.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {HOME_FAQS.map((faq, index) => {
            const isOpen = activeFaqIndex === index;
            return (
              <div
                key={index}
                className="overflow-hidden transition-all duration-200"
                style={{
                  background: 'var(--mobbin-surface)',
                  border: `1px solid ${isOpen ? 'var(--mobbin-blue)' : 'var(--mobbin-border)'}`,
                  borderRadius: 12,
                }}
              >
                <button
                  onClick={() => setActiveFaqIndex(isOpen ? null : index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-semibold text-teal cursor-pointer bg-transparent border-0"
                >
                  <span className="text-xs sm:text-sm font-bold font-sans">{faq.question}</span>
                  <span className={`text-base font-bold shrink-0 transition-transform duration-350 ${isOpen ? "rotate-45 text-gold" : "text-slate-400"}`}>
                    ＋
                  </span>
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-6 text-xs text-slate-650 font-light leading-relaxed font-sans border-t border-slate-100 pt-4 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SPONSOR STRIP */}
      <section className="py-12 border-t border-b border-slate-100 bg-slate-50/30 w-full overflow-hidden relative z-20">
        <div className="max-w-7xl mx-auto w-full px-6 flex flex-wrap justify-center items-center gap-8 sm:gap-16">
          {[
            "EVIDENT MAGAZINE",
            "HASANATH INSTITUTE",
            "COCOON PEDAGOGY",
            "WORLD DECOLONIZATION FORUM",
            "DARUL HUDA",
          ].map((sponsor, idx) => (
            <span
              key={idx}
              className="text-xs uppercase font-extrabold tracking-[0.25em] text-slate-400 hover:text-gold transition-colors duration-350 cursor-default select-none"
            >
              {sponsor}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
