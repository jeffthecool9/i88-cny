import React, { useState, useEffect } from 'react';
import { INITIAL_WEAPONS } from '../constants.ts';
import { GoogleGenAI } from "@google/genai";

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
  } catch (e) {
    return null;
  }
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
  } catch (e) {
    console.warn('Storage failed:', e);
  }
};

/**
 * Improved Background Removal: 
 * Uses a distance-based threshold to remove whites while preserving weapon details
 */
const removeWhiteBackground = (base64: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) { resolve(base64); return; }
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Color distance algorithm
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        // If the color is very close to white (distance < 45)
        const dist = Math.sqrt((255 - r) ** 2 + (255 - g) ** 2 + (255 - b) ** 2);
        if (dist < 45) {
          data[i + 3] = 0; // Transparent
        }
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
    {/* Rotating Outer Ring */}
    <div className="absolute w-[80%] h-[80%] border border-yellow-400/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
    {/* Inner Glowing Aura */}
    <div className="absolute w-[60%] h-[60%] bg-gradient-to-tr from-yellow-400/20 to-transparent rounded-full blur-xl animate-pulse"></div>
    {/* Geometric Detail */}
    <svg className="absolute w-[70%] h-[70%] opacity-10 text-yellow-300 rotate-45" viewBox="0 0 100 100">
       <rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="0.5" />
       <rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="0.5" className="rotate-45 origin-center" />
    </svg>
  </div>
);

const Mechanics: React.FC = () => {
  const [weapons, setWeapons] = useState(INITIAL_WEAPONS);
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set(INITIAL_WEAPONS.map(w => w.id)));
  const [failedIds, setFailedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const generateWeaponImages = async () => {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const generationPromises = INITIAL_WEAPONS.map(async (weapon) => {
        try {
          const cacheKey = `artifact_v7_${weapon.id}`; // Incremented version for new algorithm
          const cached = await getStoredImage(cacheKey);
          
          if (cached) {
            setWeapons(prev => prev.map(w => w.id === weapon.id ? { ...w, image: cached } : w));
            setLoadingIds(prev => { const next = new Set(prev); next.delete(weapon.id); return next; });
            return;
          }

          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ text: `${weapon.icon}. Hyper-realistic, 3D high-fidelity render, isolated on pure solid white background, cinematic volumetric gold lighting, 8k Unreal Engine 5 render style.` }] },
            config: { imageConfig: { aspectRatio: "1:1" } }
          });
          
          let generated = false;
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              const transparentImg = await removeWhiteBackground(`data:image/png;base64,${part.inlineData.data}`);
              await saveStoredImage(cacheKey, transparentImg);
              setWeapons(prev => prev.map(w => w.id === weapon.id ? { ...w, image: transparentImg } : w));
              generated = true;
              break;
            }
          }
          if (!generated) throw new Error("No image generated");

        } catch (e) { 
          console.error(`Artifact Extraction Failed (${weapon.name}):`, e);
          setFailedIds(prev => { const next = new Set(prev); next.add(weapon.id); return next; });
        }
        finally { setLoadingIds(prev => { const next = new Set(prev); next.delete(weapon.id); return next; }); }
      });
      await Promise.all(generationPromises);
    };
    generateWeaponImages();
  }, []);

  return (
    <section id="mechanics" className="py-24 px-6 relative overflow-hidden bg-transparent">
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-5xl md:text-7xl font-black text-center mb-16 text-yellow-300 uppercase tracking-tighter drop-shadow-2xl">
          THE PATH TO WEALTH
        </h2>

        <div className="flex items-center justify-between mb-12 border-b-4 border-yellow-400/40 pb-6">
          <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight">
            Divine Artifacts
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {weapons.map((weapon) => {
            const progressPercent = (weapon.count / weapon.max) * 100;
            const isLoading = loadingIds.has(weapon.id);
            const isFailed = failedIds.has(weapon.id);

            return (
              <div 
                key={weapon.id} 
                className="bg-gradient-to-br from-[#FFD700]/10 via-[#4a0101]/95 to-[#2a0101] backdrop-blur-xl p-5 md:p-8 rounded-[3rem] text-center border-4 border-yellow-400/30 shadow-[0_25px_50px_rgba(0,0,0,0.6)] relative overflow-hidden group transition-all active:scale-95"
              >
                {/* Visual Depth Background */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')] opacity-5"></div>
                
                <div className="relative h-44 flex items-center justify-center mb-6">
                  <CelestialHalo />
                  
                  {isLoading ? (
                    <div className="flex flex-col items-center gap-4 relative z-10">
                      <div className="w-12 h-12 rounded-full border-4 border-t-yellow-400 border-white/10 animate-spin"></div>
                      <span className="text-[9px] font-black text-yellow-400/80 uppercase tracking-widest">Manifesting...</span>
                    </div>
                  ) : isFailed || !weapon.image ? (
                    <div className="flex flex-col items-center justify-center animate-divine-float relative z-10">
                       <span className="text-8xl filter drop-shadow-[0_0_30px_rgba(253,224,71,0.6)]">✨</span>
                       <span className="text-[10px] text-yellow-300 font-black mt-3 uppercase tracking-widest opacity-80">Sacred Item</span>
                    </div>
                  ) : (
                    <img 
                      src={weapon.image} 
                      alt={weapon.name} 
                      className="max-w-[90%] max-h-[90%] object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.8)] animate-divine-float relative z-20"
                      style={{ animationDelay: `${parseInt(weapon.id) * 0.25}s` }}
                    />
                  )}
                  
                  {/* Lotus Pedestal Shadow/Base */}
                  <div className="absolute bottom-4 w-24 h-4 bg-black/40 rounded-full blur-md"></div>
                </div>

                <div className="relative z-10">
                  <div className="text-sm font-black text-white uppercase mb-4 tracking-tighter drop-shadow-md">
                    {weapon.name}
                  </div>

                  <div className="w-full bg-black/60 rounded-full h-4 p-[3px] border-2 border-white/10 relative overflow-hidden mb-2 shadow-inner">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 transition-all duration-1000"
                      style={{ width: `${progressPercent || 5}%` }}
                    >
                      <div className="absolute inset-0 bg-white/25 animate-progress-shimmer"></div>
                    </div>
                  </div>
                  <div className="text-[10px] font-black text-yellow-400/80 tracking-[0.2em] uppercase">
                    PROGRESS {weapon.count}/{weapon.max}
                  </div>
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