
import React, { useState } from 'react';
import Hero from './components/Hero';
import Mechanics from './components/Mechanics';
import TicketSection from './components/TicketSection';
import HowToJoin from './components/HowToJoin';
import FooterCTA from './components/FooterCTA';
import MiniGame from './components/MiniGame';

const App: React.FC = () => {
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [tickets, setTickets] = useState(10); // Simulated state

  const handlePlayNow = () => {
    setIsGameOpen(true);
  };

  const useTicket = () => {
    setTickets(prev => Math.max(0, prev - 1));
  };

  return (
    <main className="min-h-screen">
      {/* Floating Play Button */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-full px-6 md:w-auto">
        <button 
          onClick={handlePlayNow}
          className="w-full md:px-12 py-4 bg-gradient-to-b from-yellow-400 to-yellow-600 text-[#4d0101] font-black rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(255,215,0,0.3)] border-b-4 border-yellow-800 active:translate-y-1 active:border-b-0 transition-all text-xl"
        >
          PLAY NOW 🧧
          <span className="block text-[10px] uppercase font-bold tracking-widest opacity-70">
            Tickets Left: {tickets}
          </span>
        </button>
      </div>

      <Hero />
      <Mechanics />
      <TicketSection />
      <HowToJoin />
      <FooterCTA />

      {/* Mini Game Modal */}
      <MiniGame 
        isOpen={isGameOpen} 
        onClose={() => setIsGameOpen(false)}
        onTicketUse={useTicket}
      />

      <footer className="bg-[#0c0101] py-10 px-6 border-t border-yellow-900/30 text-center text-yellow-900 text-[10px] uppercase tracking-widest">
        &copy; 2026 八仙过海 EVENT | EXCLUSIVE FOR MALAYSIA & SINGAPORE
      </footer>
    </main>
  );
};

export default App;
