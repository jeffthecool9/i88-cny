
import React from 'react';
import { TICKET_TIERS } from '../constants';

const TicketSection: React.FC = () => {
  return (
    <section className="py-16 bg-[#1a0101] overflow-hidden">
      <div className="px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-yellow-500">
          Get Tickets
        </h2>

        <div className="flex overflow-x-auto pb-8 space-x-6 snap-x snap-mandatory scrollbar-hide">
          {TICKET_TIERS.map((tier, idx) => (
            <div 
              key={idx} 
              className="min-w-[240px] snap-center glass-card p-8 rounded-2xl border-2 border-yellow-500/30 flex flex-col items-center text-center shadow-xl transform transition-transform hover:scale-105"
            >
              <div className="bg-yellow-500 text-[#8B0000] font-bold px-4 py-1 rounded-full text-sm mb-4">
                BEST VALUE
              </div>
              <div className="text-red-400 text-sm font-bold uppercase mb-1">Deposit</div>
              <div className="text-4xl font-black text-white mb-6">RM{tier.amount}</div>
              
              <div className="w-full h-[1px] bg-yellow-500/20 mb-6"></div>
              
              <div className="text-yellow-400 text-5xl font-black mb-1">{tier.tickets}</div>
              <div className="text-yellow-200 text-sm font-bold uppercase tracking-widest">Tickets</div>
              
              <button className="mt-8 w-full py-3 bg-yellow-500 text-red-950 font-bold rounded-xl hover:bg-yellow-400 active:scale-95 transition-all">
                Get Tickets
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-yellow-600/10 border border-yellow-500/30 rounded-xl text-center">
          <p className="text-yellow-500 font-bold text-sm">
            ✨ Bonus tickets are one-time only. Claim yours now! ✨
          </p>
        </div>
      </div>
    </section>
  );
};

export default TicketSection;
