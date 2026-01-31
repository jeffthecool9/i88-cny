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
    <section className="relative h-[100dvh] w-full overflow-hidden">
      {/* ===== Background image ===== */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/cny-bg.png"
          alt="CNY Background"
          className="w-full h-full object-cover brightness-105 contrast-105"
          draggable={false}
        />
        {/* Added a slight gradient at the very bottom to help the button pop off the floor */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)70%,rgba(0,0,0,0.4)100%)]" />
      </div>

      {/* ===== Main Content Container ===== */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-xl px-5
                   h-full flex flex-col justify-between"
      >
        
        {/* ===== TOP CONTENT GROUP ===== */}
        <div className="pt-4 sm:pt-6 text-center flex flex-col items-center">
          {/* Logo */}
          <motion.div variants={item} className="mb-2">
            <img
              src="/android-chrome-192x192.png"
              alt="i88"
              className="h-16 sm:h-20 w-auto object-contain"
              draggable={false}
            />
          </motion.div>

          {/* Title Area */}
          <motion.div variants={item} className="w-full">
            <h1 className="text-6xl sm:text-7xl font-black leading-[0.85] uppercase tracking-tighter flex flex-col items-center">
              <span className="block text-white/95 filter drop-shadow-lg">八仙</span>
              <span className="laicai-gold-flat">来财</span>
            </h1>

            <div className="mt-2 flex items-center justify-center gap-3 opacity-90">
              <div className="h-px w-8 bg-[#F9D976]/50" />
              <p className="text-[#fff3d6] font-bold text-[10px] sm:text-xs uppercase tracking-[0.35em] text-shadow-sm">
                8 Immortals Treasure
              </p>
              <div className="h-px w-8 bg-[#F9D976]/50" />
            </div>

            <p className="mt-3 text-sm leading-tight max-w-[340px] mx-auto heroGoldCopy">
              Play with i88 and get rewarded instantly. Try the demo spin below and
              unlock your welcome reward.
            </p>
          </motion.div>

          {/* Timer situated below text */}
          <motion.div variants={item} className="mt-5 w-full flex justify-center">
            <div className="scale-[0.9] sm:scale-100 origin-top">
               <CountdownTimer pageVariant="cny_visual_v2" />
            </div>
          </motion.div>
        </div>

        {/* ===== MIDDLE SPACER ===== */}
        <div className="flex-grow" /> 

        {/* ===== BOTTOM DOCK (Pushed lower) ===== */}
        {/* ✅ CHANGE HERE: Reduced padding from pb-8 to pb-4 to move button down */}
        <div className="pb-4 sm:pb-5 w-full flex flex-col items-center">
          
          {/* CTA Button */}
          <motion.div variants={item} className="w-full flex justify-center">
            <div className="relative w-[90%] sm:w-[80%]">
              <div
                className="absolute -inset-1 rounded-[2.6rem] blur-xl opacity-30 hover:opacity-45 transition duration-700"
                style={{
                  background:
                    "linear-gradient(90deg,#F9D976,#E0AA3E,#FAF398,#B88A44)",
                }}
              />
              <button
                onClick={handleCtaClick}
                className="relative w-full py-5 sm:py-6 rounded-[2.6rem]
                           font-black text-xl sm:text-2xl uppercase tracking-widest
                           shadow-[0_10px_30px_rgba(0,0,0,0.6)]
                           transition-transform hover:-translate-y-1 active:translate-y-1
                           border-b-[6px]"
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
          text-shadow:
            0 0 14px rgba(250,217,118,0.35),
            0 0 36px rgba(224,170,62,0.25);
          letter-spacing: 0.02em;
        }

        .heroGoldCopy{
          color: rgba(255, 244, 214, 0.95);
          text-shadow: 0 1px 4px rgba(0,0,0,0.8);
        }

        .text-shadow-sm {
           text-shadow: 0 1px 3px rgba(0,0,0,0.8);
        }
      `}</style>
    </section>
  );
};

export default Hero;
