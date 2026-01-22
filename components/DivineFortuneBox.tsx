
import React from 'react';
import { motion } from 'framer-motion';

const FloatingAngpow = ({ delay = 0, x = 0, y = 0, scale = 1 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.4, 1, 0.4],
      scale: [scale, scale * 1.2, scale],
      y: [y, y - 20, y],
      x: [x, x + 10, x]
    }}
    transition={{ 
      duration: 4, 
      repeat: Infinity, 
      delay,
      ease: "easeInOut"
    }}
    className="absolute text-3xl pointer-events-none select-none z-0"
    style={{ left: `${50 + x}%`, top: `${50 + y}%` }}
  >
    🧧
  </motion.div>
);

const DivineFortuneBox: React.FC = () => {
  return (
    <section id="register-section" className="py-24 px-6 bg-transparent relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-96 bg-yellow-400/10 blur-[180px] rounded-full pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, type: "spring", bounce: 0.4 }}
        className="max-w-lg mx-auto relative group"
      >
        <div className="relative bg-gradient-to-b from-[#FF0000] to-[#B00000] rounded-[4rem] border-8 border-yellow-400/50 p-12 md:p-16 text-center shadow-[0_30px_80px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Decorative Corners */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-[10px] border-l-[10px] border-yellow-400 rounded-tl-[3.5rem]"></div>
          <div className="absolute top-0 right-0 w-24 h-24 border-t-[10px] border-r-[10px] border-yellow-400 rounded-tr-[3.5rem]"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 border-b-[10px] border-l-[10px] border-yellow-400 rounded-bl-[3.5rem]"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-[10px] border-r-[10px] border-yellow-400 rounded-br-[3.5rem]"></div>

          <motion.div 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="inline-block mb-10 relative"
          >
            <div className="text-[9rem] filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)]">🧧</div>
            <div className="absolute inset-0 bg-yellow-400 blur-[80px] opacity-40"></div>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-none tracking-tighter uppercase flex flex-col items-center">
            <span className="text-white drop-shadow-md">Get Your</span>
            <span className="text-yellow-300 drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)] scale-110">RM38,888 NOW</span>
          </h2>

          <div className="w-32 h-1.5 bg-yellow-300 mx-auto mb-8 rounded-full"></div>
        

          {/* Integrated CTA Section from Footer */}
          <div className="relative group max-w-md mx-auto h-32 flex items-center justify-center">
            {/* Surrounding Animated Angpows */}
            <FloatingAngpow delay={0} x={-60} y={-40} scale={1.2} />
            <FloatingAngpow delay={1} x={65} y={-35} scale={0.8} />
            <FloatingAngpow delay={0.5} x={-75} y={10} scale={1} />
            <FloatingAngpow delay={1.5} x={70} y={25} scale={1.1} />
            <FloatingAngpow delay={2} x={-10} y={-55} scale={0.7} />
            <FloatingAngpow delay={0.8} x={15} y={45} scale={0.9} />

            {/* Enhanced Red Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-2xl blur-2xl opacity-10 group-hover:opacity-40 transition duration-500"></div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-full py-6 bg-gradient-to-b from-[#FF2222] via-[#D40000] to-[#8B0000] text-white font-black text-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all uppercase tracking-tighter border-b-8 border-[#5F0000] active:border-b-0 z-10"
            >
              REGISTER NOW 🧧
            </motion.button>
          </div>

          <div className="absolute inset-0 pointer-events-none opacity-40">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className="absolute bg-white w-1.5 h-1.5 rounded-full animate-ping"
                style={{
                  top: Math.random() * 100 + '%',
                  left: Math.random() * 100 + '%',
                  animationDelay: `${i * 0.7}s`,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default DivineFortuneBox;
