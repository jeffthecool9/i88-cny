import React from "react";
import { motion, Variants } from "framer-motion";
import CountdownTimer, { trackEvent } from "./CountdownTimer";

const Hero: React.FC<{ onOpenTutorial: () => void }> = () => {
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
    window.open("https://www.palacehub8.com/LlZEMHit", "_blank");
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* ===== Background image (public/cny-bg.png) ===== */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/cny-bg.png"
          alt="CNY Background"
          className="w-full h-full object-cover brightness-105 contrast-105"
          draggable={false}
        />

        {/* ✅ KEEP ORIGINAL BRIGHTNESS (NO black fade to bottom)
            Only a very light vignette to keep text readable. */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0.12)_55%,rgba(0,0,0,0.18)_100%)]" />
      </div>

      {/* ===== Main content (top) ===== */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-xl px-6 pt-10 sm:pt-12 text-center"
      >
        {/* Logo (bigger) */}
        <motion.div variants={item} className="flex justify-center mb-4">
          <img
            src="/android-chrome-192x192.png"
            alt="i88"
            className="h-20 sm:h-24 w-auto object-contain"
            draggable={false}
          />
        </motion.div>

        {/* Title */}
        <motion.div variants={item} className="mb-4">
          <h1 className="text-7xl sm:text-8xl font-black leading-[0.85] uppercase tracking-tighter flex flex-col items-center">
            <span className="block text-white/95">八仙</span>
            <span className="laicai-gold-flat">来财</span>
          </h1>

          <div className="mt-3 flex items-center justify-center gap-4">
            <div className="h-px w-10 bg-[#F9D976]/50" />
            <p className="text-[#fff3d6] font-black text-xs uppercase tracking-[0.45em]">
              8 Immortals Treasure
            </p>
            <div className="h-px w-10 bg-[#F9D976]/50" />
          </div>

          <p className="mt-4 text-white/90 text-sm sm:text-base leading-relaxed max-w-[520px] mx-auto">
            Play with i88 and get rewarded instantly. Try the demo spin below and
            unlock your welcome reward after registration.
          </p>
        </motion.div>
      </motion.div>

      {/* ===== Bottom dock (Timer + CTA) =====
          ✅ Correct placement: CTA sits directly below timer and stays near bottom
          with a clean gap — NO translate hacks that “don’t move”. */}
      <div className="absolute inset-x-0 bottom-10 sm:bottom-12 z-20">
        <div className="mx-auto w-full max-w-xl px-6 flex flex-col items-center">
          {/* Timer */}
          <motion.div variants={item} className="w-full flex justify-center mb-5">
            <CountdownTimer pageVariant="cny_visual_v2" />
          </motion.div>

          {/* CTA (centered, below timer, with bottom breathing space via bottom-10) */}
          <motion.div
            variants={item}
            className="w-full relative group flex justify-center"
          >
            <div className="relative w-[92%] sm:w-[86%]">
              <div
                className="absolute -inset-1 rounded-[2.6rem] blur-xl opacity-30 group-hover:opacity-45 transition duration-700"
                style={{
                  background:
                    "linear-gradient(90deg,#F9D976,#E0AA3E,#FAF398,#B88A44)",
                }}
              />
              <button
                onClick={handleCtaClick}
                className="relative w-full py-6 rounded-[2.6rem]
                           font-black text-xl sm:text-2xl uppercase tracking-widest
                           shadow-[0_25px_60px_rgba(0,0,0,0.55)]
                           transition-transform hover:-translate-y-1 active:translate-y-1
                           border-b-8"
                style={{
                  background:
                    "linear-gradient(180deg,#fff7cc,#FAF398,#F9D976,#E0AA3E,#B88A44)",
                  color: "#7a0606",
                  borderBottomColor: "#7a5a20",
                }}
              >
                Pre-Register Now
              </button>
            </div>
          </motion.div>
        </div>
      </div>

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
          text-shadow:
            0 0 14px rgba(250,217,118,0.35),
            0 0 36px rgba(224,170,62,0.25);
          letter-spacing: 0.02em;
        }
      `}</style>
    </section>
  );
};

export default Hero;
