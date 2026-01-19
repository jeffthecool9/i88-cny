import React, { useEffect, useRef } from 'react';
import { EVENT_DATES } from '../constants.ts';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DetailedChineseCloud = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 60" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M25,45 C15,45 10,38 10,30 C10,20 22,18 28,22 C32,10 50,8 58,18 C68,12 85,15 88,30 C95,32 95,45 82,48 C85,55 70,58 60,52 C55,58 35,58 25,45 Z" />
  </svg>
);

const Hero: React.FC<{ onOpenTutorial: () => void }> = ({ onOpenTutorial }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const char1Ref = useRef<HTMLSpanElement>(null);
  const char2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 300feetout-style Background Parallax
      gsap.to(bgRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      
      // Masked Rising Characters - Vertical Drift
      tl.from([char1Ref.current, char2Ref.current], {
        yPercent: 100,
        opacity: 0,
        rotate: (i) => i === 0 ? 3 : -3,
        duration: 1.6,
        stagger: 0.1,
        delay: 0.2
      });

      tl.from(".hero-reveal-line", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "power3.out"
      }, "-=1.2");

      tl.from(".hero-action", {
        scale: 0.95,
        opacity: 0,
        duration: 1.4,
        ease: "expo.out"
      }, "-=0.8");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100vh] flex flex-col items-center justify-start pt-16 pb-32 overflow-hidden bg-[#D40000]"
    >
      <div ref={bgRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-paper-texture">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FF2222]/20 via-transparent to-black/20"></div>
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[150%] h-[80%] rounded-full bg-yellow-400/20 blur-[120px] animate-[cosmic-pulse_8s_infinite]"></div>
        <div className="absolute inset-0 z-10 opacity-20 animate-rays">
          <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,#FDE047_15deg,transparent_30deg,#FDE047_45deg,transparent_60deg)]"></div>
        </div>
      </div>

      <div className="relative z-50 flex flex-col items-center text-center px-6 w-full">
        <div className="mb-8 relative group scale-[0.9] md:scale-100">
          <div className="absolute -top-12 -left-12 text-yellow-400/30 w-32 h-32 select-none pointer-events-none">
            <DetailedChineseCloud className="w-full h-full animate-pulse opacity-60" />
          </div>
          <div className="absolute -bottom-12 -right-12 text-yellow-400/30 w-32 h-32 select-none pointer-events-none">
            <DetailedChineseCloud className="w-full h-full animate-pulse opacity-60 rotate-180" />
          </div>

          <div className="relative p-1.5 rounded-[3rem] bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-700 shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
            <div className="bg-[#E60000] rounded-[2.8rem] px-10 py-12 relative overflow-hidden border-4 border-yellow-400/50">
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')]"></div>

              <h1 className="relative flex flex-col items-center font-black leading-tight">
                <div className="overflow-hidden inline-block">
                  <span ref={char1Ref} className="relative block text-[6rem] md:text-[8rem] text-yellow-300 drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)] tracking-tight">
                    八仙
                  </span>
                </div>
                <div className="overflow-hidden inline-block -mt-4">
                  <span ref={char2Ref} className="relative block text-[6.5rem] md:text-[8.5rem] text-white filter drop-shadow-[0_8px_8px_rgba(0,0,0,0.6)] tracking-tight">
                    来财
                  </span>
                </div>
              </h1>
            </div>
          </div>
        </div>
        
        <div className="hero-reveal-line w-full max-w-[340px] bg-gradient-to-b from-yellow-300 to-yellow-600 border-2 border-white/40 px-4 py-6 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] mb-8">
          <p className="text-[#8B0000] text-2xl font-black tracking-[0.15em] uppercase">
            8 IMMORTALS<br/>TREASURE
          </p>
        </div>

        <div className="hero-reveal-line w-full max-w-[320px] bg-black/30 backdrop-blur-md text-yellow-400 px-6 py-3 rounded-full font-black text-xs shadow-xl mb-6 border border-yellow-400/30 uppercase tracking-[0.15em]">
          {EVENT_DATES.full}
        </div>

        <button 
          onClick={onOpenTutorial}
          className="hero-reveal-line text-white font-black text-sm uppercase tracking-[0.3em] hover:text-yellow-400 transition-all mb-10 drop-shadow-lg underline decoration-yellow-400 underline-offset-8"
        >
          HOW TO PLAY?
        </button>

        <button 
          onClick={() => document.getElementById('mechanics')?.scrollIntoView({ behavior: 'smooth' })}
          className="hero-action w-full max-w-[300px] bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 text-[#4a0101] py-6 rounded-[2rem] font-black text-3xl uppercase tracking-tighter border-b-8 border-[#854d0e] shadow-[0_20px_50px_rgba(0,0,0,0.4)] active:translate-y-2 active:border-b-0 transition-all"
        >
          JOIN EVENT 🏮
        </button>
      </div>

      <div className="absolute bottom-0 w-full bg-[#3d0101] text-yellow-300 py-6 font-black text-[10px] uppercase z-50 border-t-2 border-yellow-400/20 tracking-[0.2em]">
        <div className="overflow-hidden">
          <div className="animate-marquee whitespace-nowrap">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="flex items-center gap-8 mx-4">
                <span>🏮 HUAT AH!</span>
                <span className="opacity-30">●</span>
                <span>STARTS {EVENT_DATES.start}</span>
                <span className="opacity-30">●</span>
                <span>COLLECT DIVINE WEAPONS</span>
                <span className="opacity-30">●</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;