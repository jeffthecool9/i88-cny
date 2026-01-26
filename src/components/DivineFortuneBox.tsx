import React from "react";
import { motion } from "framer-motion";

type FloatingAngpowProps = {
  delay?: number;
  x?: number; // px offset
  y?: number; // px offset
  scale?: number;
  size?: string; // tailwind text size
};

const FloatingAngpow: React.FC<FloatingAngpowProps> = ({
  delay = 0,
  x = 0,
  y = 0,
  scale = 1,
  size = "text-3xl",
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0.35, 1, 0.35],
      scale: [scale, scale * 1.15, scale],
      y: [y, y - 18, y],
      x: [x, x + 10, x],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
    className={`absolute pointer-events-none select-none z-0 ${size}`}
    style={{
      left: "50%",
      top: "50%",
      transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
    }}
  >
    🧧
  </motion.div>
);

const DivineFortuneBox: React.FC = () => {
  return (
    <section
      id="register-section"
      className="py-24 px-6 bg-transparent relative overflow-hidden"
    >
      {/* ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] h-96 bg-yellow-400/10 blur-[180px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, type: "spring", bounce: 0.35 }}
        className="max-w-lg mx-auto relative group"
      >
        <div className="relative bg-gradient-to-b from-[#FF0000] to-[#B00000] rounded-[4rem] border-8 border-yellow-400/50 p-12 md:p-16 text-center shadow-[0_30px_80px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Decorative Corners */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-[10px] border-l-[10px] border-yellow-400 rounded-tl-[3.5rem]" />
          <div className="absolute top-0 right-0 w-24 h-24 border-t-[10px] border-r-[10px] border-yellow-400 rounded-tr-[3.5rem]" />
          <div className="absolute bottom-0 left-0 w-24 h-24 border-b-[10px] border-l-[10px] border-yellow-400 rounded-bl-[3.5rem]" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-[10px] border-r-[10px] border-yellow-400 rounded-br-[3.5rem]" />

          {/* main angpow */}
          <motion.div
            initial={{ y: 18 }}
            animate={{ y: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="inline-block mb-10 relative"
          >
            <div className="text-[9rem] filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)]">
              🧧
            </div>
            <div className="absolute inset-0 bg-yellow-400 blur-[90px] opacity-35" />
          </motion.div>

          {/* headline (UPDATED) */}
          <div className="mb-10 leading-none tracking-tight uppercase flex flex-col items-center px-6 md:px-12">
            {/* GET YOUR (smaller) */}
            <div className="text-white drop-shadow-md text-4xl md:text-5xl font-black mb-2">
              GET YOUR
            </div>

            {/* RM38,888 (GOLD focus) */}
          <div
  className="
    my-2 text-6xl md:text-8xl font-black uppercase text-center
    px-4 md:px-6
    bg-[linear-gradient(90deg,#F9F295_0%,#E0AA3E_25%,#FAF398_50%,#B88A44_75%,#F9F295_100%)]
    bg-clip-text text-transparent
    drop-shadow-[0_8px_30px_rgba(0,0,0,0.55)]
  "
>
  RM38,888
</div>


            {/* NOW (white + smaller) */}
            <div className="text-white drop-shadow text-4xl md:text-5xl font-black mt-1">
              NOW
            </div>
          </div>

          {/* gold underline */}
          <div
            className="
              mx-auto mb-12
              w-36 md:w-44 h-2 rounded-full
              bg-[linear-gradient(90deg,#F9F295,#E0AA3E,#FAF398,#B88A44)]
              shadow-[0_0_28px_rgba(250,204,21,0.7)]
            "
          />

          {/* CTA */}
          <div className="relative group max-w-md mx-auto h-32 flex items-center justify-center">
            {/* Floating Angpows (balanced) */}
            <FloatingAngpow delay={0} x={-180} y={-70} scale={1.15} size="text-4xl" />
            <FloatingAngpow delay={1} x={180} y={-60} scale={0.9} />
            <FloatingAngpow delay={0.5} x={-220} y={20} scale={1.05} />
            <FloatingAngpow delay={1.5} x={210} y={40} scale={1.1} size="text-4xl" />
            <FloatingAngpow delay={2} x={-40} y={-95} scale={0.75} />
            <FloatingAngpow delay={0.8} x={50} y={95} scale={0.85} />

            {/* GOLD glow behind CTA */}
            <div className="absolute -inset-6 bg-gradient-to-r from-[#fff6cc] via-[#facc15] to-[#d97706] rounded-[2.2rem] blur-3xl opacity-15 group-hover:opacity-40 transition duration-500" />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                relative w-full py-6
                bg-gradient-to-b from-[#FF2A2A] via-[#D40000] to-[#8B0000]
                text-white font-black text-2xl
                rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.45)]
                transition-all uppercase tracking-tighter
                border-b-8 border-[#5F0000] active:border-b-0 z-10
              "
            >
              REGISTER NOW 🧧
            </motion.button>
          </div>

          {/* subtle sparkles */}
          <div className="absolute inset-0 pointer-events-none opacity-35">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white w-1.5 h-1.5 rounded-full animate-ping"
                style={{
                  top: Math.random() * 100 + "%",
                  left: Math.random() * 100 + "%",
                  animationDelay: `${i * 0.55}s`,
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
