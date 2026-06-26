import React from "react";
import { COCOON_BOOKS } from "../mabarData";

interface CocoonViewProps {
  activeBookId: string | null;
  cocoonSlideIndex: number;
  isPlayingAudio: boolean;
  audioProgress: number;
  audioSpeed: number;
  setActiveBookId: React.Dispatch<React.SetStateAction<string | null>>;
  setCocoonSlideIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsPlayingAudio: React.Dispatch<React.SetStateAction<boolean>>;
  setAudioProgress: React.Dispatch<React.SetStateAction<number>>;
  setAudioSpeed: React.Dispatch<React.SetStateAction<number>>;
}

export default function CocoonView({
  activeBookId,
  cocoonSlideIndex,
  isPlayingAudio,
  audioProgress,
  audioSpeed,
  setActiveBookId,
  setCocoonSlideIndex,
  setIsPlayingAudio,
  setAudioProgress,
  setAudioSpeed,
}: CocoonViewProps) {
  return (
    <section className="py-12 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 max-w-350 mx-auto w-full pt-10 sm:pt-15">
      <div className="border-b border-teal/15 pb-8 mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-teal">
          Pedagogical Intervention
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold uppercase mt-1 text-navy font-sans">
          Cocoon Library
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-light mt-2 max-w-162.5">
          Making MABAR’s intellectual world accessible to younger minds and educators through
          illustrated publications, histories, and audio narration dispatches.
        </p>
      </div>

      {/* If a book is active (Reading View) */}
      {activeBookId ? (
        (() => {
          const book = COCOON_BOOKS.find((b) => b.id === activeBookId);
          if (!book) return <p>Book not found.</p>;

          return (
            <div className="max-w-187.5 mx-auto flex flex-col gap-6">
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
                <button
                  onClick={() => {
                    setActiveBookId(null);
                    setIsPlayingAudio(false);
                    setAudioProgress(0);
                  }}
                  className="text-xs text-gold-dark hover:underline bg-transparent border-0 cursor-pointer font-semibold"
                >
                  &larr; Back to Library Catalog
                </button>
                <span className="text-xs text-slate-500 font-medium">{book.ageGroup}</span>
              </div>

              {/* Illustrated Reader Board */}
              <div className="glass-card rounded-2xl border border-teal/15 p-8 min-h-75 flex flex-col justify-between bg-teal/5">
                <div>
                  <div className="flex justify-between items-center text-[10px] text-gold-dark uppercase tracking-wider font-bold mb-6">
                    <span>{book.title}</span>
                    <span>
                      Slide {cocoonSlideIndex + 1} of {book.pdfPages.length}
                    </span>
                  </div>
                  <p className="font-serif text-lg sm:text-xl text-slate-800 font-medium leading-relaxed max-w-150 mx-auto text-center mt-4">
                    {book.pdfPages[cocoonSlideIndex]}
                  </p>
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-between items-center border-t border-slate-200/60 pt-6 mt-8">
                  <button
                    disabled={cocoonSlideIndex === 0}
                    onClick={() => setCocoonSlideIndex((prev) => Math.max(0, prev - 1))}
                    className="px-4 py-2 rounded bg-white text-xs text-slate-705 border border-slate-300 hover:border-gold/45 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer transition-all shadow-xs"
                  >
                    &larr; Previous Slide
                  </button>
                  <button
                    disabled={cocoonSlideIndex === book.pdfPages.length - 1}
                    onClick={() =>
                      setCocoonSlideIndex((prev) => Math.min(book.pdfPages.length - 1, prev + 1))
                    }
                    className="px-4 py-2 rounded bg-white text-xs text-slate-705 border border-slate-300 hover:border-gold/45 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer transition-all shadow-xs"
                  >
                    Next Slide &rarr;
                  </button>
                </div>
              </div>

              {/* Audio Narrator Board Mockup */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
                  <span className="font-bold text-gold-dark uppercase">
                    Audio Narration dispatch
                  </span>
                  <span className="text-slate-400">{book.audioNarrator}</span>
                </div>

                {/* Play progress bar */}
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="h-10 w-10 rounded-full bg-teal text-white flex items-center justify-center cursor-pointer border-0 shadow hover:bg-teal-dark transition-all"
                  >
                    {isPlayingAudio ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="4" y="4" width="4" height="16" />
                        <rect x="16" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  <div className="grow flex flex-col gap-1">
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal transition-all duration-300"
                        style={{ width: `${audioProgress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[9px] text-slate-400">
                      <span>0:00</span>
                      <span>{book.audioDuration}</span>
                    </div>
                  </div>

                  {/* Speed controller */}
                  <select
                    value={audioSpeed}
                    onChange={(e) => setAudioSpeed(Number(e.target.value))}
                    className="bg-slate-50 text-[10px] border border-slate-350 rounded px-2 py-1 text-slate-700 outline-none cursor-pointer"
                  >
                    <option value={1}>1.0x</option>
                    <option value={1.25}>1.25x</option>
                    <option value={1.5}>1.5x</option>
                  </select>
                </div>
              </div>

              {/* Teacher/Parent Guide */}
              <div className="bg-terracotta/5 border border-terracotta/15 p-5 rounded-xl text-xs">
                <h4 className="font-bold text-terracotta uppercase mb-1">
                  Teacher / Parent Pedagogical Note
                </h4>
                <p className="text-slate-700 font-light leading-relaxed">{book.teacherNote}</p>
              </div>
            </div>
          );
        })()
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COCOON_BOOKS.map((book) => (
            <div
              key={book.id}
              className="bg-white border border-slate-200/85 hover:border-gold/30 hover:shadow-lg p-6 rounded-2xl flex gap-6 items-center transition-all group shadow-sm"
            >
              {/* Fake book cover thumbnail */}
              <div className="h-30 w-22.5 bg-teal/5 rounded border border-teal/10 flex flex-col justify-between p-2.5 shrink-0 group-hover:border-gold transition-all">
                <span className="text-[8px] uppercase tracking-wider text-gold font-bold">
                  Cocoon
                </span>
                <span className="text-[10px] font-bold text-teal leading-tight font-serif italic line-clamp-3">
                  {book.title}
                </span>
              </div>

              <div className="grow flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wide">
                    <span className="text-teal">{book.ageGroup}</span>
                    <span className="text-slate-400">{book.theme}</span>
                  </div>
                  <h3 className="text-base font-bold text-teal mt-2 leading-snug">{book.title}</h3>
                  <p className="text-xs text-slate-500 font-light mt-1">
                    Audio narration duration: {book.audioDuration}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveBookId(book.id);
                    setCocoonSlideIndex(0);
                  }}
                  className="w-max mt-6 px-4 py-2 bg-transparent hover:bg-gold/5 text-gold font-semibold rounded-lg cursor-pointer border border-gold/40 transition-all"
                >
                  Read illustrated slides &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
