import React from "react";
import { motion } from "framer-motion";

type FloatingAngpowProps = {
  delay?: number;
  x?: number;
  y?: number;
  scale?: number;
  size?: string;
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
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* 🌟 PREMIUM BACKGROUND (NO MORE DARK VOID) */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Red silk base */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#c30000_0%,#7a0000_45%,#2a0000_100%)]" />

        {/* Center gold aura */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.35)_0%,rgba(250,204,21,0.15)_30%,transparent_65%)] blur-[90px]" />

        {/* Left gold ambience */}
        <div className="absolute left-[-20%] top-1/2 -translate-y-1/2 w-[70%] h-[90%]
                        bg-[radial-gradient(circle,#facc15_0%,transparent_70%)]
                        opacity-25 blur-[140px]" />

        {/* Right gold ambience */}
        <div className="absolute right-[-20%] top-1/2 -translate-y-1/2 w-[70%] h-[90%]
                        bg-[radial-gradient(circle,#facc15_0%,transparent_70%)]
                        opacity-25 blur-[140px]" />

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          {[...Array(18)].map((_, i) => (
            <span
              key={i}
              className="absolute w-2 h-2 rounded-full bg-yellow-300 animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>

        {/* Soft vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,0.35)_100%)]" />
      </div>

      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88, rotate: -2 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, type: "spring", bounce: 0.35 }}
        className="max-w-lg mx-auto relative"
      >
        <div className="relative bg-gradient-to-b from-[#ff0000] to-[#b00000]
                        rounded-[4rem] border-8 border-yellow-400/50
                        p-12 md:p-16 text-center
                        shadow-[0_40px_90px_rgba(0,0,0,0.6)] overflow-hidden">

          {/* Angpow icon */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mb-10 relative"
          >
            <div className="text-[9rem] drop-shadow-[0_15px_20px_rgba(0,0,0,0.4)]">
              🧧
            </div>
            <div className="absolute inset-0 bg-yellow-400 blur-[90px] opacity-35" />
          </motion.div>

          {/* HEADLINE */}
          <div className="mb-10 uppercase tracking-tight flex flex-col items-center">
            <div className="text-white text-4xl md:text-5xl font-black mb-2">
              GET YOUR
            </div>

            <div
              className="
                my-2 text-6xl md:text-8xl font-black text-center
                px-4
                bg-[linear-gradient(90deg,#F9F295_0%,#E0AA3E_25%,#FAF398_50%,#B88A44_75%,#F9F295_100%)]
                bg-clip-text text-transparent
                drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)]
              "
            >
              RM38,888
            </div>

            <div className="text-white text-4xl md:text-5xl font-black mt-1">
              NOW
            </div>
          </div>

          {/* GOLD UNDERLINE */}
          <div
            className="
              mx-auto mb-12
              w-36 md:w-44 h-2 rounded-full
              bg-[linear-gradient(90deg,#F9F295,#E0AA3E,#FAF398,#B88A44)]
              shadow-[0_0_28px_rgba(250,204,21,0.7)]
            "
          />

          {/* CTA */}
          <div className="relative max-w-md mx-auto h-32 flex items-center justify-center">
            <FloatingAngpow delay={0} x={-180} y={-70} scale={1.15} size="text-4xl" />
            <FloatingAngpow delay={1} x={180} y={-60} scale={0.9} />
            <FloatingAngpow delay={0.5} x={-220} y={20} scale={1.05} />
            <FloatingAngpow delay={1.5} x={210} y={40} scale={1.1} size="text-4xl" />

            <div className="absolute -inset-6 bg-gradient-to-r from-[#fff6cc] via-[#facc15] to-[#d97706]
                            rounded-[2.5rem] blur-3xl opacity-20" />

            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="
                relative w-full py-6
                bg-[linear-gradient(180deg,#F9F295,#E0AA3E,#B88A44)]
                text-[#8b0000] font-black text-2xl
                rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.45)]
                uppercase tracking-tight
                border-b-8 border-[#8b5a00] active:border-b-0
              "
            >
              REGISTER NOW 🧧
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default DivineFortuneBox;
