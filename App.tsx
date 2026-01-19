import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation.tsx';
import Hero from './components/Hero.tsx';
import Mechanics from './components/Mechanics.tsx';
import HowToJoin from './components/HowToJoin.tsx';
import FooterCTA from './components/FooterCTA.tsx';
import MiniGame from './components/MiniGame.tsx';
import DivineFortuneBox from './components/DivineFortuneBox.tsx';
import TutorialModal from './components/TutorialModal.tsx';

const App: React.FC = () => {
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [tickets, setTickets] = useState(3); 
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (!hasSeenTutorial) {
      setIsTutorialOpen(true);
    }

    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowFloatingButton(true);
      } else {
        setShowFloatingButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePlayNow = () => {
    setIsGameOpen(true);
  };

  const handleOpenTutorial = () => {
    setIsTutorialOpen(true);
  };

  const closeTutorial = () => {
    setIsTutorialOpen(false);
    localStorage.setItem('hasSeenTutorial', 'true');
  };

  const useTicket = () => {
    setTickets(prev => Math.max(0, prev - 1));
  };

  return (
    <main className="min-h-screen bg-[#0A0101] flex justify-center overflow-x-hidden">
      <div className="w-full max-w-[500px] bg-[#D40000] relative shadow-[0_0_150px_rgba(0,0,0,0.8)] border-x-4 border-[#eab308]/10 bg-paper-texture">
        
        <Navigation />

        {/* 
            REFINED FLOATING ACTION BAR 
        */}
        <div 
          className={`fixed bottom-0 left-1/2 -translate-x-1/2 z-[80] w-full max-w-[500px] pointer-events-none transition-all duration-700 ease-[0.16,1,0.3,1] ${
            showFloatingButton && !isGameOpen && !isTutorialOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1a0101] to-transparent pointer-events-none"></div>
          
          <div className="relative px-6 pb-12 pointer-events-auto">
            <button 
              onClick={handlePlayNow}
              className="w-full py-5 bg-gradient-to-b from-[#fde047] via-[#eab308] to-[#854d0e] text-[#2a0101] font-black rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-b-6 border-[#4a2a00] active:translate-y-1 active:border-b-0 transition-all text-xl"
            >
              Play Mini Game 🏮
              <span className="block text-[10px] uppercase opacity-60 tracking-[0.2em] mt-1">
                Tickets Available: {tickets}
              </span>
            </button>
          </div>
        </div>

        <Hero onOpenTutorial={handleOpenTutorial} />
        
        <div className="relative z-10 bg-gradient-to-b from-transparent via-[#d40000] to-[#1a0101] pb-32">
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

        <TutorialModal 
          isOpen={isTutorialOpen}
          onClose={closeTutorial}
        />

        <footer className="bg-[#0A0101] py-20 px-6 text-center text-white/10 text-[9px] font-black uppercase tracking-[0.5em] relative z-10">
          Exclusive Eight Immortals Experience &copy; 2026
        </footer>
      </div>
    </main>
  );
};

export default App;