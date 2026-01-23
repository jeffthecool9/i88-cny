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

  const useTicket = () => setTickets((p) => Math.max(0, p - 1));

  return (
    <main className="min-h-screen bg-[#000814] relative">
      <Hero onOpenTutorial={() => setIsTutorialOpen(true)} />

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

      <TutorialModal isOpen={isTutorialOpen} onClose={() => setIsTutorialOpen(false)} />
    </main>
  );
};

export default App;
