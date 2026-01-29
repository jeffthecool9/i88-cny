import React from "react";
import { motion, Variants } from "framer-motion";
import CountdownTimer, { trackEvent } from "./CountdownTimer.tsx";

const Hero: React.FC<{ onOpenTutorial: () => void }> = ({ onOpenTutorial }) => {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.12 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 10, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  const handleCtaClick = () => {
    trackEvent("cta_click", { cta_id: "hero_register_main" });
    window.open("https://www.iclub88.com/register", "_blank");
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-28 overflow-hidden bg-[#4a0101]">
      {/* ========= Background / CNY vibe ========= */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* rich red base */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,#ff2b2b_0%,#b90f15_42%,#450101_100%)]" />
        {/* hot glow bursts */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[720px] rounded-full bg-[#ff1f2d]/20 blur-[110px]" />
        <div className="absolute -bottom-40 right-[-10%] w-[760px] h-[760px] rounded-full bg-[#f9df9d]/10 blur-[140px]" />
        <div className="absolute -bottom-52 left-[-15%] w-[720px] h-[720px] rounded-full bg-[#ff1f2d]/15 blur-[160px]" />

        {/* texture */}
        <div
          className="absolute inset-0 opacity-[0.10] mix-blend-overlay"
          style={{
            backgroundImage:
              'url("https://www.transparenttextures.com/patterns/rice-paper-2.png")',
          }}
        />

        {/* subtle floating dust */}
        <motion.div
          animate={{ y: [-18, 18], x: [-10, 10], opacity: [0.10, 0.22, 0.10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/dust.png')",
          }}
        />
      </div>

      {/* ========= Content ========= */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-xl"
      >
        {/* Logo */}
        <motion.div variants={item} className="mb-9">
          <div className="h-14 w-auto px-6 py-2 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl flex items-center justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Cloud9_logo.svg/2560px-Cloud9_logo.svg.png"
              alt="i88"
              className="h-full w-auto filter brightness-110"
              draggable={false}
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div variants={item} className="mb-10">
          <h1 className="text-7xl sm:text-8xl font-black leading-[0.85] uppercase tracking-tighter mb-4 flex flex-col items-center">
            {/* 八仙 — soft clean white */}
            <span className="block text-white/95 italic drop-shadow-[0_0_18px_rgba(255,255,255,0.5)]">
              八仙
            </span>

            {/* 来财 — CLEAN premium (no messy white outline) */}
            <span className="block laicai-clean">来财</span>
          </h1>

          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-10 bg-yellow-300/45" />
            <p className="text-[#ffd3d3] font-black text-xs uppercase tracking-[0.45em]">
              Lunar Year 2026
            </p>
            <div className="h-px w-10 bg-yellow-300/45" />
          </div>

          <p className="mt-5 text-white/85 text-sm sm:text-base leading-relaxed max-w-[520px] mx-auto">
            Play with i88 and get rewarded instantly. Try the demo spin below —
            claim your welcome reward after you register. 🧧✨
          </p>
        </motion.div>

        {/* Countdown */}
        <motion.div variants={item} className="mb-8 w-full">
          <CountdownTimer pageVariant="cny_visual_v2" />
        </motion.div>

        {/* CTA */}
        <motion.div variants={item} className="w-full relative group">
          <div
            className="absolute -inset-1 rounded-[2.5rem] blur-xl opacity-25 group-hover:opacity-45 transition duration-700"
            style={{
              background:
                "linear-gradient(90deg, rgba(249,242,149,0.55), rgba(224,170,62,0.55), rgba(250,243,152,0.55), rgba(184,138,68,0.55))",
            }}
          />
          <button
            onClick={handleCtaClick}
            className="relative w-full py-6 rounded-[2.2rem] font-black text-xl sm:text-2xl uppercase tracking-widest
                       shadow-[0_25px_60px_rgba(0,0,0,0.55)] transition-all transform hover:-translate-y-1 active:translate-y-1
                       border-b-8"
            style={{
              background:
                "linear-gradient(180deg, #ffffff 0%, #FAF398 18%, #F9F295 42%, #E0AA3E 72%, #B88A44 100%)",
              color: "#4a0101",
              borderBottomColor: "#6a4f1a",
            }}
          >
            Pre-Register Now
          </button>
        </motion.div>
      </motion.div>

      {/* ✅ Local styles to keep it single-file */}
      <style>{`
        .laicai-clean{
          /* premium gold fill */
          background: linear-gradient(
            180deg,
            #ffffff 0%,
            #FAF398 18%,
            #F9F295 42%,
            #E0AA3E 72%,
            #B88A44 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;

          /* IMPORTANT: remove thick white outline that causes messy edges */
          -webkit-text-stroke: 0px transparent;

          /* controlled depth */
          text-shadow:
            0 14px 28px rgba(0,0,0,0.55),
            0 0 18px rgba(224,170,62,0.18);

          /* keep it crisp */
          letter-spacing: 0.02em;
        }

        /* optional: tiny rim highlight without chaos (subtle, not white) */
        @supports (-webkit-text-stroke: 1px black) {
          .laicai-clean{
            -webkit-text-stroke: 1px rgba(106,79,26,0.22);
            paint-order: stroke fill;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
