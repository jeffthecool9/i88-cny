
import React from 'react';
import { motion } from 'framer-motion';
import { PRE_EVENT_TIERS, REGULAR_RATE, EVENT_DATES } from '../constants.ts';

const PreEventSection: React.FC = () => {
  return (
    <section className="py-20 px-6 relative bg-gradient-to-b from-[#8B0000] to-[#5F0000] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 blur-[80px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/5 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="max-w-lg mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-yellow-400 text-[#4a0101] px-4 py-1 rounded-full font-black text-[10px] uppercase tracking-[0.3em] mb-4 animate-pulse">
            Exclusive Early Access
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-2">
            Pre-Event <span className="text-yellow-400">Sales</span>
          </h2>
          <p className="text-white/60 font-bold uppercase tracking-widest text-[10px]">
            Limited Time: {EVENT_DATES.preFull}
          </p>
        </motion.div>

        {/* Comparison Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 mb-8 text-center"
        >
          <div className="flex items-center justify-between px-4">
             <div className="text-left">
                <span className="block text-white/40 text-[9px] font-black uppercase tracking-widest">Regular Event Rate</span>
                <span className="text-white font-black text-lg">${REGULAR_RATE.amount} = {REGULAR_RATE.tickets} Ticket</span>
             </div>
             <div className="w-[1px] h-10 bg-white/10 mx-4"></div>
             <div className="text-right">
                <span className="block text-yellow-400 text-[10px] font-black uppercase tracking-widest">Pre-Event Value</span>
                <span className="text-yellow-300 font-black text-xl animate-pulse">Save Up to 40%</span>
             </div>
          </div>
        </motion.div>

        {/* Ticket Cards */}
        <div className="grid gap-4">
          {PRE_EVENT_TIERS.map((tier, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative group overflow-hidden bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-6 flex items-center justify-between hover:border-yellow-400/40 transition-all duration-500"
            >
              {/* Card Glow */}
              <div className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-[0.03] transition-opacity pointer-events-none"></div>

              <div className="flex flex-col">
                <span className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em] mb-1">Single Deposit</span>
                <span className="text-white text-3xl font-black tracking-tighter">RM{tier.amount.toLocaleString()}</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-10 w-[1px] bg-white/10"></div>
                <div className="text-center">
                  <span className="block text-yellow-400 text-[10px] font-black uppercase tracking-[0.3em] mb-0.5"></span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-white text-4xl font-black tracking-tighter leading-none">{tier.tickets}</span>
                    <span className="text-yellow-400 text-[10px] font-black uppercase">Tickets</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-10 text-center"
        >
          <p className="text-white/30 text-[8px] font-bold uppercase tracking-[0.4em] leading-relaxed max-w-[300px] mx-auto">
            Pre Event Tickets Promo only valid between 10 Feb - 11 Feb. Deposit after this will return to 1 ticket each RM100 Deposit.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PreEventSection;
