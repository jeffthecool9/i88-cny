import React from "react";
import { motion, Variants } from "framer-motion";
import CountdownTimer, { trackEvent } from "./CountdownTimer.tsx";

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
    window.open("https://www.iclub88.com/register", "_blank");
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* ✅ Background image (your public file) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/cny-bg.png"
          alt="CNY Background"
          className="w-full h-full object-cover object-[center_65%]"
          draggable={false}
        />

        {/* ✅ Make background more visible but keep text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/35" />

        {/* ✅ Extra contrast behind top text only */}
        <div className="absolute top-0 left-0 right-0 h-[55%] bg-gradient-to-b from-black/35 via-black/10 to-transparent" />

        {/* ✅ subtle texture (optional, keeps premium look) */}
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              'url("https://www.transparenttextures.com/patterns/rice-paper-2.png")',
          }}
        />
      </div>

      {/* ✅ Content (push up so CTA has space) */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-xl mx-auto
                   pt-24 pb-64"
      >
        {/* Logo */}
      <motion.div variants={item} className="mb-10">
  <img
    src="/android-chrome-192x192.png"
    alt="i88"
    className="h-14 sm:h-16 md:h-18 w-auto object-contain"
    draggable={false}
  />
</motion.div>



        {/* Title */}
        <motion.div variants={item} className="mb-7">
          <h1 className="text-7xl sm:text-8xl font-black leading-[0.85] uppercase tracking-tighter mb-3 flex flex-col items-center">
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

          <p className="mt-4 text-white/90 text-sm sm:text-base leading-relaxed max-w-[520px] mx-auto">
            Play with i88 and get rewarded instantly. Try the demo spin below and
            unlock your welcome reward after registration.
          </p>
        </motion.div>

        {/* ✅ Timer (slightly higher / tighter spacing) */}
        <motion.div variants={item} className="mb-2 w-full">
          <CountdownTimer pageVariant="cny_visual_v2" />
        </motion.div>
      </motion.div>

     {/* ✅ CTA pinned center + 50px lower */}
<motion.div
  variants={item}
  className="absolute left-1/2 -translate-x-1/2 translate-y-[50px] bottom-10 sm:bottom-12 z-20 w-[86%] max-w-[520px] group"
>
  <div
    className="absolute -inset-1 rounded-[2.5rem] blur-xl opacity-30 group-hover:opacity-45 transition duration-700"
    style={{
      background: "linear-gradient(90deg,#F9D976,#E0AA3E,#FAF398,#B88A44)",
    }}
  />
  <button
    onClick={handleCtaClick}
    className="relative w-full py-5 sm:py-6 rounded-[2.2rem] font-black text-lg sm:text-2xl uppercase tracking-widest
               shadow-[0_25px_60px_rgba(0,0,0,0.55)] transition-all transform hover:-translate-y-1 active:translate-y-1
               border-b-8"
    style={{
      background: "linear-gradient(180deg,#fff7cc,#FAF398,#F9D976,#E0AA3E,#B88A44)",
      color: "#7a0606",
      borderBottomColor: "#7a5a20",
    }}
  >
    Pre-Register Now
  </button>
</motion.div>

      {/* Styles */}
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
      `}</style>
    </section>
  );
};

export default Hero;
