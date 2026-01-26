import React from "react";
import { motion } from "framer-motion";

const Mechanics: React.FC = () => {
  return (
    <section
      id="mechanics"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#D40000] to-[#990000] py-16"
    >
      {/* subtle texture (safe) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_55%)]" />

      {/* ✅ THIS is the "origin" container: narrow + centered */}
      <div className="relative mx-auto w-full max-w-[460px] px-4 sm:px-6">
        {/* HEADER */}
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white drop-shadow-2xl"
          >
            WEAPON <span className="text-yellow-300">QUEST</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            className="mt-5 rounded-[2.2rem] border border-white/20 bg-white/10 p-5 backdrop-blur-xl shadow-2xl"
          >
            <p className="text-sm sm:text-base font-extrabold uppercase leading-relaxed text-white">
              UNLOCK THE SECRETS OF THE IMMORTALS.
              <span className="mt-2 block text-yellow-200">
                Collect all 8 weapons shown on the Scroll to claim your REAL CASH
                PRIZES
              </span>
            </p>
          </motion.div>
        </div>

        {/* SCROLL CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
          className="mt-10 relative"
        >
          {/* glow */}
          <div className="absolute -inset-6 rounded-[3.2rem] bg-yellow-300/20 blur-[55px]" />

          <div className="relative rounded-[3rem] bg-gradient-to-b from-yellow-100 via-yellow-400 to-yellow-600 p-1.5 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
            <div className="relative overflow-hidden rounded-[2.7rem] bg-[#8B0000]">
              {/* label */}
              <div className="absolute top-4 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/20 bg-black/35 px-4 py-1 backdrop-blur-md">
                <span className="text-[10px] font-black uppercase tracking-[0.35em] text-white">
                  WEAPONS COLLECTION
                </span>
              </div>

              {/* ✅ Use local image from /public/scroll.png */}
              <img
                src="/scroll.png"
                alt="The Sacred Scroll of 8 Immortals"
                className="block w-full h-auto object-cover"
                loading="eager"
              />
            </div>
          </div>
        </motion.div>

        {/* PRIZE + CTA */}
        <div className="mt-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            className="relative mx-auto inline-block"
          >
            <div className="absolute -inset-7 rounded-full bg-white/20 blur-3xl" />
            <div className="relative rounded-[2.3rem] border-4 border-yellow-300 bg-white px-8 py-4 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
              <h3 className="text-3xl sm:text-4xl font-black uppercase leading-none tracking-tight text-[#D40000]">
                GRAND PRIZE
                <br />
                <span className="text-4xl sm:text-5xl">RM38,888</span>
              </h3>
            </div>
          </motion.div>

          <p className="mt-6 text-[10px] sm:text-xs font-black uppercase tracking-[0.45em] text-yellow-100/70">
            1 TICKET = 1 RANDOM UNLOCK &amp; GUARANTEED CASH
          </p>

          <button
            onClick={() =>
              document
                .getElementById("register-section")
                ?.scrollIntoView({ behavior: "smooth", block: "center" })
            }
            className="mt-6 w-full rounded-[2rem] bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 py-5 text-xl font-black uppercase tracking-widest text-[#4a0101] shadow-[0_18px_45px_rgba(0,0,0,0.5)] border-b-8 border-[#854d0e] active:translate-y-2 active:border-b-0 transition-all hover:brightness-110"
          >
            EARN TICKETS 🏮
          </button>
        </div>
      </div>
    </section>
  );
};

export default Mechanics;
