import React from "react";

interface DialogueViewProps {
  t: any;
  qaQuestions: any[];
  qaName: string;
  qaEmail: string;
  qaTopic: string;
  qaQuestionText: string;
  qaSubmitSuccess: boolean;
  setQaQuestions: React.Dispatch<React.SetStateAction<any[]>>;
  setQaName: React.Dispatch<React.SetStateAction<string>>;
  setQaEmail: React.Dispatch<React.SetStateAction<string>>;
  setQaTopic: React.Dispatch<React.SetStateAction<string>>;
  setQaQuestionText: React.Dispatch<React.SetStateAction<string>>;
  setQaSubmitSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DialogueView({
  t: _t,
  qaQuestions,
  qaName,
  qaEmail,
  qaTopic,
  qaQuestionText,
  qaSubmitSuccess,
  setQaQuestions,
  setQaName,
  setQaEmail,
  setQaTopic,
  setQaQuestionText,
  setQaSubmitSuccess,
}: DialogueViewProps) {
  return (
    <section className="py-12 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36 max-w-350 mx-auto w-full pt-10 sm:pt-15">
      <div className="border-b border-teal/15 pb-8 mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-teal">
          Interactive Scholastic Exchange
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold uppercase mt-1 text-teal font-sans">
          Decolonial Dialogue Board
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-light mt-2 max-w-162.5">
          Browse our frequently answered questions or ask the scholarly taskforce directly about pre-colonial legal precedents, oceanic histories, and cooperativism.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Live Q&A feed */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <h3 className="text-base font-bold text-teal font-sans border-b border-slate-100 pb-2 mb-2 uppercase">
            Live Dialogues
          </h3>
          <div className="flex flex-col gap-6">
            {qaQuestions.map((q) => (
              <div
                key={q.id}
                className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-gold"></span>
                    <h4 className="text-xs font-bold text-slate-800">{q.name}</h4>
                  </div>
                  <span className="text-[9px] uppercase font-bold text-teal bg-teal/10 px-2 py-0.5 rounded border border-teal/20">
                    {q.topic}
                  </span>
                </div>
                <p className="text-xs text-slate-700 font-medium mt-3 leading-relaxed">
                  Q: {q.question}
                </p>
                <div className="mt-4 bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs leading-relaxed text-slate-655 font-light relative">
                  <span className="text-[9px] uppercase font-bold text-gold block mb-1">
                    Scholarly Response:
                  </span>
                  {q.answer}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Q&A Submission Form & FAQ directories */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-teal border-b border-slate-100 pb-2 mb-4">
              Submit a Question
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-light mb-6">
              Your inquiry goes directly to our coordinated scholarly committee for review and translation.
            </p>

            {qaSubmitSuccess ? (
              <div className="bg-emerald-50 border border-emerald-250 text-emerald-850 p-5 rounded-2xl text-xs font-semibold flex flex-col items-center text-center gap-2.5">
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
                <h4 className="font-bold text-sm">Question Submitted!</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  Thank you! Your question has been submitted to the scholarly committee.
                </p>
                <button
                  onClick={() => setQaSubmitSuccess(false)}
                  className="mt-2 text-xs text-gold font-bold underline bg-transparent border-0 cursor-pointer"
                >
                  Ask another question
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (qaName && qaEmail && qaQuestionText) {
                    const newQ = {
                      id: "q-" + Date.now(),
                      name: qaName,
                      question: qaQuestionText,
                      topic: qaTopic,
                      answer: "Awaiting response from committee...",
                      date: new Date().toISOString(),
                    };
                    setQaQuestions([newQ, ...qaQuestions]);
                    setQaSubmitSuccess(true);
                    setQaName("");
                    setQaEmail("");
                    setQaQuestionText("");
                  }
                }}
                className="flex flex-col gap-4 text-xs"
              >
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-500 uppercase text-[9px] tracking-wide font-bold">
                    Your Name
                  </label>
                  <input
                    required
                    type="text"
                    value={qaName}
                    onChange={(e) => setQaName(e.target.value)}
                    placeholder="Enter your name..."
                    className="bg-slate-50 border border-slate-350 px-3 py-2 text-xs rounded text-slate-800 focus:outline-none focus:border-teal"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-500 uppercase text-[9px] tracking-wide font-bold">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    value={qaEmail}
                    onChange={(e) => setQaEmail(e.target.value)}
                    placeholder="Enter email address..."
                    className="bg-slate-50 border border-slate-350 px-3 py-2 text-xs rounded text-slate-800 focus:outline-none focus:border-teal"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-500 uppercase text-[9px] tracking-wide font-bold">
                    Topic Area
                  </label>
                  <select
                    value={qaTopic}
                    onChange={(e) => setQaTopic(e.target.value)}
                    className="bg-slate-50 border border-slate-350 px-3 py-2 text-xs rounded text-slate-800 focus:outline-none focus:border-teal cursor-pointer"
                  >
                    <option value="Jurisprudence">Jurisprudence (Fiqh)</option>
                    <option value="Sufism">Sufism (Tasawwuf)</option>
                    <option value="History">Oceanic History</option>
                    <option value="Finance">Cooperative Finance</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-500 uppercase text-[9px] tracking-wide font-bold">
                    Your Question
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={qaQuestionText}
                    onChange={(e) => setQaQuestionText(e.target.value)}
                    placeholder="Type your question here..."
                    className="bg-slate-50 border border-slate-350 px-3 py-2 text-xs rounded text-slate-850 focus:outline-none focus:border-teal resize-none leading-relaxed"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-center py-2.5 bg-teal hover:bg-teal-dark text-white font-bold uppercase rounded cursor-pointer border-0 shadow-xs"
                >
                  Send Question
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
