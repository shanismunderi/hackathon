interface FooterProps {
  language: "en" | "ml" | "ar";
  t: any;
  handleNavigation: (view: any) => void;
}

export default function Footer({ language, t, handleNavigation }: FooterProps) {
  return (
    <footer className="relative bg-black border-t border-teal/10 w-full px-6 sm:px-12 pt-16 pb-12 text-left">
      <div className="mx-auto flex w-full max-w-300 flex-col gap-12">
        {/* Newsletter Dispatch Card */}
        <div className="bg-teal text-white-force rounded-4xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 w-full shadow-2xl relative overflow-hidden">
          <div className="flex-1 flex flex-col items-start">
            <div className="flex items-center gap-4 w-full">
              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight whitespace-nowrap">
                {language === "ar"
                  ? "اشترك في بريدنا"
                  : language === "ml"
                    ? "വാർത്താപത്രിക ലഭിക്കാൻ"
                    : "Get dispatches instantly"}
              </h3>
              <div className="hidden sm:block h-0.5 bg-white/20 grow rounded" />
            </div>
            <p className="mt-4 text-xs sm:text-sm font-medium opacity-90 max-w-145 leading-relaxed">
              {language === "ar"
                ? "احصل على تحديثات مخطوطات مالابار الرقمية والأبحاث وخطط التمويل التعاوني مباشرة في بريدك."
                : language === "ml"
                  ? "ഡിജിറ്റൈസ് ചെയ്ത ലിഖിതങ്ങൾ, പുതിയ ഗവേഷണങ്ങൾ, ധനകാര്യ ലാബ് അപ്‌ഡേറ്റുകൾ എന്നിവ നേരിട്ട് ഇമെയിലിൽ ലഭിക്കാൻ അംഗമാകുക."
                  : "To connect, subscribe to our scholarly mail loop and receive updates on digitized manuscripts, legal cooperative frameworks, and decolonial critiques."}
            </p>
          </div>

          {/* Email form inside card */}
          <div className="w-full md:w-auto shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(
                  language === "ar"
                    ? "تم الاشتراك بنجاح!"
                    : language === "ml"
                      ? "വിജയകരമായി സബ്സ്ക്രൈബ് ചെയ്തു!"
                      : "Subscribed successfully!",
                );
              }}
              className="flex items-center bg-white dark:bg-slate-900 rounded-full p-1.5 w-full sm:w-105 shadow-lg border border-slate-200/50 dark:border-slate-800"
            >
              <input
                required
                type="email"
                placeholder={
                  language === "ar"
                    ? "بريدك الإلكتروني..."
                    : language === "ml"
                      ? "നിങ്ങളുടെ ഇമെയിൽ വിലാസം..."
                      : "Enter your email..."
                }
                className="bg-transparent px-5 py-2.5 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none grow"
              />
              <button
                type="submit"
                className="bg-black hover:bg-black/90 text-white rounded-full px-6 py-3 text-xs font-extrabold uppercase transition-all border-0 cursor-pointer shrink-0"
              >
                {language === "ar"
                  ? "ابدأ الآن"
                  : language === "ml"
                    ? "തുടങ്ങാം"
                    : "Get started"}
              </button>
            </form>
          </div>
        </div>

        {/* Lower columns layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pt-8">
          {/* Column 1: Newsletter Info */}
          <div className="lg:col-span-4 flex flex-col items-start justify-start gap-4">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              {language === "ar"
                ? "سجل معنا"
                : language === "ml"
                  ? "വാർത്താപത്രിക"
                  : "Sign up for our newsletter"}
            </h4>
            <p className="text-xs font-light text-white/50 leading-relaxed max-w-70">
              {language === "ar"
                ? "لا تقلق، نرسل فقط التحديثات المهمة والملخصات المعرفية بضع مرات في السنة."
                : language === "ml"
                  ? "പ്രധാനപ്പെട്ട വിവരങ്ങളും ഗവേഷണങ്ങളും മാത്രം അടങ്ങിയ വാർത്താപത്രികകൾ വർഷത്തിൽ ചില തവണ മാത്രമേ അയക്കൂ."
                  : "Don't worry, we reserve our newsletter for important news so we only send a few updates a year."}
            </p>
            <button
              onClick={() =>
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                })
              }
              className="mt-2 bg-transparent hover:bg-white/5 text-white border border-white/20 rounded-full px-6 py-2 text-xs font-semibold transition-all cursor-pointer"
            >
              {language === "ar"
                ? "اشتراك"
                : language === "ml"
                  ? "അംഗമാകുക"
                  : "Subscribe"}
            </button>
          </div>

          {/* Column 2: Help and Services */}
          <div className="lg:col-span-3 flex flex-col items-start justify-start">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4">
              {language === "ar"
                ? "المساعدة والخدمات"
                : language === "ml"
                  ? "സഹായവും സേവനങ്ങളും"
                  : "Help and services"}
            </h4>
            <button
              onClick={() => handleNavigation("about")}
              className="text-xs font-light text-white/60 hover:text-gold hover:underline transition-colors block text-left bg-transparent border-0 cursor-pointer p-0 mb-3"
            >
              About Malabar
            </button>
            <button
              onClick={() => handleNavigation("glossary")}
              className="text-xs font-light text-white/60 hover:text-gold hover:underline transition-colors block text-left bg-transparent border-0 cursor-pointer p-0 mb-3"
            >
              {t.glossary}
            </button>
            <button
              onClick={() => handleNavigation("timeline")}
              className="text-xs font-light text-white/60 hover:text-gold hover:underline transition-colors block text-left bg-transparent border-0 cursor-pointer p-0 mb-3"
            >
              {t.timeline}
            </button>
          </div>

          {/* Column 3: To explore */}
          <div className="lg:col-span-2 flex flex-col items-start justify-start">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4">
              {language === "ar"
                ? "للاستكشاف"
                : language === "ml"
                  ? "പര്യവേക്ഷണം"
                  : "To explore"}
            </h4>
            <button
              onClick={() => handleNavigation("atlas")}
              className="text-xs font-light text-white/60 hover:text-gold hover:underline transition-colors block text-left bg-transparent border-0 cursor-pointer p-0 mb-3"
            >
              Knowledge Atlas
            </button>
            <button
              onClick={() => handleNavigation("archive")}
              className="text-xs font-light text-white/60 hover:text-gold hover:underline transition-colors block text-left bg-transparent border-0 cursor-pointer p-0 mb-3"
            >
              Living Archive
            </button>
            <button
              onClick={() => handleNavigation("magazine")}
              className="text-xs font-light text-white/60 hover:text-gold hover:underline transition-colors block text-left bg-transparent border-0 cursor-pointer p-0 mb-3"
            >
              Evident Magazine
            </button>
          </div>

          {/* Column 4: Other possibilities */}
          <div className="lg:col-span-3 flex flex-col items-start justify-start">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4">
              {language === "ar"
                ? "إمكانيات أخرى"
                : language === "ml"
                  ? "മറ്റു വിജ്ഞാന ശാഖകൾ"
                  : "Other possibilities"}
            </h4>
            <button
              onClick={() => handleNavigation("finance")}
              className="text-xs font-light text-white/60 hover:text-gold hover:underline transition-colors block text-left bg-transparent border-0 cursor-pointer p-0 mb-3"
            >
              Finance Lab
            </button>
            <button
              onClick={() => handleNavigation("research")}
              className="text-xs font-light text-white/60 hover:text-gold hover:underline transition-colors block text-left bg-transparent border-0 cursor-pointer p-0 mb-3"
            >
              Research Hub
            </button>
            <button
              onClick={() => handleNavigation("cocoon")}
              className="text-xs font-light text-white/60 hover:text-gold hover:underline transition-colors block text-left bg-transparent border-0 cursor-pointer p-0 mb-3"
            >
              Cocoon Library
            </button>
            <button
              onClick={() => handleNavigation("contribute")}
              className="text-xs font-light text-white/60 hover:text-gold hover:underline transition-colors block text-left bg-transparent border-0 cursor-pointer p-0 mb-3"
            >
              {t.portal}
            </button>

            {/* App store / Play Store Badges */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 mt-4 w-full">
              <a
                href="#app-store"
                onClick={(e) => {
                  e.preventDefault();
                  alert("App Store download coming soon!");
                }}
                className="flex items-center gap-3 bg-black border border-white/20 rounded-xl px-4 py-2 hover:bg-white/5 transition-all text-white no-underline w-37.5 shrink-0"
              >
                <svg
                  className="h-5 w-5 text-white shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.56 2.95-1.39z" />
                </svg>
                <div className="flex flex-col items-start leading-none text-left">
                  <span className="text-[8px] text-white/50 font-medium">
                    Download on the
                  </span>
                  <span className="text-[10px] text-white font-extrabold mt-0.5 font-sans">
                    App Store
                  </span>
                </div>
              </a>

              <a
                href="#play-store"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Play Store download coming soon!");
                }}
                className="flex items-center gap-3 bg-black border border-white/20 rounded-xl px-4 py-2 hover:bg-white/5 transition-all text-white no-underline w-37.5 shrink-0"
              >
                <svg
                  className="h-5 w-5 text-white shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M5 2c-.3 0-.6.1-.8.4L13.7 12 4.2 21.6c.2.3.5.4.8.4.2 0 .4-.1.6-.2l13.6-7.8c.6-.4.9-1 .9-1.6s-.3-1.2-.9-1.6L5.6 2.2c-.2-.1-.4-.2-.6-.2z" />
                </svg>
                <div className="flex flex-col items-start leading-none text-left">
                  <span className="text-[8px] text-white/50 font-medium">
                    GET IT ON
                  </span>
                  <span className="text-[10px] text-white font-extrabold mt-0.5 font-sans">
                    Google Play
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright bar and social icons */}
        <div className="border-t border-white/10 pt-8 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-light text-white/40">
            &copy; 2026 Malabar Decolonial Space. Open Access under Creative Commons.
          </span>

          <div className="flex items-center gap-6">
            <a
              href="#facebook"
              aria-label="Facebook"
              onClick={(e) => e.preventDefault()}
              className="text-white/40 hover:text-white transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
              </svg>
            </a>

            <a
              href="#twitter"
              aria-label="Twitter"
              onClick={(e) => e.preventDefault()}
              className="text-white/40 hover:text-white transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <a
              href="#instagram"
              aria-label="Instagram"
              onClick={(e) => e.preventDefault()}
              className="text-white/40 hover:text-white transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
