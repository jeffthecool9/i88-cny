import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_WEAPONS } from '../constants.ts';
import { GoogleGenAI } from "@google/genai";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- IndexedDB Utility ---
const DB_NAME = 'CNY_Artifacts_Cache';
const STORE_NAME = 'weapon_images';

const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const getStoredImage = async (key: string): Promise<string | null> => {
  try {
    const db = await initDB();
    return new Promise((resolve) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => resolve(null);
    });
  } catch (e) { return null; }
};

const saveStoredImage = async (key: string, value: string): Promise<void> => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(value, key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (e) { console.warn('Storage failed:', e); }
};

const removeWhiteBackground = (base64: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width; canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) { resolve(base64); return; }
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const dist = Math.sqrt((255 - r) ** 2 + (255 - g) ** 2 + (255 - b) ** 2);
        if (dist < 45) data[i + 3] = 0;
      }
      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => resolve(base64);
    img.src = base64;
  });
};

const CelestialHalo = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="absolute w-[80%] h-[80%] border border-yellow-400/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
    <div className="absolute w-[60%] h-[60%] bg-gradient-to-tr from-yellow-400/20 to-transparent rounded-full blur-xl animate-pulse"></div>
  </div>
);

const Mechanics: React.FC = () => {
  const [weapons, setWeapons] = useState(INITIAL_WEAPONS);
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set(INITIAL_WEAPONS.map(w => w.id)));
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generateWeaponImages = async () => {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      INITIAL_WEAPONS.map(async (weapon) => {
        try {
          const cacheKey = `artifact_v11_${weapon.id}`; 
          const cached = await getStoredImage(cacheKey);
          if (cached) {
            setWeapons(prev => prev.map(w => w.id === weapon.id ? { ...w, image: cached } : w));
            setLoadingIds(prev => { const next = new Set(prev); next.delete(weapon.id); return next; });
            return;
          }
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ text: `${weapon.icon}. Hyper-realistic, 3D high-fidelity render, solid white background, gold cinematic lighting.` }] },
            config: { imageConfig: { aspectRatio: "1:1" } }
          });
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              const transparentImg = await removeWhiteBackground(`data:image/png;base64,${part.inlineData.data}`);
              await saveStoredImage(cacheKey, transparentImg);
              setWeapons(prev => prev.map(w => w.id === weapon.id ? { ...w, image: transparentImg } : w));
              break;
            }
          }
        } catch (e) { console.error(e); }
        finally { setLoadingIds(prev => { const next = new Set(prev); next.delete(weapon.id); return next; }); }
      });
    };
    generateWeaponImages();

    // 300feetout Stagger Reveal
    const ctx = gsap.context(() => {
      gsap.from(".artifact-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        },
        y: 60,
        opacity: 0,
        scale: 0.95,
        stagger: {
          amount: 0.8,
          grid: "auto",
          from: "start"
        },
        duration: 1.2,
        ease: "power3.out"
      });
      
      gsap.from(".mechanics-title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 1
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="mechanics" className="py-24 px-4 md:px-6 relative overflow-hidden bg-transparent">
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="mechanics-title text-5xl md:text-7xl font-black text-center mb-16 text-yellow-300 uppercase tracking-tighter drop-shadow-2xl">
          THE PATH TO WEALTH
        </h2>

        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {weapons.map((weapon) => {
            const progressPercent = (weapon.count / weapon.max) * 100;
            const isLoading = loadingIds.has(weapon.id);

            return (
              <div 
                key={weapon.id} 
                className="artifact-card bg-gradient-to-br from-[#FFD700]/10 via-[#4a0101]/95 to-[#2a0101] backdrop-blur-xl p-5 md:p-8 rounded-[3rem] text-center border-4 border-yellow-400/30 shadow-[0_25px_50px_rgba(0,0,0,0.6)] relative overflow-hidden group transition-all"
              >
                <div className="relative h-44 flex items-center justify-center mb-6">
                  <CelestialHalo />
                  {isLoading ? (
                    <div className="w-12 h-12 rounded-full border-4 border-t-yellow-400 border-white/10 animate-spin"></div>
                  ) : !weapon.image ? (
                    <span className="text-8xl animate-divine-float">✨</span>
                  ) : (
                    <img 
                      src={weapon.image} 
                      alt={weapon.name} 
                      className="max-w-[90%] max-h-[90%] object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.8)] animate-divine-float relative z-20"
                    />
                  )}
                  <div className="absolute bottom-4 w-24 h-4 bg-black/40 rounded-full blur-md"></div>
                </div>

                <div className="relative z-10">
                  <div className="text-sm font-black text-white uppercase mb-4 tracking-tighter">{weapon.name}</div>
                  <div className="w-full bg-black/60 rounded-full h-4 p-[3px] border-2 border-white/10 overflow-hidden mb-2">
                    <div className="h-full rounded-full bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-700 transition-all duration-1000" style={{ width: `${progressPercent || 5}%` }}></div>
                  </div>
                  <div className="text-[10px] font-black text-yellow-400/80 tracking-[0.2em] uppercase">PROGRESS {weapon.count}/{weapon.max}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Mechanics;