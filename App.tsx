
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero.tsx';
import PromosSection from './components/PromosSection.tsx';
import InstantReward from './components/InstantReward.tsx';
import HowToJoin from './components/HowToJoin.tsx';
import MiniGame from './components/MiniGame.tsx';

const StickyHeader: React.FC<{ visible: boolean }> = ({ visible }) => (
  <AnimatePresence>
    {visible && (
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100 }}
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] z-[100] bg-white/95 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-lg"
      >
        <div className="flex items-center gap-2">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Cloud9_logo.svg/2560px-Cloud9_logo.svg.png" 
            alt="i88" 
            className="h-8 w-auto" 
          />
        </div>
        <button 
          onClick={() => window.open('https://www.iclub88.com/register', '_blank')}
          className="bg-[#D40000] text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-md hover:bg-red-700 transition-colors"
        >
          Register Now
        </button>
      </motion.header>
    )}
  </AnimatePresence>
);

const App: React.FC = () => {
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [tickets, setTickets] = useState(3); 
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#1a0101] flex justify-center overflow-x-hidden selection:bg-yellow-400 selection:text-black">
      <StickyHeader visible={showHeader} />

      <div className="w-full max-w-[500px] bg-[#450a0a] relative shadow-[0_0_150px_rgba(0,0,0,0.6)] border-x border-white/5 bg-paper-texture">
        <Hero onOpenTutorial={() => setIsTutorialOpen(true)} />
        <AboutSection />
        <PromosSection />
        <div id="instant-reward">
          <InstantReward />
        </div>
        <div id="how-to-join" className="bg-gradient-to-b from-[#450a0a] to-[#1a0101]">
           <HowToJoin />
        </div>

        <MiniGame 
          isOpen={isGameOpen}
          onClose={() => setIsGameOpen(false)}
          onTicketUse={() => setTickets(p => Math.max(0, p-1))}
          tickets={tickets}
          onRefill={() => setTickets(3)}
        />
      

        <footer className="bg-[#000a12] pt-20 pb-40 px-10 text-center border-t border-white/5">
          <p className="text-[#FF5F5F] text-sm font-black uppercase tracking-[0.4em] mb-6">
            Official i88 Digital Entertainment
          </p>
          <p className="text-[#FF5F5F] text-xs leading-relaxed uppercase tracking-[0.2em] max-w-sm mx-auto">
            Operating Since 2017 • Serving Malaysia for 9 Consecutive Years. Verified Regional Service. 21+ Only.
          </p>
        </footer>

        <div className={`fixed bottom-0 left-1/2 -translate-x-1/2 z-[80] w-full max-w-[500px] pointer-events-none transition-all duration-700 ease-in-out ${!isGameOpen && !isTutorialOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none"></div>
          <div className="relative px-6 pb-12 pointer-events-auto">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open('https://www.iclub88.com/register', '_blank')}
              className="w-full py-6 bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-600 text-[#1a0101] font-black rounded-2xl shadow-2xl transition-all text-xl uppercase tracking-widest border-b-6 border-yellow-700 active:translate-y-1 active:border-b-0"
            >
              Register & Unlock 🧧
            </motion.button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
