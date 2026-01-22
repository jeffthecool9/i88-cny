
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";

const DB_NAME = 'CNY_Scroll_Cache';
const STORE_NAME = 'scroll_assets';

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

const Mechanics: React.FC = () => {
  const [scrollImg, setScrollImg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchScrollImage = async () => {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const cacheKey = 'grand_divine_scroll_v1';
      
      try {
        const cached = await getStoredImage(cacheKey);
        if (cached) {
          setScrollImg(cached);
          setIsLoading(false);
          return;
        }

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { 
            parts: [{ 
              text: "A grand open horizontal Chinese imperial scroll. The scroll has gold handles on both sides, a deep royal blue silk background. Arranged neatly on the scroll are 8 distinct ancient Chinese divine weapons: a sword, a flute, a fan, a flower basket, a gourd, a lotus, jade castanets, and an iron staff. Cinematic lighting, hyper-realistic, 8k, isolated on a clean vibrant red background." 
            }] 
          },
          config: { imageConfig: { aspectRatio: "16:9" } }
        });

        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const imgData = `data:image/png;base64,${part.inlineData.data}`;
            await saveStoredImage(cacheKey, imgData);
            setScrollImg(imgData);
            break;
          }
        }
      } catch (e) {
        console.error("Scroll generation failed", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchScrollImage();
  }, []);

  return (
    <section id="mechanics" className="py-24 px-6 relative bg-gradient-to-b from-[#D40000] to-[#990000] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/oriental-tiles.png')]"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* EVENT DESCRIPTION HEADER */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-6 drop-shadow-2xl"
          >
            Weapon <span className="text-yellow-400">QUEST</span>
          </motion.h2>

          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-[3rem] shadow-2xl">
            <p className="text-white text-base md:text-xl font-bold uppercase tracking-tight leading-relaxed">
              Unlock the secrets of the Immortals. 
              <span className="block mt-2 text-yellow-300">Collect all 8 weapon shown on the Scroll to claim your REAL CASH PRIZES</span>
            </p>
          </div>
        </div>

        {/* THE IMPERIAL SCROLL (IMAGE 2 REPLACEMENT) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          {/* Outer Glow */}
          <div className="absolute -inset-4 bg-yellow-400/20 blur-[60px] rounded-[5rem] group-hover:bg-yellow-400/30 transition-all duration-1000"></div>
          
          <div className="relative bg-gradient-to-b from-yellow-100 via-yellow-400 to-yellow-600 p-1.5 md:p-2 rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
             <div className="bg-[#8B0000] rounded-[3.2rem] overflow-hidden relative min-h-[300px] flex items-center justify-center">
                {isLoading ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-t-yellow-400 border-white/20 rounded-full animate-spin"></div>
                    <span className="text-yellow-400 font-black text-xs uppercase tracking-widest animate-pulse">Unrolling Scroll...</span>
                  </div>
                ) : (
                  <motion.img 
                    src={scrollImg || ''} 
                    alt="The Sacred Scroll of 8 Immortals" 
                    className="w-full h-auto object-cover scale-105"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}

                {/* Overlay Text for the Scroll Area */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md px-4 py-1 rounded-full border border-white/20">
                   <span className="text-white text-[10px] font-black uppercase tracking-[0.4em]">Weapons Collection</span>
                </div>
             </div>
          </div>
        </motion.div>

        {/* PRIZE & CTA SECTION */}
        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block relative mb-12"
          >
            <div className="absolute -inset-8 bg-white/20 blur-3xl rounded-full"></div>
            <div className="relative bg-white text-[#D40000] px-12 py-5 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.3)] border-4 border-yellow-400">
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                GRAND PRIZE <br/> <span className="text-5xl md:text-7xl">RM38,888</span>
              </h3>
            </div>
          </motion.div>

          <div className="flex flex-col items-center gap-8">
            <p className="text-yellow-100/60 font-black text-xs md:text-sm uppercase tracking-[0.5em]">
               1 TICKET = 1 RANDOM UNLOCK & GUARANTEED CASH
            </p>
            
            <button 
              onClick={() => document.getElementById('register-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full max-w-sm py-6 bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 text-[#4a0101] rounded-[2rem] font-black text-2xl uppercase tracking-widest shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-b-8 border-[#854d0e] active:translate-y-2 active:border-b-0 transition-all hover:brightness-110"
            >
              Earn Tickets 🏮
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mechanics;
