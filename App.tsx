import React, { useEffect, useState } from "react";
import Hero from "./components/Hero";
import InstantReward from "./components/InstantReward";
import HowToJoin from "./components/HowToJoin";

const App: React.FC = () => {
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowHeader(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen w-full flex justify-center bg-black">
      <div className="w-full max-w-[500px] bg-[#450a0a] relative shadow-[0_0_150px_rgba(0,0,0,0.6)] border-x border-white/5 bg-paper-texture">
        <Hero onOpenTutorial={() => setIsTutorialOpen(true)} />

        <div id="instant-reward">
          <InstantReward />
        </div>

        <div
          id="how-to-join"
          className="bg-gradient-to-b from-[#450a0a] to-[#1a0101]"
        >
          <HowToJoin />
        </div>

        <footer className="bg-[#000a12] pt-20 pb-40 px-10 text-center border-t border-white/5">
          <p className="text-[#FF5F5F] text-sm font-black uppercase tracking-[0.4em] mb-6">
            Official i88 Digital Entertainment
          </p>
          <p className="text-[#FF5F5F] text-xs leading-relaxed uppercase tracking-[0.2em] max-w-sm mx-auto">
            Operating Since 2017 • Serving Malaysia for 9 Consecutive Years.
            Verified Regional Service. 21+ Only.
          </p>
        </footer>

        {/* Bottom CTA container (empty right now) */}
        <div
          className={`fixed bottom-0 left-1/2 -translate-x-1/2 z-[80] w-full max-w-[500px] pointer-events-none transition-all duration-700 ease-in-out ${
            !isGameOpen && !isTutorialOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-20"
          }`}
        >
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
          <div className="relative px-6 pb-12 pointer-events-auto"></div>
        </div>
      </div>
    </main>
  );
};

export default App;
