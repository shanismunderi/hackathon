import { useState } from "react";
import { TEAM_MEMBERS, ADVISORY_BOARD } from "../mabarData";

interface AboutViewProps {
  t?: any;
  handleNavigation?: (view: any) => void;
}

export default function AboutView(_props: AboutViewProps) {
  const [selectedAdvisoryHub, setSelectedAdvisoryHub] = useState<string>("all");

  return (
    <section className="py-12 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 max-w-350 mx-auto w-full pt-10 sm:pt-15">
      <div className="border-b border-teal/15 pb-8 mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-light">
          Epistemological Identity
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold uppercase mt-1">
          About MABAR
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Left Column: Core Definition & Multilingualism */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="glass-card rounded-2xl p-8 border border-white/5">
            <h2 className="text-xl font-bold text-gold uppercase tracking-wider mb-4">
              What is MABAR?
            </h2>
            <p className="text-sm font-light leading-relaxed font-sans opacity-95">
              MABAR is a Malabar-rooted decolonial knowledge platform. It
              is structured not as a passive blog, but as an active,
              interconnected coordination hub that links digital archives,
              mapping tools, illustrated youth publications, alternative
              finance research, and events from a unified space.
            </p>
            <p className="text-sm font-light leading-relaxed font-sans mt-4 opacity-95">
              MABAR stands as an epistemological space making visible the
              Indian Ocean, Kitab tradition, Malabar scholarship, and
              Islamic financial frameworks that are usually ignored or
              misread by standard Eurocentric academic disciplines.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8 border border-white/5">
            <h2 className="text-xl font-bold text-gold uppercase tracking-wider mb-4">
              Why Malabar?
            </h2>
            <p className="text-sm font-light leading-relaxed font-sans opacity-95">
              Malabar is a historic Indian Ocean knowledge zone connected
              directly to Arabia (Hadramawt), East Africa (Zanzibar),
              Southeast Asia (Aceh), and Cairo (Al-Azhar). By tracing
              migration routes, spice networks, and legal manuscripts from
              ports like Calicut, Ponnani, and Kannur, we demonstrate that
              decolonial theory is not an invention of Western
              universities, but a living reality written in the monsoon
              cycles of Southwestern India.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8 border border-teal/15">
            <h2 className="text-xl font-bold text-teal-light uppercase tracking-wider mb-4">
              Multilingual Architecture
            </h2>
            <p className="text-sm font-light leading-relaxed font-sans opacity-95">
              Decolonial identity requires linguistic sovereignty. MABAR
              operates in a trilingual framework: <strong>Arabic</strong>,{" "}
              <strong>Malayalam</strong>, and <strong>English</strong>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-black/10 dark:bg-black/30 p-5 rounded-xl border border-white/5 text-center transition-all hover:bg-black/20">
                <span className="text-lg font-bold block">
                  English
                </span>
                <span className="text-[10px] opacity-60 block mt-1">
                  Global Decolonial Theory & Outreach
                </span>
              </div>
              <div className="bg-black/10 dark:bg-black/30 p-5 rounded-xl border border-white/5 text-center transition-all hover:bg-black/20">
                <span className="text-lg font-bold block">
                  മലയാളം
                </span>
                <span className="text-[10px] opacity-60 block mt-1">
                  Local Pedagogy & Social Memory
                </span>
              </div>
              <div className="bg-black/10 dark:bg-black/30 p-5 rounded-xl border border-white/5 text-center transition-all hover:bg-black/20">
                <span className="text-lg font-bold block">
                  العربية
                </span>
                <span className="text-[10px] opacity-60 block mt-1">
                  Kitab Scholarship & Global Islam
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: The 5 Crises MABAR Addresses */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-terracotta-dark/10 dark:bg-terracotta-dark/20 border border-terracotta/20 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-terracotta-light uppercase tracking-wider border-b border-terracotta/20 pb-2 mb-4">
              The Five Intellectual Crises
            </h3>
            <div className="flex flex-col gap-5">
              {[
                {
                  num: "01",
                  title: "Indian Ocean Muslim World Missing from Theory",
                  desc: "Mainstream decolonial scholarship focuses largely on the Atlantic and Americas, leaving oceanic legal and spiritual networks out of critical discourse.",
                },
                {
                  num: "02",
                  title: "Hindutva Appropriation of Decoloniality",
                  desc: "Nationalist narratives co-opt the language of decolonization to marginalize local minority heritages and rewrite legal pluralisms.",
                },
                {
                  num: "03",
                  title: "Marginalization of Islamic Epistemology",
                  desc: "The Kitab tradition and local Shafi'i legal manuals are dismissed as mere theological archives, rather than dynamic ethical structures.",
                },
                {
                  num: "04",
                  title: "Need for Islamic/Decolonial Economic Models",
                  desc: "Capitalist models enforce debt-reliance. We lack operational, community-focused cooperative banking and Waqf tools built within local legal grids.",
                },
                {
                  num: "05",
                  title: "Malabar's Absence from South-South Networks",
                  desc: "Kerala's deep historical scholastic links with Southeast Asia and Yemen are replaced by unilateral migrations to the Gulf without cultural agency.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3 transition-transform hover:translate-x-0.5">
                  <span className="font-mono text-xs font-bold text-terracotta-light">
                    {item.num}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold uppercase">
                      {item.title}
                    </h4>
                    <p className="text-[11px] opacity-75 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Directory teaser */}
          <div className="glass-card rounded-2xl p-6 border border-white/5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gold mb-4">
              MABAR Core Taskforce
            </h3>
            <div className="flex flex-col gap-4">
              {TEAM_MEMBERS.map((member, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-teal flex items-center justify-center font-bold text-white text-xs border border-white/10">
                    {member.name.charAt(
                      member.name.startsWith("Dr.") ||
                        member.name.startsWith("Prof.") ||
                        member.name.startsWith("Shaykh")
                        ? 7
                        : 0,
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold">
                      {member.name}
                    </h4>
                    <p className="text-[9px] opacity-50">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* METHODOLOGY TIMELINE */}
      <div className="mt-16 border-t border-slate-200/50 dark:border-slate-800/40 pt-16">
        <span className="text-xs font-bold uppercase tracking-wider text-teal">
          Our Workflow
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold uppercase mt-1 text-teal font-sans">
          Decolonial Research Methodology
        </h2>
        <p className="text-xs text-slate-500 font-light mt-2 max-w-2xl leading-relaxed">
          MABAR implements a structured workflow designed to safeguard textual accuracy while centering South-South critique of colonial knowledge structures.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
          {[
            {
              step: "01",
              title: "Archival Sourcing",
              desc: "Collaborating with old Malabar families and historical mosque cells to discover and catalog privately held manuscripts and commercial logs."
            },
            {
              step: "02",
              title: "Digital Capture",
              desc: "Performing high-resolution photographic scanning and applying OCR layers for Arabic-Malayalam and regional Arabic scripts."
            },
            {
              step: "03",
              title: "Decolonial Critique",
              desc: "Annotating classical texts with comparative readings, juxtaposing Shafi'i legal theory against modern theorists (e.g., Mignolo, Fanon, Spivak)."
            },
            {
              step: "04",
              title: "Peer Registry",
              desc: "Submitting translated drafts and annotated schemas to our Scholarly Taskforce to verify historical integrity before publishing."
            }
          ].map((item, idx) => (
            <div key={idx} className="glass-card border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between shadow-xs">
              <div>
                <span className="font-mono text-xs font-extrabold text-teal bg-teal/10 px-2.5 py-1 rounded-md shrink-0 block w-max mb-4">
                  {item.step}
                </span>
                <h4 className="text-sm font-bold uppercase font-sans">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 font-light mt-3 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADVISORY BOARD DIRECTORY */}
      <div className="mt-16 border-t border-slate-200/50 dark:border-slate-800/40 pt-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gold-dark">
              Global Coordination
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase mt-1 text-teal font-sans">
              Regional Advisory Board
            </h2>
            <p className="text-xs text-slate-500 font-light mt-2 max-w-xl">
              Our scholastic activities are guided by an international committee representing major hubs of the Indian Ocean network.
            </p>
          </div>

          {/* Hub Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {["all", "Hadramawt", "East Africa", "Southeast Asia", "Egypt"].map((hub) => (
              <button
                key={hub}
                onClick={() => setSelectedAdvisoryHub(hub)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                  selectedAdvisoryHub === hub
                    ? "bg-gold text-white border-gold shadow-xs"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-350 hover:bg-slate-50"
                }`}
              >
                {hub === "all" ? "All Hubs" : hub.split(" / ")[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {ADVISORY_BOARD.filter((member) => {
            if (selectedAdvisoryHub === "all") return true;
            return member.hub.toLowerCase().includes(selectedAdvisoryHub.toLowerCase());
          }).map((member, idx) => (
            <div key={idx} className="glass-card border border-slate-205 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xs">
              <div>
                <span className="text-[9px] uppercase font-bold text-gold-dark bg-gold/10 px-2.5 py-0.5 rounded border border-gold/20 inline-block mb-3">
                  {member.hub}
                </span>
                <h4 className="text-base font-bold font-sans">
                  {member.name}
                </h4>
                <span className="text-[10px] text-slate-400 font-semibold block mt-1 uppercase tracking-wide">
                  {member.role}
                </span>
                <p className="text-xs text-slate-500 font-light mt-3 leading-relaxed">
                  Coordinating academic exchanges and manuscript access with {member.institution}.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
