
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const PROMO_DATA = [
  {
    id: '8-immortals',
    type: 'EVENT',
    title: '8 Immortals',
    subtitle: 'The Divine Treasure',
    image: 'https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?auto=format&fit=crop&q=80&w=1000', 
    theme: 'dark',
    accentColor: '#FDE047',
    icon: '🧧'
  },
  {
    id: '100-spins',
    type: 'PROMO',
    title: 'Free 100 Spins',
    subtitle: 'Welcome Bonus Reveal',
    image: 'https://images.unsplash.com/photo-1518893063132-36e46dbe2428?auto=format&fit=crop&q=80&w=1000', 
    theme: 'light',
    accentColor: '#D40000',
    icon: '🎰'
  },
  {
    id: '8-immortals-2',
    type: 'EVENT',
    title: 'Ancient Luck',
    subtitle: 'Limited Time Seasonal',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1000', 
    theme: 'dark',
    accentColor: '#FDE047',
    icon: '✨'
  }
];

const PromosSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const marqueeItems = [...PROMO_DATA, ...PROMO_DATA, ...PROMO_DATA];

  return (
    <section className="py-24 bg-white overflow-hidden border-y border-gray-100">
      <div className="max-w-md mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4"
        >
          <div className="h-10 w-1.5 bg-[#D40000] rounded-full shadow-[0_0_10px_rgba(212,0,0,0.5)]" />
          <div>
            <h2 className="text-3xl font-black text-black uppercase tracking-tighter leading-none">
              Featured <br/> <span className="text-[#D40000] italic">Promos & Events</span>
            </h2>
          </div>
        </motion.div>
      </div>

      <div className="relative group">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

        <motion.div
          className="flex gap-6 px-4"
          animate={shouldReduceMotion ? {} : { x: ['0%', '-33.33%'] }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ width: 'fit-content' }}
          whileHover={!shouldReduceMotion ? { animationPlayState: 'paused' } : {}}
          whileTap={!shouldReduceMotion ? { animationPlayState: 'paused' } : {}}
        >
          {marqueeItems.map((item, idx) => (
            <motion.div
              key={`${item.id}-${idx}`}
              className="relative w-[320px] h-[340px] flex-shrink-0 rounded-[3rem] overflow-hidden shadow-2xl group/card cursor-pointer border border-gray-100"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
                />
                <div className={`absolute inset-0 ${item.theme === 'dark' ? 'bg-black/30' : 'bg-white/10'}`} />
              </div>

              <div className={`relative z-10 h-full w-full p-10 flex flex-col justify-between ${item.theme === 'dark' ? 'text-white' : 'text-black'}`}>
                <div className="flex justify-between items-start">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border-2 shadow-sm backdrop-blur-md transition-all
                    ${item.theme === 'dark' 
                      ? 'bg-black/50 border-yellow-400 text-yellow-400' 
                      : 'bg-white/70 border-[#D40000] text-[#D40000]'}`}>
                    {item.type}
                  </span>
                  <span className={`text-2xl drop-shadow-md ${item.theme === 'light' ? 'grayscale opacity-50' : ''}`}>
                    {item.icon}
                  </span>
                </div>

                <div>
                  <span className={`block text-[10px] font-black uppercase tracking-[0.4em] mb-2 ${item.theme === 'dark' ? 'text-[#FF0000]' : 'text-[#FF0000]'}`}>
                    {item.subtitle}
                  </span>
                  <h3 className={`text-4xl font-black uppercase tracking-tighter leading-none mb-8 ${item.theme === 'dark' ? 'drop-shadow-2xl' : 'drop-shadow-sm'}`}>
                    {item.title}
                  </h3>
                  
                  <button 
                    className={`flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.3em] transition-all
                      ${item.theme === 'dark' ? 'text-yellow-400 hover:text-white' : 'text-[#D40000] hover:text-black'}`}
                  >
                    View Details <span className="text-xs">➔</span>
                  </button>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover/card:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-md mx-auto mt-16 text-center">
        <p className="text-[#FF0000] text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">
          • Slide to explore the divine journey •
        </p>
      </div>
    </section>
  );
};

export default PromosSection;
