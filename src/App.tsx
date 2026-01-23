import React, { useEffect, useState } from "react";

import Hero from "./components/Hero";
import Mechanics from "./components/Mechanics";
import HowToJoin from "./components/HowToJoin";
import FooterCTA from "./components/FooterCTA";
import MiniGame from "./components/MiniGame";
import DivineFortuneBox from "./components/DivineFortuneBox";
import TutorialModal from "./components/TutorialModal";

const App: React.FC = () => {
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [tickets, setTickets] = useState(3);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  useEffect(() => {
    try {
      const hasSeenTutorial = localStorage.getItem("hasSeenTutorial");
      if (!hasSeenTutorial) setIsTutorialOpen(true);
    } catch {}

    const handleScroll = () => setShowFloatingButton(window.scrollY > 400);

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePlayNow = () => setIsGameOpen(true);
  const handleOpenTutorial = () => setIsTutorialOpen(true);

  const closeTutorial = () => {
    setIsTutorialOpen(false);
    try {
      localStorage.setItem("hasSeenTutorial", "true");
    } catch {}
  };

  const useTicket = () => setTickets((prev) => Math.max(0, prev - 1));

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <main className="min-h-screen bg-[#000814] relative">
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

      <Hero onOpenTutorial={handleOpenTutorial} />

      <div className="bg-gradient-to-b from-[#000814] via-[#4a0404] to-[#000814] relative">
        <Mechanics />
        <HowToJoin />
        <DivineFortuneBox />
        <FooterCTA />
      </div>

      <MiniGame
        isOpen={isGameOpen}
        onClose={() => setIsGameOpen(false)}
        onTicketUse={useTicket}
        tickets={tickets}
      />

      <TutorialModal isOpen={isTutorialOpen} onClose={closeTutorial} />

      <footer className="bg-black pt-16 pb-40 px-6 border-t border-[#eab308]/10 text-center text-[#eab308]/20 text-[10px] font-black uppercase tracking-[0.4em]">
        &copy; 2026 八仙来财 | MALAYSIA • SINGAPORE EXCLUSIVE
      </footer>
    </main>
  );
};

export default App;
