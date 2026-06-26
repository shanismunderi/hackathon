import React from "react";
import { MABAR_EVENTS, MABAR_SPEAKERS } from "../mabarData";
import type { MabarEvent } from "../mabarData";

interface EventsViewProps {
  t: any;
  language: string;
  registeredEvents: string[];
  eventRegName: string;
  eventRegEmail: string;
  registeringEvent: MabarEvent | null;
  claimCertName: string;
  claimedCertificates: string[];
  activeSpeakerTopicFilter: string;
  setRegisteredEvents: React.Dispatch<React.SetStateAction<string[]>>;
  setEventRegName: React.Dispatch<React.SetStateAction<string>>;
  setEventRegEmail: React.Dispatch<React.SetStateAction<string>>;
  setRegisteringEvent: React.Dispatch<React.SetStateAction<MabarEvent | null>>;
  setClaimCertName: React.Dispatch<React.SetStateAction<string>>;
  setClaimedCertificates: React.Dispatch<React.SetStateAction<string[]>>;
  setActiveSpeakerTopicFilter: React.Dispatch<React.SetStateAction<string>>;
  handleNavigation: (view: any) => void;
}

export default function EventsView({
  t: _t,
  language: _language,
  registeredEvents,
  eventRegName,
  eventRegEmail,
  registeringEvent,
  claimCertName,
  claimedCertificates,
  activeSpeakerTopicFilter,
  setRegisteredEvents,
  setEventRegName,
  setEventRegEmail,
  setRegisteringEvent,
  setClaimCertName,
  setClaimedCertificates,
  setActiveSpeakerTopicFilter,
  handleNavigation: _handleNavigation,
}: EventsViewProps) {


  return (
    <section className="py-12 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 max-w-350 mx-auto w-full pt-10 sm:pt-15">
      <div className="border-b border-teal/15 pb-8 mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal">
            Coordinated Activities
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase mt-1 text-teal font-sans">
            Events &amp; Programmes
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-light mt-2 max-w-162.5">
            Participate in MABAR lectures, reading circles, manuscript
            documentation drives, and South-South decolonial dialogues.
          </p>
        </div>
      </div>

      {/* Active Panelist Filters & Showcase */}
      <div className="bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-xs w-full mb-10 font-sans">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4 mb-6 gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal bg-teal/10 px-2.5 py-0.5 rounded border border-teal/20 font-sans inline-block mb-1">
              Scholastic Panel
            </span>
            <h3 className="text-lg font-bold text-teal font-sans">
              Active Panelist Directory
            </h3>
            <p className="text-xs text-slate-500 font-light font-sans mt-0.5">
              Filter our scholars by theological and historical specialties.
            </p>
          </div>

          <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            {["all", "Jurisprudence", "Sufism", "History", "Indian Ocean"].map((topic) => (
              <button
                key={topic}
                onClick={() => setActiveSpeakerTopicFilter(topic)}
                className={`px-3 py-1.5 rounded text-[10px] font-semibold uppercase tracking-wider cursor-pointer border-0 ${
                  activeSpeakerTopicFilter === topic
                    ? "bg-teal text-white shadow-xs"
                    : "bg-transparent text-slate-500 hover:text-teal"
                }`}
              >
                {topic === "all" ? "All Specialties" : topic}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MABAR_SPEAKERS.filter((spk) => {
            if (activeSpeakerTopicFilter === "all") return true;
            return spk.topics.some((topicStr) =>
              topicStr.toLowerCase().includes(activeSpeakerTopicFilter.toLowerCase())
            );
          }).map((spk) => (
            <div
              key={spk.id}
              className="bg-white border border-slate-200/60 rounded-2xl p-5 hover:border-teal/30 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-9 w-9 rounded-full bg-teal text-white font-bold text-xs flex items-center justify-center border border-white/10 shrink-0">
                    {spk.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 leading-tight">
                      {spk.name}
                    </h4>
                    <span className="text-[9px] text-slate-400 font-medium block mt-0.5">
                      {spk.role}
                    </span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 italic mb-3">{spk.affiliation}</p>
                <p className="text-[11px] text-slate-650 leading-relaxed font-light line-clamp-3">
                  {spk.bio}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-3 mt-4 flex flex-wrap gap-1.5">
                {spk.topics.map((t) => (
                  <span
                    key={t}
                    className="text-[8px] bg-slate-50 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200/50"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Event lists */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {MABAR_EVENTS.map((evt) => {
            const isRegSuccess = registeredEvents.includes(evt.id);

            return (
              <div
                key={evt.id}
                className="bg-white border border-slate-200/85 hover:border-gold/30 hover:shadow-lg p-6 rounded-2xl transition-all shadow-sm"
              >
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wide">
                  <span className="text-gold">{evt.type}</span>
                  <span className="text-slate-400">{evt.time}</span>
                </div>
                <h3 className="text-base font-bold text-teal mt-1.5">{evt.title}</h3>
                <p className="text-xs text-slate-500 font-light mt-0.5">
                  Date: {evt.date} | Location: {evt.location}
                </p>
                <p className="text-xs text-slate-700 font-light mt-3 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/60">
                  {evt.description}
                </p>

                <div className="flex items-center gap-2 mt-4">
                  <span className="text-[10px] text-slate-400">Speakers:</span>
                  {evt.speakers.map((sp) => (
                    <span
                      key={sp}
                      className="text-[10px] bg-slate-100 rounded px-2.5 py-0.5 border border-slate-200 text-slate-700"
                    >
                      {sp}
                    </span>
                  ))}
                </div>

                {/* Registration triggers */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  {isRegSuccess ? (
                    <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Registered Successfully!</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setRegisteringEvent(evt)}
                      className="px-4 py-2 bg-teal hover:bg-teal-dark text-white text-xs font-bold uppercase rounded cursor-pointer border-0 transition-all"
                    >
                      Register for Zoom / Seat
                    </button>
                  )}
                  <span className="text-[10px] text-slate-400">
                    Status: <strong className="text-emerald-600">Open</strong>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Certificate lookup tool & dialog space */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Cert Lookup */}
          <div className="bg-white border border-gold/25 shadow-sm p-6 rounded-2xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gold border-b border-slate-100 pb-2 mb-3">
              Claim Event Certificate
            </h3>
            <p className="text-xs text-slate-650 leading-relaxed font-light mb-4">
              Have you attended previous MABAR research circles or finance seminars? Enter your full
              name to look up attendance logs and export/download your certificate.
            </p>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Enter registered attendee name..."
                value={claimCertName}
                onChange={(e) => setClaimCertName(e.target.value)}
                className="bg-slate-50 border border-slate-350 px-3 py-2 text-xs rounded text-slate-800 focus:outline-none focus:border-teal"
              />
              <button
                onClick={() => {
                  if (claimCertName.trim()) {
                    setClaimedCertificates([
                      "Islamic Finance and Regional Cooperatives",
                      "Tuhfat al-Mujahidin Annotations Lecture",
                    ]);
                  }
                }}
                className="w-full text-center py-2.5 bg-gold hover:bg-gold-light text-white text-xs font-bold uppercase rounded cursor-pointer border-0"
              >
                Lookup Attendance
              </button>
            </div>

            {claimedCertificates.length > 0 && (
              <div className="mt-6 border-t border-slate-100 pt-4 flex flex-col gap-3">
                <span className="text-[10px] text-slate-405 uppercase block">Found Certificates:</span>
                {claimedCertificates.map((cert) => (
                  <div
                    key={cert}
                    className="bg-slate-50 p-3 rounded-lg border border-slate-200/80 flex items-center justify-between gap-2"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-850 leading-tight">{cert}</span>
                      <span className="text-[9px] text-emerald-600 mt-0.5">Attendee: {claimCertName}</span>
                    </div>
                    <button
                      onClick={() =>
                        alert(`Downloading Certificate for ${claimCertName} - ${cert}`)
                      }
                      className="text-[10px] text-gold hover:text-gold-light font-semibold underline bg-transparent border-0 cursor-pointer"
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dialogue context */}
          <div className="bg-white border border-slate-200/80 shadow-sm rounded-2xl p-6">
            <h4 className="text-xs font-bold text-teal uppercase mb-2">
              World Decolonization Forum Partner
            </h4>
            <p className="text-xs text-slate-650 leading-relaxed font-light">
              MABAR serves as the Indian Ocean interlocutor in partnership with global networks,
              exchanging papers regarding restoration of manuscripts and comparative monetary
              sovereignty.
            </p>
          </div>
        </div>
      </div>

      {/* Registration Modal Dialog */}
      {registeringEvent && (
        <div className="fixed inset-0 z-300 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-112.5 rounded-2xl bg-white border border-slate-200/90 p-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <span className="text-[10px] font-bold text-gold uppercase">Event registration</span>
                <h3 className="text-sm font-bold text-teal mt-1">{registeringEvent.title}</h3>
              </div>
              <button
                onClick={() => setRegisteringEvent(null)}
                className="h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer border-0"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (eventRegName && eventRegEmail) {
                  setRegisteredEvents([...registeredEvents, registeringEvent.id]);
                  setRegisteringEvent(null);
                  setEventRegName("");
                  setEventRegEmail("");
                }
              }}
              className="flex flex-col gap-4 text-xs"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-500 uppercase text-[9px] tracking-wide">
                  Attendee Name
                </label>
                <input
                  required
                  type="text"
                  value={eventRegName}
                  onChange={(e) => setEventRegName(e.target.value)}
                  placeholder="Enter your full name..."
                  className="bg-slate-50 border border-slate-350 px-3 py-2 text-xs rounded text-slate-800 focus:outline-none focus:border-teal"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-500 uppercase text-[9px] tracking-wide">
                  Scholarly Email Address
                </label>
                <input
                  required
                  type="email"
                  value={eventRegEmail}
                  onChange={(e) => setEventRegEmail(e.target.value)}
                  placeholder="Enter email address..."
                  className="bg-slate-50 border border-slate-350 px-3 py-2 text-xs rounded text-slate-800 focus:outline-none focus:border-teal"
                />
              </div>
              <button
                type="submit"
                className="w-full text-center py-2.5 bg-teal hover:bg-teal-dark text-white text-xs font-bold uppercase rounded cursor-pointer border-0 transition-colors"
              >
                Confirm Event Seat
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
