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
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        // Surgical background removal for white/near-white
        if (r > 238 && g > 238 && b > 238) data[i + 3] = 0;
      }
      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => resolve(base64);
    img.src = base64;
  });
};

const Mechanics: React.FC = () => {
  const [weapons, setWeapons] = useState(INITIAL_WEAPONS);
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set(INITIAL_WEAPONS.map(w => w.id)));
  const [failedIds, setFailedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const generateWeaponImages = async () => {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const generationPromises = INITIAL_WEAPONS.map(async (weapon) => {
        try {
          const cacheKey = `artifact_v5_${weapon.id}`; 
          const cached = await getStoredImage(cacheKey);
          
          if (cached) {
            setWeapons(prev => prev.map(w => w.id === weapon.id ? { ...w, image: cached } : w));
            setLoadingIds(prev => { const next = new Set(prev); next.delete(weapon.id); return next; });
            return;
          }

          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ text: `${weapon.icon}. Hyper-realistic, 3D artifact render, solid white background, cinematic gold studio lighting, 8k resolution.` }] },
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
          Weapons Collection
        </h2>

        <div className="flex items-center justify-between mb-12 border-b-4 border-yellow-400/40 pb-6">
         
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {weapons.map((weapon) => {
            const progressPercent = (weapon.count / weapon.max) * 100;
            const isLoading = loadingIds.has(weapon.id);
            const isFailed = failedIds.has(weapon.id);

            return (
              <div 
                key={weapon.id} 
                className="bg-gradient-to-br from-yellow-500/20 to-[#4a0101] backdrop-blur-xl p-5 md:p-8 rounded-[3rem] text-center border-4 border-yellow-400/30 shadow-2xl relative overflow-hidden group transition-all active:scale-95"
              >
                <div className="absolute inset-0 bg-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative h-40 flex items-center justify-center mb-6">
                  {/* High-intensity Glow for background */}
                  <div className="absolute w-32 h-32 bg-yellow-500/30 rounded-full blur-[45px] animate-pulse"></div>
                  
                  {isLoading ? (
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 rounded-full border-4 border-t-yellow-400 border-white/10 animate-spin"></div>
                      <span className="text-[9px] font-black text-yellow-400/80 uppercase tracking-widest">Awakening...</span>
                    </div>
                  ) : isFailed || !weapon.image ? (
                    <div className="flex flex-col items-center justify-center animate-divine-float">
                       <span className="text-8xl filter drop-shadow-[0_0_30px_rgba(253,224,71,0.6)]">✨</span>
                       <span className="text-[10px] text-yellow-300 font-black mt-3 uppercase tracking-widest opacity-80">Sacred Item</span>
                    </div>
                  ) : (
                    <img 
                      src={weapon.image} 
                      alt={weapon.name} 
                      className="max-w-[95%] max-h-[95%] object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.8)] animate-divine-float relative z-10"
                      style={{ animationDelay: `${parseInt(weapon.id) * 0.25}s` }}
                    />
                  )}
                </div>

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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Mechanics;