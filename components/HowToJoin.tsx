import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HowToJoin: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".join-step", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        x: (index) => index % 2 === 0 ? -100 : 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: "power4.out"
      });
      
      gsap.from(".join-title", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
        },
        y: 40,
        opacity: 0,
        duration: 1
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 bg-transparent relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="join-title text-5xl md:text-7xl font-black text-center mb-24 text-[#fde047] uppercase tracking-tighter drop-shadow-2xl">
          HOW TO JOIN
        </h2>

        <div className="grid gap-10">
          <div className="join-step flex flex-col md:flex-row items-center gap-10 bg-white/10 backdrop-blur-md p-10 rounded-[3.5rem] border-4 border-[#fde047]/30 shadow-2xl transition-all hover:border-[#fde047]/60 group">
            <div className="w-28 h-28 bg-gradient-to-br from-[#fde047] to-[#eab308] border-6 border-white rounded-[2.5rem] flex flex-shrink-0 items-center justify-center text-5xl font-black text-[#8b0000] shadow-[0_15px_30px_rgba(0,0,0,0.3)] animate-divine-float">1</div>
            <div className="text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tighter">Enter the Portal</h3>
              <p className="text-[#fde047] text-lg md:text-xl font-bold leading-tight uppercase tracking-tight">REGISTER AN ACCOUNT OR LOGIN INSTANTLY TO START YOUR DESTINY.</p>
            </div>
          </div>

          <div className="join-step flex flex-col md:flex-row items-center gap-10 bg-[#8b0000]/60 backdrop-blur-md p-10 rounded-[3.5rem] border-4 border-white/20 shadow-2xl transition-all hover:border-white/50 group">
            <div className="w-28 h-28 bg-white border-6 border-[#fde047] rounded-[2.5rem] flex flex-shrink-0 items-center justify-center text-5xl font-black text-[#8b0000] shadow-[0_15px_30px_rgba(0,0,0,0.3)] animate-divine-float" style={{ animationDelay: '0.3s' }}>2</div>
            <div className="text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tighter">Equip & Collect</h3>
              <p className="text-[#fde047] text-lg md:text-xl font-bold leading-tight uppercase tracking-tight">EARN TICKETS WITH EVERY DEPOSIT TO OPEN SACRED ANGPOWS.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToJoin;