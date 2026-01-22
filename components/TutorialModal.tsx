import React, { useState, useEffect } from 'react';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [

   {
    title: "Event Details",
    description: "Earn tickets with every deposits, ticket is use to unlock Divine Weapons",
    icon: "🧧",
    accent: "border-[#ef4444]",
    animation: "animate-icon-heartbeat",
    aura: "animate-aura-red bg-red-600/40"
  },

  {
    title: "Event Details",
    description: "Collect Each Weapon with Guarantee Cash Prizes",
    icon: "⚔️",
    accent: "border-[#3b82f6]",
    animation: "animate-icon-clash",
    aura: "animate-aura-blue bg-blue-600/40"
  },
 
  {
    title: "Event Details",
    description: "Collect All 8 Divine Weapons to get up to RM38,888",
    icon: "🏆",
    accent: "border-[#eab308]",
    animation: "animate-icon-divine-shine",
    aura: "animate-aura-gold bg-[#eab308]/40"
  }
];

const TutorialModal: React.FC<TutorialModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentStep(0);
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const skipTutorial = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#000814]/95 backdrop-blur-xl">
      <div className={`relative w-full max-w-lg bg-[#000814] rounded-[3rem] border-4 ${steps[currentStep].accent} p-8 md:p-12 text-center shadow-[0_0_80px_rgba(0,0,0,0.8)] transition-all duration-500 overflow-hidden`}>
        
        {/* Step Indicator */}
        <div className="flex justify-center gap-2 mb-12">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'w-8 bg-[#eab308]' : 'w-2 bg-white/20'}`}
            />
          ))}
        </div>

        {/* Enhanced Animated Icon Section */}
        <div className="relative z-10 mb-10 h-40 flex items-center justify-center">
          {/* Celestial Aura Background */}
          <div className={`absolute w-32 h-32 rounded-full blur-2xl opacity-40 mix-blend-screen transition-all duration-700 ${steps[currentStep].aura}`}></div>
          
          {/* Main Icon with Sync Animation */}
          <div 
            className={`text-8xl md:text-9xl relative transition-all duration-500 
                        drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] 
                        drop-shadow-[0_0_25px_rgba(234,179,8,0.2)] 
                        ${steps[currentStep].animation}`}
          >
            {steps[currentStep].icon}
          </div>
        </div>

        <h2 className="text-3xl md:text-5xl font-black text-[#eab308] mb-6 uppercase tracking-tighter leading-tight drop-shadow-lg">
          {steps[currentStep].title}
        </h2>

        <p className="text-white/80 text-sm md:text-xl font-medium leading-relaxed mb-12 min-h-[90px] px-4">
          {steps[currentStep].description}
        </p>

        {/* Buttons (Reverted to Gold) */}
        <div className="flex flex-col gap-4">
          <button 
            onClick={nextStep}
            className="w-full py-5 bg-gradient-to-b from-[#fde047] via-[#eab308] to-[#854d0e] text-[#2a0101] font-black rounded-2xl text-xl uppercase tracking-widest shadow-xl border-b-6 border-[#4a2a00] active:translate-y-1 active:border-b-0 transition-all"
          >
            {currentStep === steps.length - 1 ? "Start Journey 🏮" : "Next Step"}
          </button>
          
          <button 
            onClick={skipTutorial}
            className="text-white/30 hover:text-white/60 font-black text-xs uppercase tracking-[0.4em] transition-colors py-2"
          >
            Skip Tutorial
          </button>
        </div>

        {/* Static Background Flare (Subtle Corner Glow) */}
        <div className={`absolute -bottom-32 -right-32 w-80 h-80 rounded-full blur-[120px] opacity-10 transition-colors duration-1000 pointer-events-none ${currentStep === 0 ? 'bg-blue-600' : currentStep === 1 ? 'bg-red-600' : 'bg-[#eab308]'}`}></div>
      </div>
    </div>
  );
};

export default TutorialModal;