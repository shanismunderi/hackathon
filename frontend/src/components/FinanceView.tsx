
import { FINANCE_MODELS, WAQF_PROPERTIES } from "../mabarData";

interface FinanceViewProps {
  t: any;
  activeFinanceTab: "dashboard" | "pathway" | "waqf" | "zakat";
  setActiveFinanceTab: (tab: "dashboard" | "pathway" | "waqf" | "zakat") => void;
  financeActiveCountry: string;
  setFinanceActiveCountry: (country: string) => void;
  waqfSearch: string;
  setWaqfSearch: (search: string) => void;
  selectedComparisonRegion: string;
  setSelectedComparisonRegion: (region: string) => void;
  zakatRemittance: number;
  setZakatRemittance: (val: number) => void;
  zakatTradeProfit: number;
  setZakatTradeProfit: (val: number) => void;
  zakatCategory: "all" | "Education" | "Healthcare" | "Microenterprise";
  setZakatCategory: (cat: "all" | "Education" | "Healthcare" | "Microenterprise") => void;
  handleNavigation: (view: any) => void;
}

export default function FinanceView({
  t: _t,
  activeFinanceTab,
  setActiveFinanceTab,
  financeActiveCountry,
  setFinanceActiveCountry,
  waqfSearch,
  setWaqfSearch,
  selectedComparisonRegion,
  setSelectedComparisonRegion,
  zakatRemittance,
  setZakatRemittance,
  zakatTradeProfit,
  setZakatTradeProfit,
  zakatCategory,
  setZakatCategory,
  handleNavigation: _handleNavigation,
}: FinanceViewProps) {

  // Zakat projects mock data
  const zakatProjects = [
    {
      name: "Ponnani Scholastic Scholarship",
      category: "Education" as const,
      cost: "$4,500",
      desc: "Covers boarding and classical texts for 12 local students.",
    },
    {
      name: "Mappila Agrarian Micro-loans",
      category: "Microenterprise" as const,
      cost: "$8,200",
      desc: "Riba-free equipment buying loans for 8 farming cooperatives.",
    },
    {
      name: "Coastal Mobile Health Unit",
      category: "Healthcare" as const,
      cost: "$6,000",
      desc: "Free basic clinic operations across 5 fisherman harbors.",
    },
  ];

  return (
    <section className="py-12 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 max-w-7xl mx-auto w-full pt-10 sm:pt-15 animate-fadeIn">
      {/* Header and Tab Navigation */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-terracotta bg-terracotta/10 px-3 py-1 rounded-full border border-terracotta/20 inline-block mb-3">
          Economic Architecture
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold uppercase mt-1 text-teal dark:text-white font-sans tracking-tight">
          Malabar Finance Lab
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light mt-3 max-w-2xl leading-relaxed">
          Coordinating research on interest-free finance, Waqf revitalisation, Zakat distribution models, cooperative banking structures, and Kerala's legal possibilities.
        </p>

        {/* Tabs navigation */}
        <div className="flex flex-wrap bg-slate-100 dark:bg-slate-900 rounded-xl p-1 border border-slate-200/60 dark:border-slate-800 w-max mt-8 gap-1">
          {[
            { id: "dashboard", label: "Comparative Dashboard" },
            { id: "pathway", label: "Kerala Regulatory Pathway" },
            { id: "waqf", label: "Waqf Mapping Tool" },
            { id: "zakat", label: "Zakat Impact Tracker" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFinanceTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold border-0 cursor-pointer transition-all duration-200 ${
                activeFinanceTab === tab.id
                  ? "bg-terracotta text-white shadow-md scale-[1.02]"
                  : "bg-transparent text-slate-550 dark:text-slate-405 hover:text-teal dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Comparative Dashboard */}
      {activeFinanceTab === "dashboard" && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Selector column */}
          <div className="lg:col-span-1 flex flex-col gap-2.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider mb-2 block font-sans">
              Choose Model
            </span>
            {FINANCE_MODELS.map((m) => (
              <button
                key={m.country}
                onClick={() => setFinanceActiveCountry(m.country)}
                className={`w-full text-left px-5 py-4 rounded-2xl border text-xs font-bold transition-all duration-200 cursor-pointer hover:translate-x-1 ${
                  financeActiveCountry === m.country
                    ? "bg-terracotta/10 dark:bg-terracotta/20 border-terracotta text-terracotta dark:text-terracotta-light font-extrabold shadow-sm"
                    : "bg-white dark:bg-slate-900 border-slate-200/60 dark:border-slate-800 text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-teal dark:hover:text-white"
                }`}
              >
                {m.country}{" "}
                {m.country === "Kerala / India" && (
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 font-normal ml-1">Nascent</span>
                )}
              </button>
            ))}
          </div>

          {/* Metrics Grid */}
          {(() => {
            const data = FINANCE_MODELS.find(
              (m) => m.country === financeActiveCountry
            );
            if (!data) return <p className="text-slate-500 dark:text-slate-400">Model not found.</p>;

            return (
              <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-7 flex flex-col gap-7 shadow-sm">
                <div className="border-b border-slate-100 dark:border-slate-800/80 pb-4">
                  <h3 className="text-xl font-bold text-teal dark:text-white font-sans tracking-tight">
                    {data.country} Model Overview
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    Metrics for decolonial Islamic finance comparison.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="bg-slate-50 dark:bg-slate-950/40 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/65 shadow-xs transition-all duration-200 hover:-translate-y-0.5">
                    <span className="text-[9px] uppercase text-slate-500 dark:text-slate-400 block font-semibold tracking-wider">
                      Islamic Banking Penetration
                    </span>
                    <span className="text-base font-bold text-teal dark:text-teal-light mt-1.5 block">
                      {data.penetration}
                    </span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950/40 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/65 shadow-xs transition-all duration-200 hover:-translate-y-0.5">
                    <span className="text-[9px] uppercase text-slate-500 dark:text-slate-400 block font-semibold tracking-wider">
                      Sukuk Market Share
                    </span>
                    <span className="text-base font-bold text-teal dark:text-teal-light mt-1.5 block">
                      {data.sukukShare}
                    </span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-950/40 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/65 shadow-xs transition-all duration-200 hover:-translate-y-0.5">
                    <span className="text-[9px] uppercase text-slate-500 dark:text-slate-400 block font-semibold tracking-wider">
                      Waqf Assets Status
                    </span>
                    <span className="text-base font-bold text-teal dark:text-teal-light mt-1.5 block leading-tight">
                      {data.waqfAssets.split(" ")[0]}{" "}
                      {data.waqfAssets.split(" ")[1] || "Corporate"}
                    </span>
                  </div>
                </div>

                {/* Descriptions */}
                <div className="flex flex-col gap-5 border-t border-slate-100 dark:border-slate-800/80 pt-5">
                  <div className="group">
                    <h4 className="text-[10px] uppercase font-bold text-gold-dark dark:text-gold-light tracking-wider">
                      Regulatory Framework:
                    </h4>
                    <p className="text-xs font-light text-slate-700 dark:text-slate-300 mt-1.5 leading-relaxed">
                      {data.regulatoryFramework}
                    </p>
                  </div>
                  <div className="group">
                    <h4 className="text-[10px] uppercase font-bold text-teal dark:text-teal-light tracking-wider">
                      Cooperative Financing Capability:
                    </h4>
                    <p className="text-xs font-light text-slate-700 dark:text-slate-300 mt-1.5 leading-relaxed">
                      {data.cooperativeFinance}
                    </p>
                  </div>
                  <div className="group">
                    <h4 className="text-[10px] uppercase font-bold text-terracotta dark:text-terracotta-light tracking-wider">
                      Zakat Institutional Model:
                    </h4>
                    <p className="text-xs font-light text-slate-700 dark:text-slate-300 mt-1.5 leading-relaxed">
                      {data.zakatModel}
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Tab 2: Kerala Regulatory Pathway Tool */}
      {activeFinanceTab === "pathway" && (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          <div className="text-center bg-terracotta/5 dark:bg-terracotta/10 border border-terracotta/20 dark:border-terracotta/30 rounded-3xl p-8 mb-4 shadow-sm">
            <h3 className="text-xl font-bold text-teal dark:text-white uppercase tracking-wider font-sans">
              India/Kerala Legal Grid Navigation
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light mt-3 leading-relaxed max-w-2xl mx-auto">
              Federal banking acts ban standard commercial Islamic banking. However, using State-level laws, our research maps out 5 practical pathways to operationalize risk-sharing capital.
            </p>
          </div>

          {/* Visual Pathway steps flowchart */}
          <div className="flex flex-col gap-6 relative before:absolute before:left-9 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
            {[
              {
                step: "01",
                title: "State Cooperative Credit Societies",
                detail:
                  "Form entities under State Cooperative Acts. Operating credit societies do not fall under RBI bank registration, enabling fully interest-free (riba-free) deposits and mutual business lending.",
              },
              {
                step: "02",
                title: "Non-Banking Financial Company (NBFC) Model",
                detail:
                  "Register a non-deposit taking NBFC. Under RBI rules, an NBFC can invest equity directly in asset-backed projects, facilitating mudarabah and musharakah joint businesses legally.",
              },
              {
                step: "03",
                title: "Waqf Board GIS Registry Integration",
                detail:
                  "Map unregistered property titles under the Waqf Act of 1995. Resolving boundary gaps secures lands against political usurpation and opens them for agricultural lease cooperatives.",
              },
              {
                step: "04",
                title: "Decentralized Baitulmal Zakat Boards",
                detail:
                  "Coordinate voluntary Zakat collection into unified regional funds, allocating micro-grants directly for vocational training and medical support programs without high administration charges.",
              },
              {
                step: "05",
                title: "Remittance-Backed Development Bonds",
                detail:
                  "Structure local state developmental initiatives utilizing diaspora funds as interest-free corporate bonds, distributing returns from productive infrastructure assets instead of compound interest.",
              },
            ].map((s, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 hover:border-terracotta/35 dark:hover:border-terracotta/40 p-6 rounded-2xl flex gap-5 items-start relative transition-all duration-300 group shadow-xs hover:shadow-md hover:-translate-y-0.5 z-10"
              >
                <span className="h-9.5 w-9.5 rounded-full bg-terracotta/10 dark:bg-terracotta/20 border border-terracotta/30 text-terracotta dark:text-terracotta-light flex items-center justify-center font-mono text-xs font-bold shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-250">
                  {s.step}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-teal dark:text-white group-hover:text-gold dark:group-hover:text-gold-light transition-colors uppercase tracking-wide">
                    {s.title}
                  </h4>
                  <p className="text-xs text-slate-650 dark:text-slate-350 font-light mt-1.5 leading-relaxed">
                    {s.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Waqf Mapping Tool */}
      {activeFinanceTab === "waqf" && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Properties list */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800 flex gap-3 shadow-xs">
                <input
                  type="text"
                  placeholder="Search property titles or coordinates..."
                  value={waqfSearch}
                  onChange={(e) => setWaqfSearch(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-805 px-4 py-3 text-xs rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-teal dark:focus:border-teal-light grow transition-all"
                />
              </div>

              <div className="flex flex-col gap-5">
                {WAQF_PROPERTIES.filter((w) => {
                  if (waqfSearch)
                    return (
                      w.name
                        .toLowerCase()
                        .includes(waqfSearch.toLowerCase()) ||
                      w.location
                        .toLowerCase()
                        .includes(waqfSearch.toLowerCase())
                    );
                  return true;
                }).map((prop) => (
                  <div
                    key={prop.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 rounded-2xl hover:border-gold/40 dark:hover:border-gold/40 transition-all duration-300 flex flex-col sm:flex-row justify-between sm:items-center gap-5 shadow-xs hover:shadow-md"
                  >
                    <div className="space-y-1">
                      <span
                        className={`text-[8px] font-bold uppercase tracking-wider border rounded-md px-2.5 py-1 inline-block mb-1.5 ${
                          prop.status === "Productive"
                            ? "bg-emerald-50 text-emerald-705 border-emerald-250/50 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                            : prop.status === "Underutilized"
                              ? "bg-amber-50 text-amber-755 border-amber-250/50 dark:bg-amber-550/10 dark:text-amber-400 dark:border-amber-550/20"
                              : "bg-red-50 text-red-755 border-red-250/50 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20"
                        }`}
                      >
                        {prop.status}
                      </span>
                      <h4 className="text-sm font-bold text-teal dark:text-white font-sans tracking-wide">
                        {prop.name}
                      </h4>
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        Location: <span className="text-slate-600 dark:text-slate-350">{prop.location}</span> | Type: <span className="text-slate-600 dark:text-slate-350">{prop.type}</span>
                      </p>
                      <p className="text-xs text-slate-650 dark:text-slate-350 font-light mt-2.5 leading-relaxed max-w-xl">
                        {prop.potential}
                      </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-250/50 dark:border-slate-800/80 shrink-0 text-center min-w-40 flex flex-col justify-center">
                      <span className="text-[9px] uppercase text-slate-550 dark:text-slate-450 block font-semibold tracking-wider">
                        Proposed Community Benefit
                      </span>
                      <span className="text-xs text-teal dark:text-teal-light font-bold mt-1.5 block">
                        {prop.benefit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Waqf registry guide */}
            <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 rounded-3xl text-xs shadow-xs h-max space-y-4">
              <h4 className="font-bold text-gold-dark dark:text-gold-light uppercase tracking-wider font-sans text-sm">
                Sensitivity Notice
              </h4>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-light font-sans">
                Waqf data coordinates can be highly sensitive and easily weaponized in land disputes. In line with Malabar Decolonial Space legal policies, specific plot boundaries are restricted to authorized legal researchers.
              </p>
              <div className="bg-terracotta/10 dark:bg-terracotta/20 border border-terracotta/30 p-4 rounded-xl text-terracotta-dark dark:text-terracotta-light leading-relaxed">
                <span>
                  Contact Malabar Decolonial Space taskforce to request academic access credentials.
                </span>
              </div>
            </div>
          </div>

          {/* State-Wise Waqf Property Status Comparison Grid */}
          <div className="mt-12 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/70 p-6 sm:p-8 rounded-3xl shadow-sm w-full font-sans">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between border-b border-slate-100 dark:border-slate-800 pb-5 mb-6 gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-terracotta bg-terracotta/10 dark:bg-terracotta/20 px-3 py-1 rounded-md border border-terracotta/20 dark:border-terracotta/30 font-sans inline-block mb-2">
                  Endowment Analytics
                </span>
                <h3 className="text-lg font-bold text-teal dark:text-white font-sans tracking-wide">
                  State-Wise Waqf Status Comparison Grid
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light font-sans mt-1">
                  Visualizing productive assets versus encroached properties across major pre-colonial Indian Ocean administrative hubs.
                </p>
              </div>

              {/* Region selector buttons */}
              <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-850 gap-1 w-max">
                {["all", "Kerala", "Zanzibar", "Aceh", "Yemen"].map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedComparisonRegion(region)}
                    className={`px-3 py-2 rounded-lg text-[10px] font-semibold uppercase tracking-wider cursor-pointer border-0 transition-all duration-200 ${
                      selectedComparisonRegion === region
                        ? "bg-terracotta text-white shadow-sm"
                        : "bg-transparent text-slate-550 dark:text-slate-405 hover:text-teal dark:hover:text-white"
                    }`}
                  >
                    {region === "all" ? "All Regions" : region}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Kerala / India",
                  totalLands: "14,200 Hectares",
                  securedPct: 65,
                  disputedPct: 35,
                  reclaimValue: "$1.8M / year",
                  note: "High legal friction due to non-digitized historic title records.",
                },
                {
                  name: "Zanzibar / Swahili Coast",
                  totalLands: "2,400 Hectares",
                  securedPct: 85,
                  disputedPct: 15,
                  reclaimValue: "$450K / year",
                  note: "Secure community trust ownership under Swahili customary logs.",
                },
                {
                  name: "Aceh / Indonesia",
                  totalLands: "8,100 Hectares",
                  securedPct: 80,
                  disputedPct: 20,
                  reclaimValue: "$1.2M / year",
                  note: "Sultanate deeds recognized directly under provincial autonomous code.",
                },
                {
                  name: "Hadramawt / Yemen",
                  totalLands: "4,300 Hectares",
                  securedPct: 90,
                  disputedPct: 10,
                  reclaimValue: "$600K / year",
                  note: "Ba'Alawi ancestral registers maintain strict community-based stewardship.",
                }
              ]
                .filter((item) => {
                  if (selectedComparisonRegion === "all") return true;
                  return item.name
                    .toLowerCase()
                    .includes(selectedComparisonRegion.toLowerCase());
                })
                .map((item) => (
                  <div
                    key={item.name}
                    className="bg-slate-50 dark:bg-slate-950/20 border border-slate-200/70 dark:border-slate-800/70 p-5 rounded-2xl flex flex-col justify-between hover:border-terracotta/30 dark:hover:border-terracotta/40 transition-all duration-350 shadow-xs hover:shadow-md"
                  >
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-slate-450 dark:text-slate-500 font-light block mt-0.5">
                          Total Assets: {item.totalLands}
                        </span>
                      </div>

                      {/* Graphical Percentages Stacked Bar */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-[10px] font-mono">
                          <span className="text-slate-500 dark:text-slate-400">Secured ({item.securedPct}%)</span>
                          <span className="text-slate-500 dark:text-slate-400">Disputed ({item.disputedPct}%)</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-red-500/20 dark:bg-red-500/10 overflow-hidden flex">
                          <div
                            className="h-full bg-emerald-500 dark:bg-emerald-450 transition-all duration-500"
                            style={{ width: `${item.securedPct}%` }}
                          ></div>
                          <div
                            className="h-full bg-red-500 animate-pulse"
                            style={{ width: `${item.disputedPct}%` }}
                          ></div>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-600 dark:text-slate-350 leading-relaxed font-light italic bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-3 rounded-xl">
                        "{item.note}"
                      </p>
                    </div>

                    <div className="border-t border-slate-150 dark:border-slate-800/75 pt-3.5 mt-5 flex justify-between items-center text-[10px]">
                      <span className="text-slate-450 dark:text-slate-500 uppercase font-bold tracking-wide">
                        Reclaim Benefit
                      </span>
                      <strong className="text-emerald-600 dark:text-emerald-400 font-extrabold text-xs">
                        {item.reclaimValue}
                      </strong>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}

      {/* Tab 4: Zakat Impact Tracker */}
      {activeFinanceTab === "zakat" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Zakat & Waqf Yield Calculator Panel */}
          <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl p-6 flex flex-col gap-6 shadow-xs font-sans">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-teal dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 mb-2 font-sans">
                Yield Calculator
              </h3>
              <p className="text-[11px] text-slate-550 dark:text-slate-400 font-light leading-relaxed">
                Simulate direct social yield from voluntary diaspora remittances and cooperative trade profits.
              </p>
            </div>

            {/* Calculator Sliders */}
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600 dark:text-slate-350">Diaspora Remittance Pool</span>
                  <strong className="text-teal dark:text-teal-light font-mono font-bold">
                    ${zakatRemittance.toLocaleString()}
                  </strong>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="5000"
                  value={zakatRemittance}
                  onChange={(e) => setZakatRemittance(Number(e.target.value))}
                  className="w-full accent-teal cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600 dark:text-slate-350">Cooperative Trade Profit</span>
                  <strong className="text-teal dark:text-teal-light font-mono font-bold">
                    ${zakatTradeProfit.toLocaleString()}
                  </strong>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="200000"
                  step="10000"
                  value={zakatTradeProfit}
                  onChange={(e) => setZakatTradeProfit(Number(e.target.value))}
                  className="w-full accent-teal cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
                />
              </div>
            </div>

            {/* Dynamic calculation results */}
            {(() => {
              const zakatCut = Math.floor(zakatTradeProfit * 0.025);
              const waqfYield = Math.floor(zakatRemittance * 0.05);
              const totalPool = zakatCut + waqfYield;

              const eduPool = Math.floor(totalPool * 0.4);
              const healthPool = Math.floor(totalPool * 0.3);
              const microPool = Math.floor(totalPool * 0.2);
              const housePool = Math.floor(totalPool * 0.1);

              return (
                <div className="flex flex-col gap-4.5 border-t border-slate-100 dark:border-slate-800/80 pt-5 text-xs font-sans">
                  <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-150 dark:border-slate-850 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase block font-bold tracking-wider">
                        Total Welfare Yield
                      </span>
                      <span className="text-lg font-extrabold text-teal dark:text-teal-light">
                        ${totalPool.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-right text-[10px] space-y-0.5 text-slate-550 dark:text-slate-450 font-mono">
                      <div>Zakat: ${zakatCut.toLocaleString()}</div>
                      <div>Waqf: ${waqfYield.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 mt-1.5">
                    <span className="text-[9px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                      Estimated Allocation Impact:
                    </span>

                    <div className="flex justify-between items-center border-b border-slate-50 dark:border-slate-850/40 pb-1.5">
                      <span className="text-slate-600 dark:text-slate-350">Students Supported ($100/ea):</span>
                      <span className="font-bold text-teal dark:text-teal-light font-mono">
                        {Math.floor(eduPool / 100)} scholars
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-b border-slate-50 dark:border-slate-850/40 pb-1.5">
                      <span className="text-slate-600 dark:text-slate-350">Mobile Clinic Care ($150/ea):</span>
                      <span className="font-bold text-teal dark:text-teal-light font-mono">
                        {Math.floor(healthPool / 150)} patients
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-b border-slate-50 dark:border-slate-850/40 pb-1.5">
                      <span className="text-slate-600 dark:text-slate-350">Coop Loans ($500/ea):</span>
                      <span className="font-bold text-teal dark:text-teal-light font-mono">
                        {Math.floor(microPool / 500)} farming coops
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-1">
                      <span className="text-slate-600 dark:text-slate-350">Coop Houses ($1000/ea):</span>
                      <span className="font-bold text-teal dark:text-teal-light font-mono">
                        {Math.floor(housePool / 1000)} families
                      </span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Dynamic projects details list */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-850 gap-1 w-max">
              {(["all", "Education", "Healthcare", "Microenterprise"] as const).map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setZakatCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold border-0 cursor-pointer transition-all duration-200 ${
                      zakatCategory === cat
                        ? "bg-teal text-white shadow-sm"
                        : "bg-transparent text-slate-550 dark:text-slate-405 hover:text-teal dark:hover:text-white"
                    }`}
                  >
                    {cat === "all" ? "All Areas" : cat}
                  </button>
                )
              )}
            </div>

            <div className="flex flex-col gap-5 mt-2.5">
              {zakatProjects
                .filter((p) => {
                  if (zakatCategory !== "all" && p.category !== zakatCategory)
                    return false;
                  return true;
                })
                .map((p, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 rounded-2xl hover:border-gold/45 dark:hover:border-gold/45 transition-all duration-300 shadow-xs hover:shadow-md"
                  >
                    <div className="flex justify-between items-center mb-2.5">
                      <span className="text-[9px] uppercase font-bold text-gold-dark dark:text-gold-light tracking-wider bg-gold/5 dark:bg-gold/10 px-2 py-0.5 rounded border border-gold/15 dark:border-gold/20">
                        {p.category}
                      </span>
                      <span className="text-xs font-bold text-teal dark:text-teal-light font-mono">
                        {p.cost}
                      </span>
                    </div>
                    <h4 className="text-base font-extrabold text-teal dark:text-white font-sans tracking-wide">
                      {p.name}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-350 font-light mt-2.5 leading-relaxed font-sans">
                      {p.desc}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
