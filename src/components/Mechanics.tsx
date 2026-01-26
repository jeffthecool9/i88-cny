import React from "react";
import { motion } from "framer-motion";

const Mechanics: React.FC = () => {
  return (
    <section
      id="mechanics"
      className="py-24 px-6 relative bg-gradient-to-b from-[#D40000] to-[#990000] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-6 drop-shadow-2xl"
        >
          Weapon <span className="text-yellow-400">QUEST</span>
        </motion.h2>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-[3rem] shadow-2xl">
          <p className="text-white text-base md:text-xl font-bold uppercase tracking-tight leading-relaxed">
            Unlock the secrets of the Immortals.
            <span className="block mt-2 text-yellow-300">
              Collect all 8 weapons shown on the Scroll to claim your REAL CASH PRIZES
            </span>
          </p>
        </div>

        <div className="mt-12">
          <div className="relative bg-gradient-to-b from-yellow-100 via-yellow-400 to-yellow-600 p-2 rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
            <div className="bg-[#8B0000] rounded-[3.2rem] overflow-hidden">
              <img
                src="/scroll.png"
                alt="The Sacred Scroll of 8 Immortals"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <button
            onClick={() =>
              document.getElementById("register-section")?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-12 w-full max-w-sm py-6 bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 text-[#4a0101] rounded-[2rem] font-black text-2xl uppercase tracking-widest shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-b-8 border-[#854d0e] active:translate-y-2 active:border-b-0 transition-all hover:brightness-110"
          >
            Earn Tickets 🏮
          </button>
        </div>
      </div>
    </section>
  );
};

export default Mechanics;
