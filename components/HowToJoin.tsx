import React from "react";
import { motion } from "framer-motion";

const HowToJoin: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-transparent relative">
      <div className="max-w-md mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-4">
            How To <span className="text-yellow-400 italic">Join</span>
          </h2>

          {/* ✅ changed from red to brand blue */}
          <p className="text-[#00A3FF] font-bold uppercase tracking-[0.2em] text-sm">
            Registration Steps
          </p>
        </motion.div>

        <div className="space-y-8">
          {[
            {
              step: 1,
              title: "Create Account",
              desc: "Quick registration with simple requirements.",
            },
            {
              step: 2,
              title: "Deposit RM50",
              desc: "Deposit RM50 to Get 88 Free Spins",
            },
            {
              step: 3,
              title: "Claim & Explore",
              desc: "Enjoy your 88 Free Spins and explore the 8 Immortals Treasure Event.",
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex items-center gap-8 bg-black/30 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/5"
            >
              <div className="w-16 h-16 bg-gradient-to-b from-yellow-300 to-yellow-600 rounded-2xl flex items-center justify-center text-[#1a0101] font-black text-2xl shadow-[0_0_20px_rgba(253,224,71,0.4)] flex-shrink-0">
                {s.step}
              </div>

              <div>
                <h3 className="text-white font-black text-xl uppercase tracking-tighter">
                  {s.title}
                </h3>

                {/* ✅ changed from red to brand blue */}
                <p className="text-[#00A3FF] text-sm font-bold uppercase tracking-wide leading-relaxed mt-2">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToJoin;
