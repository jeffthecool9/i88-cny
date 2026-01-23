import React, { useEffect, useState } from "react";

import Hero from "./components/Hero";
import Mechanics from "./components/Mechanics";
import HowToJoin from "./components/HowToJoin";
import FooterCTA from "./components/FooterCTA";
import MiniGame from "./components/MiniGame";
import DivineFortuneBox from "./components/DivineFortuneBox";
import TutorialModal from "./components/TutorialModal";

export default function App() {
  // ...your existing code
  return (
    <main className="min-h-screen bg-[#000814] relative">
      <Hero onOpenTutorial={() => {}} />
      <Mechanics />
      <HowToJoin />
      <DivineFortuneBox />
      <FooterCTA />
      <MiniGame isOpen={false} onClose={() => {}} onTicketUse={() => {}} tickets={3} />
      <TutorialModal isOpen={false} onClose={() => {}} />
    </main>
  );
}
