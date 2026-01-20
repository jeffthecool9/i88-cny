import React, { useState, useEffect } from 'react';
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
      // Show button earlier for better accessibility
      if (window.scrollY > 200) {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#8b0000] flex justify-center overflow-x-hidden">
      {/* 
          CENTRAL ASPECT-RATIO CONTAINER 
      */}
      <div className="w-full max-w-[500px] bg-red-packet relative shadow-[0_0_150px_rgba(0,0,0,0.6)] border-x-4 border-[#eab308]/20 bg-paper-texture">
        
        {/* 
            FLOATING ACTION BAR 
            Fixed: Added backdrop blur and better separation to prevent overlap noise
        */}
        <div 
          className={`fixed bottom-0 left-1/2 -translate-x-1/2 z-[80] w-full max-w-[500px] pointer-events-none transition-all duration-700 ease-in-out ${
            showFloatingButton && !isGameOpen && !isTutorialOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          {/* Bottom Fade Mask to isolate the button */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#300101] via-[#300101]/90 to-transparent pointer-events-none"></div>
          
          <div className="relative px-6 pb-12 pointer-events-auto">
            <button 
              onClick={handlePlayNow}
              className="w-full py-5 bg-gradient-to-b from-[#fde047] via-[#eab308] to-[#854d0e] text-[#2a0101] font-black rounded-[2.2rem] shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_40px_rgba(253,224,71,0.2)] border-b-8 border-[#4a2a00] active:translate-y-2 active:border-b-0 transition-all text-2xl relative overflow-hidden group backdrop-blur-md"
            >
              <span className="relative z-10">Play Demo 🧧</span>
              <span className="block relative z-10 text-[11px] uppercase font-black tracking-[0.2em] opacity-80 mt-1">
                Tickets Left: {tickets}
              </span>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-white/30 translate-x-[-150%] skew-x-12 group-hover:translate-x-[150%] transition-transform duration-1000"></div>
            </button>
          </div>
        </div>

        {/* Scroll To Top Button - Positioned safe for mobile */}
        <button 
          onClick={scrollToTop}
          className={`fixed bottom-36 right-[calc(50%-235px)] z-[85] w-14 h-14 bg-gradient-to-b from-[#fde047] via-[#eab308] to-[#854d0e] text-[#2a0101] hidden md:flex items-center justify-center rounded-full shadow-2xl border-b-4 border-[#4a2a00] active:translate-y-1 active:border-b-0 transition-all duration-500 ${
            showFloatingButton && !isGameOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>

        <Hero onOpenTutorial={handleOpenTutorial} />
        
        {/* Increased bottom padding for content clearance */}
        <div className="relative bg-gradient-to-b from-transparent via-[#d40000] to-[#8b0000] pb-60">
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

        <footer className="bg-[#1a0101] pt-16 pb-64 px-6 border-t border-yellow-400/10 text-center text-yellow-400/20 text-[9px] font-black uppercase tracking-[0.4em]">
          &copy; 2026 八仙来财 | MALAYSIA • SINGAPORE EXCLUSIVE
        </footer>
      </div>
    </main>
  );
};

export default App;