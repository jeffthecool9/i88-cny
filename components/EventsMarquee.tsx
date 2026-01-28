
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EVENT_CARDS = [
  {
    id: 'immortals',
    title: '8 Immortals CNY Journey',
    tag: 'Ongoing',
    desc: 'Collect festive rewards as you play throughout CNY.',
    anchor: 'how-to-join'
  },
  {
    id: 'onboarding',
    title: 'New Player: RM50/SGD50 → Unlock 100 Free Spins',
    tag: 'New',
    desc: 'Deposit RM50/SGD50 and unlock 100 Free Spins instantly.',
    anchor: 'instant-reward'
  },
  {
    id: 'drops',
    title: 'CNY Rewards & Surprise Drops',
    tag: 'Limited',
    desc: 'Extra festive rewards released across the CNY season.',
    anchor: 'how-to-join'
  }
];

const EventsMarquee: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Duplicate cards for seamless looping
  const marqueeItems = [...EVENT_CARDS, ...EVENT_CARDS, ...EVENT_CARDS];

  return (
    <section className="py-20 bg-gradient-to-b from-[#1a0101] to-[#2a0101] overflow-hidden border-y border-white/5">
      <div className="max-w-md mx-auto px-6 mb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[#FF0000] text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">
            Huat Ah! 恭喜发财
          </span>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
            Current Happening <span className="text-yellow-400 italic">Events</span>
          </h2>
        </motion.div>
      </div>

      <div className="relative group">
        {/* Decorative Side Fades */}
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#1a0101] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#1a0101] to-transparent z-20 pointer-events-none" />

        <motion.div
          className="flex gap-4 px-4"
          animate={shouldReduceMotion ? {} : { x: ['0%', '-33.33%'] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ width: 'fit-content' }}
          whileHover={!shouldReduceMotion ? { animationPlayState: 'paused' } : {}}
          whileTap={!shouldReduceMotion ? { animationPlayState: 'paused' } : {}}
        >
          {marqueeItems.map((card, idx) => (
            <div
              key={`${card.id}-${idx}`}
              className="w-[280px] flex-shrink-0 bg-[#350101] rounded-[2rem] p-6 border border-yellow-400/10 shadow-xl relative overflow-hidden group/card"
            >
              <div className="absolute inset-0 bg-paper-texture opacity-[0.03] pointer-events-none" />
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/5 blur-2xl rounded-full" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">
                    {card.tag}
                  </span>
                </div>
                
                <h3 className="text-white font-black text-sm uppercase tracking-tight leading-tight mb-2 min-h-[40px]">
                  {card.title}
                </h3>
                
                <p className="text-[#FF0000] text-[10px] font-bold uppercase tracking-wide leading-relaxed mb-6">
                  {card.desc}
                </p>

                <div className="mt-auto">
                  <button 
                    onClick={() => scrollToSection(card.anchor)}
                    className="text-[#FF0000]/60 text-[9px] font-black uppercase tracking-[0.3em] hover:text-yellow-400 transition-colors flex items-center gap-2 group-hover/card:translate-x-1 duration-300"
                  >
                    View Details ➔
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-md mx-auto px-6 mt-12 text-center">
         <p className="text-[#FF0000] text-[8px] font-black uppercase tracking-[0.4em]">
           Verified Regional Events • Trusted Service Since 2017
         </p>
      </div>
    </section>
  );
};

export default EventsMarquee;
