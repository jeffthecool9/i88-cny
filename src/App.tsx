import React, { useEffect, useMemo, useState } from "react";

import Hero from "./components/Hero";
import Mechanics from "./components/Mechanics";
import HowToJoin from "./components/HowToJoin";
import FooterCTA from "./components/FooterCTA";
import MiniGame from "./components/MiniGame";
import DivineFortuneBox from "./components/DivineFortuneBox";
import TutorialModal from "./components/TutorialModal";

/**
 * Error Boundary (prevents "blank screen" when a child component crashes)
 */
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; name?: string },
  { hasError: boolean; error?: any }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, info: any) {
    console.error(`[ErrorBoundary:${this.props.name || "App"}]`, error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#000814] text-white p-8">
          <div className="max-w-3xl mx-auto rounded-2xl border border-yellow-400/30 bg-white/5 p-6 backdrop-blur-xl">
            <h1 className="text-2xl font-black text-yellow-200">
              Component crashed 💥
            </h1>
            <p className="mt-2 text-yellow-100/70">
              This is why your page becomes blank. Check console for the real
              error. I trapped it so the page doesn’t die.
            </p>

            <div className="mt-4 text-xs whitespace-pre-wrap rounded-xl bg-black/40 p-4 border border-white/10">
              {String(this.state.error?.message || this.state.error || "Unknown error")}
            </div>

            <p className="mt-4 text-yellow-100/70 text-sm">
              ✅ Fix method: disable sections using the debug toggles (below),
              then re-enable one by one to find which component is breaking.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children as any;
  }
}

const App: React.FC = () => {
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [tickets, setTickets] = useState(3);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  // Debug toggles: turn sections on/off without deleting code
  const [debug, setDebug] = useState(() => ({
    hero: true,
    mechanics: true,
    howToJoin: true,
    divine: true,
    footerCTA: true,
    miniGame: true,
    tutorialModal: true,
  }));

  const isBrowser = typeof window !== "undefined";

  useEffect(() => {
    if (!isBrowser) return;

    // Check for first visit
    try {
      const hasSeenTutorial = localStorage.getItem("hasSeenTutorial");
      if (!hasSeenTutorial) setIsTutorialOpen(true);
    } catch (e) {
      console.warn("localStorage blocked:", e);
    }

    const handleScroll = () => {
      setShowFloatingButton(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isBrowser]);

  const handlePlayNow = () => setIsGameOpen(true);

  const handleOpenTutorial = () => setIsTutorialOpen(true);

  const closeTutorial = () => {
    setIsTutorialOpen(false);
    try {
      localStorage.setItem("hasSeenTutorial", "true");
    } catch (e) {
      console.warn("localStorage blocked:", e);
    }
  };

  const useTicket = () => setTickets((prev) => Math.max(0, prev - 1));

  const scrollToTop = () => {
    if (!isBrowser) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showDebugBar = useMemo(() => true, []);

  return (
    <ErrorBoundary name="App">
      <main className="min-h-screen bg-[#000814] relative">
        {/* DEBUG CONTROL BAR (remove later) */}
        {showDebugBar && (
          <div className="fixed top-4 left-4 z-[999] rounded-2xl border border-yellow-200/25 bg-black/40 backdrop-blur-xl p-3 text-[11px] text-yellow-100/90 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <div className="font-black text-yellow-200 mb-2">
              DEBUG: Toggle sections
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(debug).map(([k, v]) => (
                <button
                  key={k}
                  onClick={() => setDebug((d) => ({ ...d, [k]: !d[k as keyof typeof d] }))}
                  className={`px-2 py-1 rounded-lg border transition ${
                    v
                      ? "border-yellow-200/30 bg-yellow-300/10"
                      : "border-white/10 bg-white/5 opacity-60"
                  }`}
                >
                  {v ? "ON ✅" : "OFF ❌"} {k}
                </button>
              ))}
            </div>
            <div className="mt-2 text-yellow-100/60">
              If page becomes blank normally, now you’ll see the crash info.
            </div>
          </div>
        )}

        {/* FLOATING ACTION BAR */}
        <div
          className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[60] w-full px-6 max-w-md pointer-events-none transition-all duration-500 ease-in-out ${
            showFloatingButton && !isGameOpen && !isTutorialOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-10 scale-90"
          }`}
        >
          <div className="pointer-events-auto flex flex-col gap-3">
            <button
              onClick={handlePlayNow}
              className="w-full py-6 bg-gradient-to-b from-[#fde047] via-[#eab308] to-[#854d0e] text-[#2a0101] font-black rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(234,179,8,0.3)] border-b-6 border-[#4a2a00] active:translate-y-1 active:border-b-0 transition-all text-2xl relative overflow-hidden group"
            >
              {tickets > 0 ? "How It Works? 🧧" : "GET MORE TICKETS 🧧"}
              <span className="block text-[11px] uppercase font-black tracking-[0.2em] opacity-80 mt-1">
                Tickets Left: {tickets}
              </span>
            </button>
          </div>
        </div>

        {/* SCROLL TO TOP BUTTON */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className={`fixed bottom-32 right-6 md:bottom-10 md:right-10 z-[70] w-14 h-14 bg-gradient-to-b from-[#fde047] via-[#eab308] to-[#854d0e] text-[#2a0101] flex items-center justify-center rounded-full shadow-[0_10px_30px_rgba(234,179,8,0.5)] border-b-4 border-[#4a2a00] active:border-b-0 active:translate-y-1 transition-all duration-500 ease-in-out hover:scale-110 group ${
            showFloatingButton && !isGameOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-10 scale-0 pointer-events-none"
          }`}
        >
          <svg
            className="w-6 h-6 transition-transform group-hover:-translate-y-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={4}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>

        {/* HERO */}
        {debug.hero && (
          <ErrorBoundary name="Hero">
            <Hero onOpenTutorial={handleOpenTutorial as any} />
          </ErrorBoundary>
        )}

        {/* THEME TRANSITION */}
        <div className="bg-gradient-to-b from-[#000814] via-[#4a0404] to-[#000814] relative">
          {debug.mechanics && (
            <ErrorBoundary name="Mechanics">
              <Mechanics />
            </ErrorBoundary>
          )}

          {debug.howToJoin && (
            <ErrorBoundary name="HowToJoin">
              <HowToJoin />
            </ErrorBoundary>
          )}

          {debug.divine && (
            <ErrorBoundary name="DivineFortuneBox">
              <DivineFortuneBox />
            </ErrorBoundary>
          )}

          {debug.footerCTA && (
            <ErrorBoundary name="FooterCTA">
              <FooterCTA />
            </ErrorBoundary>
          )}
        </div>

        {/* Mini Game Modal */}
        {debug.miniGame && (
          <ErrorBoundary name="MiniGame">
            <MiniGame
              isOpen={isGameOpen}
              onClose={() => setIsGameOpen(false)}
              onTicketUse={useTicket}
              tickets={tickets}
            />
          </ErrorBoundary>
        )}

        {/* Tutorial Modal */}
        {debug.tutorialModal && (
          <ErrorBoundary name="TutorialModal">
            <TutorialModal isOpen={isTutorialOpen} onClose={closeTutorial} />
          </ErrorBoundary>
        )}

        <footer className="bg-black pt-16 pb-40 px-6 border-t border-[#eab308]/10 text-center text-[#eab308]/20 text-[10px] font-black uppercase tracking-[0.4em]">
          &copy; 2026 八仙来财 | MALAYSIA • SINGAPORE EXCLUSIVE
        </footer>
      </main>
    </ErrorBoundary>
  );
};

export default App;
