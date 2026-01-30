import React from "react";
import { motion } from "framer-motion";

/* SAME CTA LOOK */
const CTA_URL = "https://www.palacehub8.com/LlZEMHit"; // 🔴 CHANGE THIS

const HowToJoin: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-transparent relative">
      <div className="max-w-md mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* GOLD TITLE */}
          <h2 className="text-5xl font-black uppercase tracking-tighter mb-4 goldText">
            How To <span className="italic">Join</span>
          </h2>

          {/* 🔵 BLUE stays BLUE */}
          <p className="text-[#00A3FF] font-bold uppercase tracking-[0.2em] text-sm">
            Registration Steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-8">
          {/* STEP 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-8 bg-black/30 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/5"
          >
            <div className="stepGold w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl flex-shrink-0">
              <span className="stepNum">1</span>
            </div>

            <div>
              <h3 className="goldText font-black text-xl uppercase tracking-tighter">
                Create Account
              </h3>
              <p className="text-[#00A3FF] text-sm font-bold uppercase tracking-wide leading-relaxed mt-2">
                Quick registration with simple requirements
              </p>
            </div>
          </motion.div>

          {/* STEP 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-8 bg-black/30 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/5"
          >
            <div className="stepGold w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl flex-shrink-0">
              <span className="stepNum">2</span>
            </div>

            <div>
              <h3 className="goldText font-black text-xl uppercase tracking-tighter">
                Event Promotion
              </h3>
              <p className="text-[#00A3FF] text-sm font-bold uppercase tracking-wide leading-relaxed mt-2">
                Deposit <span className="text-white">RM50</span> to Get{" "}
                <span className="text-white">88 Free Spins</span>
              </p>
            </div>
          </motion.div>

          {/* STEP 3 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-8 bg-black/30 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/5"
          >
            <div className="stepGold w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl flex-shrink-0">
              <span className="stepNum">3</span>
            </div>

            <div>
              <h3 className="goldText font-black text-xl uppercase tracking-tighter">
                Claim & Explore
              </h3>
              <p className="text-[#00A3FF] text-sm font-bold uppercase tracking-wide leading-relaxed mt-2">
                Enjoy your{" "}
                <span className="text-white">88+100 total free spins</span>! And
                explore the{" "}
                <span className="text-white">
                  8 Immortals Treasure Event
                </span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-14 text-center"
        >
          <div className="text-[11px] tracking-[0.55em] uppercase font-black text-[#F9F295]/70 mb-5">
            READY?
          </div>

          <a
            href={CTA_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3
                       px-9 py-4 rounded-full goldButton
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

      {/* STYLES */}
      <style>{`
        .goldText{
          background: linear-gradient(90deg,#F9F295,#E0AA3E,#FAF398,#B88A44);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow:
            0 2px 14px rgba(249,242,149,0.35),
            0 8px 30px rgba(0,0,0,0.75);
        }

        .stepGold{
          position: relative;
          background: linear-gradient(90deg,#F9F295,#E0AA3E,#FAF398,#B88A44);
          border: 1px solid rgba(0,0,0,0.22);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.55),
            0 0 28px rgba(249,242,149,0.32),
            0 0 70px rgba(224,170,62,0.28);
          overflow: hidden;
        }

        .stepGold::after{
          content:"";
          position:absolute;
          top:-30%;
          left:-70%;
          width:60%;
          height:160%;
          transform: rotate(18deg);
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.65) 50%,
            rgba(255,255,255,0) 100%
          );
          animation: stepShine 2.6s ease-in-out infinite;
        }

        @keyframes stepShine{
          0%{ left:-80%; opacity:0 }
          35%{ opacity:0.45 }
          100%{ left:120%; opacity:0 }
        }

        .stepNum{
          color: rgba(0,0,0,0.82);
          text-shadow: 0 1px 0 rgba(255,255,255,0.25);
        }

        .goldButton{
          background: linear-gradient(90deg,#F9F295,#E0AA3E,#FAF398,#B88A44);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.65),
            0 12px 40px rgba(0,0,0,0.45);
          border: 1px solid rgba(0,0,0,0.15);
        }
      `}</style>
    </section>
  );
};

export default HowToJoin;
