import React from "react";
import { motion } from "framer-motion";

/* ✅ SAME CTA LOOK as InstantReward (after-win CTA block) */
const CTA_URL = "https://your-link-here.com"; // 🔴 CHANGE THIS

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
              desc: "Quick registration with simple requirements",
            },
            {
              step: 2,
              title: "Event Promotion",
              desc: "Deposit RM50 to Get 88 Free Spins",
            },
            {
              step: 3,
              title: "Claim & Explore",
              desc: "Enjoy your 88+100 in Total Free Spins! And explore the 8 Immortals Treasure Event",
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

        {/* ✅ NEW CTA BUTTON (same design as InstantReward post-win CTA) */}
       <motion.div
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.15 }}
  className="mt-12 text-center"
>
  {/* READY? */}
  <div className="text-[11px] tracking-[0.55em] uppercase font-black text-[#F9F295]/70 mb-4">
    READY?
  </div>

  {/* GOLD CTA BUTTON */}
  <a
    href={CTA_URL}
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center justify-center gap-3
               px-8 py-4 rounded-full goldButton
               hover:scale-[1.03] active:scale-[0.97]
               transition-transform"
  >
    <span className="text-[12px] sm:text-sm font-black tracking-[0.35em] uppercase text-black/90">
      Register Now
    </span>
    <span className="text-black/85 font-black">→</span>
  </a>
</motion.div>

      </div>

      {/* ✅ Styles (same as InstantReward) */}
      <style>{`
        .goldBorder{
          background: linear-gradient(90deg,#F9F295,#E0AA3E,#FAF398,#B88A44);
          box-shadow: 0 16px 60px rgba(0,0,0,0.45);
        }
        .winGoldHeadline{
          background: linear-gradient(180deg,#fff,#FAF398 18%,#F9F295 42%,#E0AA3E 72%,#B88A44);
          -webkit-background-clip:text;
          background-clip:text;
          color:transparent;
          text-shadow: 0 0 18px rgba(253,224,71,0.25), 0 10px 34px rgba(0,0,0,0.7);
        }
        .goldButton{
          background: linear-gradient(90deg,#F9F295,#E0AA3E,#FAF398,#B88A44);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.65), 0 12px 40px rgba(0,0,0,0.45);
          border: 1px solid rgba(0,0,0,0.15);
        }
      `}</style>
    </section>
  );
};

export default HowToJoin;
