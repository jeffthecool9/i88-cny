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
    <section className="relative min-h-screen overflow-hidden bg-[#b11212]">
      {/* ===== Background (your image) ===== */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: 'url("/cny-bg.png")',
            backgroundSize: "cover",
            backgroundPosition: "center 62%", // tune 58–68 if you want
          }}
        />

        {/* make image more visible (lighter overlay) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/35" />

        {/* subtle premium glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[720px] rounded-full bg-[#F9D976]/10 blur-[160px]" />
        <div className="absolute -bottom-40 right-[-10%] w-[760px] h-[760px] rounded-full bg-[#E0AA3E]/08 blur-[190px]" />

        {/* texture */}
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              'url("https://www.transparenttextures.com/patterns/rice-paper-2.png")',
          }}
        />
      </div>

      {/* ===== Content ===== */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 min-h-screen flex flex-col items-center text-center px-6 pt-20 pb-24 w-full max-w-xl mx-auto"
      >
        {/* Logo */}
        <motion.div variants={item} className="mb-7">
          <div className="px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
            <img
              src="/android-chrome-192x192.png"
              alt="i88"
              className="h-9 sm:h-11 w-auto object-contain"
              draggable={false}
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div variants={item} className="mb-5">
          <h1 className="text-7xl sm:text-8xl font-black leading-[0.85] uppercase tracking-tighter mb-4 flex flex-col items-center">
            <span className="block text-white/95">八仙</span>
            <span className="laicai-gold-flat">来财</span>
          </h1>

          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-10 bg-[#F9D976]/50" />
            <p className="text-[#fff3d6] font-black text-xs uppercase tracking-[0.45em]">
              Lunar Year 2026
            </p>
            <div className="h-px w-10 bg-[#F9D976]/50" />
          </div>

          <p className="mt-5 text-white/90 text-sm sm:text-base leading-relaxed max-w-[520px] mx-auto">
            Play with i88 and get rewarded instantly. Try the demo spin below and
            unlock your welcome reward after registration.
          </p>
        </motion.div>

        {/* Countdown (give it space, not blocking art) */}
        <motion.div variants={item} className="mb-6 w-full">
          <div className="countdownWrap">
            <CountdownTimer pageVariant="cny_visual_v2" />
          </div>
        </motion.div>

        {/* CTA is NOT in normal flow anymore. It's pinned. */}
      </motion.div>

      {/* ✅ CTA pinned exactly into BLUE band (lowest part with aesthetic gap) */}
      <motion.div
        variants={item}
        initial="hidden"
        animate="show"
        className="absolute left-1/2 -translate-x-1/2 z-30 w-[min(520px,92vw)] px-6 bottom-[110px] sm:bottom-[125px]"
      >
        <div
          className="absolute -inset-1 rounded-[2.2rem] blur-xl opacity-30 hover:opacity-45 transition duration-700"
          style={{
            background: "linear-gradient(90deg,#F9D976,#E0AA3E,#FAF398,#B88A44)",
          }}
        />
        <button
          onClick={handleCtaClick}
          className="relative w-full py-5 rounded-[2rem] font-black text-lg sm:text-xl uppercase tracking-wider
                     shadow-[0_22px_50px_rgba(0,0,0,0.55)] transition-all transform hover:-translate-y-1 active:translate-y-1
                     border-b-6"
          style={{
            background:
              "linear-gradient(180deg,#fff7cc,#FAF398,#F9D976,#E0AA3E,#B88A44)",
            color: "#7a0606",
            borderBottomColor: "#7a5a20",
          }}
        >
          Pre-Register Now
        </button>
      </motion.div>

      {/* ===== Styles ===== */}
      <style>{`
        .laicai-gold-flat {
          background: linear-gradient(
            180deg,
            #fff7cc 0%,
            #FAF398 20%,
            #F9D976 45%,
            #E0AA3E 75%,
            #B88A44 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-stroke: 0;
          text-stroke: 0;
          text-shadow:
            0 0 14px rgba(250,217,118,0.35),
            0 0 36px rgba(224,170,62,0.25);
          letter-spacing: 0.02em;
        }

        /* ✅ remove “UNTIL DIVINE UNSEALING” if CountdownTimer has a label class */
        .countdownWrap .until-divine-unsealing {
          display: none !important;
        }

        /* ✅ backup: if the subtitle is a <p> under the timer container, hide the last line */
        .countdownWrap p:last-child {
          display: none !important;
        }
      `}</style>
    </section>
  );
};

export default Hero;
