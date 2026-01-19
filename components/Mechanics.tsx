import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { INITIAL_WEAPONS } from '../constants.ts';
import { GoogleGenAI } from "@google/genai";

// --- IndexedDB & Utility Functions remain same for functionality ---
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

const Mechanics: React.FC = () => {
  const [weapons, setWeapons] = useState(INITIAL_WEAPONS);
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set(INITIAL_WEAPONS.map(w => w.id)));

  useEffect(() => {
    const generateWeaponImages = async () => {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      INITIAL_WEAPONS.map(async (weapon) => {
        try {
          const cacheKey = `artifact_v15_${weapon.id}`; 
          const cached = await getStoredImage(cacheKey);
          if (cached) {
            setWeapons(prev => prev.map(w => w.id === weapon.id ? { ...w, image: cached } : w));
            setLoadingIds(prev => { const next = new Set(prev); next.delete(weapon.id); return next; });
            return;
          }
          const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: { parts: [{ text: `A mystical weapon: ${weapon.icon}. Hyper-realistic, 3D render, dark atmospheric lighting, volumetric rays, high contrast, floating centered.` }] }
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
  }, []);

  return (
    <section id="mechanics" className="py-32 px-6 relative bg-transparent overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <header className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-6xl font-black text-yellow-400 uppercase tracking-tighter mb-4"
          >
            THE ARSENAL
          </motion.h2>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em]">
            Unlock Divine Artifacts to Ascend
          </p>
        </header>

        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {weapons.map((weapon, idx) => (
            <motion.div 
              key={weapon.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group relative bg-[#1a0101]/60 backdrop-blur-xl rounded-[2.5rem] p-6 border border-white/10 hover:border-yellow-400/50 transition-all duration-500 overflow-hidden"
            >
              {/* Card Aura */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative aspect-square mb-6 flex items-center justify-center">
                {/* Halo Background */}
                <div className="absolute w-[80%] h-[80%] border border-yellow-400/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
                
                {loadingIds.has(weapon.id) ? (
                  <div className="w-8 h-8 border-2 border-t-yellow-400 border-white/10 rounded-full animate-spin"></div>
                ) : (
                  <img 
                    src={weapon.image || 'https://via.placeholder.com/200'} 
                    alt={weapon.name}
                    className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] animate-divine-float"
                  />
                )}
              </div>

              <div className="relative z-10 text-center">
                <h3 className="text-white font-black text-sm uppercase tracking-tighter mb-4 group-hover:text-yellow-400 transition-colors">
                  {weapon.name}
                </h3>
                
                {/* Progress Bar - InkGames Style */}
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(weapon.count / weapon.max) * 100}%` }}
                    className="h-full bg-gradient-to-r from-yellow-500 to-yellow-200"
                  />
                </div>
                <div className="flex justify-between items-center px-1">
                  <span className="text-[8px] text-white/30 font-black uppercase tracking-widest">Progress</span>
                  <span className="text-[8px] text-yellow-400/80 font-black uppercase tracking-widest">{weapon.count}/{weapon.max}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mechanics;