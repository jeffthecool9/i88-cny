import React from "react";
import { motion } from "framer-motion";

const Mechanics: React.FC = () => {
  return (
    <section
      id="mechanics"
      className="py-24 px-6 relative bg-gradient-to-b from-[#D40000] to-[#990000] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-6 drop-shadow-2xl"
          >
            Weapon <span className="text-yellow-400">QUEST</span>
          </motion.h2>

          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-[3rem] shadow-2xl">
            <p className="text-white text-base md:text-xl font-bold uppercase tracking-tight leading-relaxed">
              Unlock the secrets of the Immortals.
              <span className="block mt-2 text-yellow-300">
                Collect all 8 weapons shown on the Scroll to claim your REAL CASH
                PRIZES
              </span>
            </p>
          </div>
        </div>

        {/* SCROLL CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative bg-gradient-to-b from-yellow-100 via-yellow-400 to-yellow-600 p-2 rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
            <div className="bg-[#8B0000] rounded-[3.2rem] overflow-hidden relative min-h-[260px] md:min-h-[320px] flex items-center justify-center">
              {/* Scroll Title Badge */}
              <div className="absolute top-6 md:top-7 left-1/2 -translate-x-1/2 z-10">
                <div
                  className="px-10 md:px-12 py-3 md:py-3.5 rounded-full
                             bg-gradient-to-b from-[#5c0000] to-[#2a0000]
                             border-2 border-yellow-400/60
                             shadow-[0_10px_30px_rgba(0,0,0,0.5)]
                             flex items-center justify-center"
                >
                  <span
                    className="block text-yellow-200
                               text-sm md:text-base
                               font-black uppercase
                               tracking-[0.35em]
                               text-center whitespace-nowrap"
                  >
                    WEAPONS COLLECTION
                  </span>
                </div>
              </div>

              {/* Scroll Image */}
              <img
                src="/scroll.png"
                alt="Weapons Collection Scroll"
                className="block w-[86%] max-w-[560px] h-auto object-contain mt-16 md:mt-20"
                draggable={false}
              />
            </div>
          </div>
        </motion.div>

       {/* PRIZE — GOLD FRAME & GOLD TEXT */}
<div className="mt-16 text-center">
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex justify-center mb-10"
  >
    <div
      className="
        relative inline-flex flex-col items-center justify-center
        px-12 py-6
        rounded-xl
        bg-gradient-to-r
        from-[#F9F295] via-[#E0AA3E] via-[#FAF398] to-[#B88A44]
        shadow-[0_12px_40px_rgba(224,170,62,0.55)]
      "
    >
      {/* inner card */}
      <div
        className="
          bg-[#fff8e1]
          px-10 py-5
          rounded-lg
          shadow-inner
          text-center
        "
      >
        <span className="block text-[#7a3e00] text-xl md:text-2xl font-black uppercase tracking-wide">
          GRAND PRIZE
        </span>

        <span
          className="
            block mt-1
            text-4xl md:text-5xl font-black
            bg-gradient-to-b
            from-[#F9F295] via-[#E0AA3E] to-[#B88A44]
            bg-clip-text text-transparent
            tracking-tight
          "
        >
          RM38,888
        </span>
      </div>
    </div>
  </motion.div>

  <p className="text-yellow-100/60 font-black text-xs md:text-sm uppercase tracking-[0.5em] mb-8">
    1 TICKET = 1 RANDOM UNLOCK &amp; GUARANTEED CASH
  </p>

  <button
    onClick={() =>
      document
        .getElementById("register-section")
        ?.scrollIntoView({ behavior: "smooth", block: "center" })
    }
    className="w-full max-w-sm py-6 bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 text-[#4a0101] rounded-[2rem] font-black text-2xl uppercase tracking-widest shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-b-8 border-[#854d0e] active:translate-y-2 active:border-b-0 transition-all hover:brightness-110"
  >
    Earn Tickets 🏮
  </button>
</div>

      </div>
    </section>
  );
};

export default Mechanics;
