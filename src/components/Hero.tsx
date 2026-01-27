import React from "react";
import { motion } from "framer-motion";

type HeroProps = {
  onOpenTutorial?: () => void;
};

const Hero: React.FC<HeroProps> = ({ onOpenTutorial }) => {
  return (
    <section className="relative min-h-[100svh] bg-gradient-to-b from-[#B30000] via-[#FF3B30] to-[#B30000] overflow-hidden">
      {/* soft clouds / glow blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-10 right-0 w-[520px] h-[520px] rounded-full bg-yellow-300/10 blur-3xl" />
        <div className="absolute bottom-0 left-10 w-[520px] h-[520px] rounded-full bg-orange-300/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-10 pb-24 flex flex-col items-center text-center">
        {/* ✅ BIG LOGO BLOCK */}
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mx-auto mb-8 w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center justify-center"
        >
          <img
            src="/i88-logo.png"
            alt="i88 Logo"
            className="w-4/5 h-4/5 object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            loading="eager"
          />
        </motion.div>

        {/* Main Title Card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
          className="w-full max-w-[720px]"
        >
          <div className="mx-auto w-full rounded-[2.6rem] bg-red-600/40 border-4 border-yellow-300/70 shadow-[0_35px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl px-8 py-10">
            <div className="text-yellow-200 font-black tracking-[0.25em] text-[11px] uppercase mb-4">
              CNY 2026 • Malaysia
            </div>

            <h1 className="font-black leading-none tracking-tight">
              <span className="block text-[72px] md:text-[90px] text-yellow-200 drop-shadow-[0_10px_0_rgba(120,0,0,0.35)]">
                八仙
              </span>
              <span className="block text-[72px] md:text-[90px] text-white drop-shadow-[0_10px_0_rgba(120,0,0,0.35)] mt-2">
                来财
              </span>
            </h1>

            <div className="mt-10">
              <div className="mx-auto inline-flex items-center justify-center rounded-2xl bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 px-10 py-5 text-[#4a0101] font-black uppercase tracking-[0.25em] text-sm shadow-xl border-b-8 border-yellow-900/60">
                8 IMMORTALS TREASURE
              </div>
            </div>

            <p className="mt-8 text-white/85 font-bold text-sm md:text-base max-w-xl mx-auto">
              Collect the 8 Immortal Treasures, unlock massive rewards, and test your luck with the
              Angpow Demo 🧧
            </p>

            <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  // ✅ Scroll to Weapon Quest (Mechanics section)
                  const el = document.getElementById("mechanics");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="w-full md:w-auto px-10 py-5 rounded-2xl bg-gradient-to-b from-[#fde047] via-[#eab308] to-[#854d0e] text-[#2a0101] font-black uppercase tracking-widest shadow-[0_25px_70px_rgba(0,0,0,0.5)] border-b-8 border-[#4a2a00] active:translate-y-1 active:border-b-0 transition-all"
              >
                Go To Event 🏮
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => onOpenTutorial?.()}
                className="w-full md:w-auto px-10 py-5 rounded-2xl bg-white/10 text-white font-black uppercase tracking-widest border border-white/20 backdrop-blur-xl hover:bg-white/15 transition-all"
              >
                How It Works? 🧧
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom ticker */}
      <div className="absolute bottom-0 w-full bg-[#3d0101] text-yellow-300 py-5 font-black text-[10px] uppercase z-20 border-t-2 border-yellow-400/20 tracking-[0.2em]">
        <div className="overflow-hidden">
          <div className="whitespace-nowrap animate-[marquee_14s_linear_infinite]">
            <span className="mx-6">八仙来财 • 8 Immortals Treasure • CNY 2026 •</span>
            <span className="mx-6">Collect weapons to unlock RM38888 • Angpow Demo •</span>
            <span className="mx-6">Malaysia • Singapore • Limited Time Event •</span>
            <span className="mx-6">八仙来财 • 8 Immortals Treasure • CNY 2026 •</span>
          </div>
        </div>
      </div>

      {/* marquee keyframes */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
