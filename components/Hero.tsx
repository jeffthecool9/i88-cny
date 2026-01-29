import React from "react";
import { motion, Variants } from "framer-motion";
import CountdownTimer, { trackEvent } from "./CountdownTimer.tsx";

const Hero: React.FC<{ onOpenTutorial: () => void }> = () => {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 12, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const handleCtaClick = () => {
    trackEvent("cta_click", { cta_id: "hero_register_main" });
    window.open("https://www.iclub88.com/register", "_blank");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-28 overflow-hidden bg-[#b10008]">
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#ff3b3b_0%,#c41111_45%,#7a0202_100%)]" />

        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[720px] rounded-full bg-[#ffd666]/25 blur-[120px]" />
        <div className="absolute -bottom-40 right-[-10%] w-[760px] h-[760px] rounded-full bg-[#ffd666]/20 blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'url("https://www.transparenttextures.com/patterns/rice-paper-2.png")',
          }}
        />
      </div>

      {/* ================= CONTENT ================= */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-xl px-6 text-center"
      >
        {/* Logo */}
        <motion.div variants={item} className="mb-8">
          <div className="inline-flex items-center justify-center px-6 py-2 rounded-2xl bg-white/8 backdrop-blur-xl border border-white/15">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Cloud9_logo.svg/2560px-Cloud9_logo.svg.png"
              alt="i88"
              className="h-10 w-auto brightness-110"
              draggable={false}
            />
          </div>
        </motion.div>

        {/* ================= TITLE ================= */}
        <motion.div variants={item} className="mb-10">
          <h1 className="text-7xl sm:text-8xl font-black leading-[0.9] tracking-tight flex flex-col items-center">
            {/* 八仙 */}
            <span className="text-white/95 italic tracking-wide drop-shadow-[0_0_18px_rgba(255,255,255,0.35)]">
              八仙
            </span>

            {/* 来财 — CLEAN */}
            <span className="laicai-goldclean">
              来财
            </span>
          </h1>

          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-10 bg-[#ffd666]/60" />
            <p className="text-white/85 font-black text-xs tracking-[0.45em] uppercase">
              Lunar Year 2026
            </p>
            <div className="h-px w-10 bg-[#ffd666]/60" />
          </div>

          <p className="mt-6 text-white/90 text-sm sm:text-base leading-relaxed max-w-[520px] mx-auto">
            Play with i88 and get rewarded instantly.  
            Try the demo spin below — claim your welcome reward after you register. 🧧✨
          </p>
        </motion.div>

        {/* Countdown */}
        <motion.div variants={item} className="mb-8">
          <CountdownTimer pageVariant="cny_visual_v2" />
        </motion.div>

        {/* CTA */}
        <motion.div variants={item} className="relative">
          <div
            className="absolute -inset-1 rounded-[2.5rem] blur-xl opacity-35"
            style={{
              background:
                "linear-gradient(90deg,#ffffff,#FAF398,#F9F295,#E0AA3E,#B88A44)",
            }}
          />
          <button
            onClick={handleCtaClick}
            className="relative w-full py-6 rounded-[2.2rem] font-black text-xl sm:text-2xl uppercase tracking-widest
                       shadow-[0_22px_60px_rgba(255,215,102,0.45)]
                       transition-transform hover:-translate-y-1 active:translate-y-0"
            style={{
              background:
                "linear-gradient(180deg,#ffffff 0%,#FAF398 20%,#F9F295 45%,#E0AA3E 75%,#B88A44 100%)",
              color: "#7a0202",
            }}
          >
            Pre-Register Now
          </button>
        </motion.div>
      </motion.div>

      {/* ================= STYLES ================= */}
      <style>{`
        .laicai-goldclean{
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

          /* ONE thick, clean outline only */
          -webkit-text-stroke: 3px rgba(255,255,255,0.95);
          paint-order: stroke fill;

          /* Gold + white glow ONLY */
          text-shadow:
            0 0 14px rgba(255,255,255,0.25),
            0 0 26px rgba(250,243,152,0.25),
            0 0 36px rgba(224,170,62,0.18);

          letter-spacing: 0.02em;
        }
      `}</style>
    </section>
  );
};

export default Hero;
