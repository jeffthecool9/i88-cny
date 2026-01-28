
import React from 'react';
import { motion } from 'framer-motion';
import { TICKET_TIERS } from '../constants.ts';

const TicketSection: React.FC = () => {
  return (
    <section className="py-24 bg-transparent overflow-hidden relative">
      <div className="px-6 max-w-6xl mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-7xl font-black text-center mb-16 text-[#eab308] uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(234,179,8,0.3)]"
        >
          Get Tickets
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TICKET_TIERS.map((tier, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="relative bg-[#000814] p-12 rounded-[2.5rem] border-2 border-[#eab308]/20 flex flex-col items-center text-center shadow-[0_20px_40px_rgba(0,0,0,0.6)] group hover:border-[#eab308]/60 transition-all"
            >
              <div className="bg-gradient-to-r from-[#eab308] to-[#854d0e] text-[#000814] font-black px-6 py-1.5 rounded-full text-[10px] uppercase tracking-widest mb-8 shadow-[0_0_15px_rgba(234,179,8,0.4)]">
                BEST VALUE
              </div>
              <div className="text-[#FF0000] text-[10px] font-black uppercase tracking-[0.3em] mb-2">Deposit</div>
              <div className="text-6xl font-black text-white mb-8 tracking-tighter">RM{tier.amount}</div>
              <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#eab308]/30 to-transparent mb-8"></div>
              <div className="text-[#eab308] text-7xl font-black mb-1 drop-shadow-[0_0_25px_rgba(234,179,8,0.4)]">{tier.tickets}</div>
              <div className="text-[#FF0000] text-xs font-black uppercase tracking-[0.4em] mb-12">Tickets</div>
              {tier.isPreEvent && (
                <div className="absolute top-4 right-4 bg-[#8b0000] text-[#eab308] text-[9px] font-black px-3 py-1 rounded-full border border-[#eab308]/40 uppercase animate-pulse">Pre-event</div>
              )}
              <button className="w-full py-5 bg-gradient-to-b from-[#fde047] via-[#eab308] to-[#854d0e] text-[#2a0101] font-black rounded-2xl shadow-xl text-lg uppercase tracking-wider border-b-4 border-[#4a2a00] active:translate-y-1 active:border-b-0 transition-all">
                Get Tickets
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(59,130,246,0.03)_0%,transparent_70%)] pointer-events-none"></div>
    </section>
  );
};

export default TicketSection;
