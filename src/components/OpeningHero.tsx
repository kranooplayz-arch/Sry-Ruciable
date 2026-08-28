import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, ChevronDown } from 'lucide-react';
import { playHeartPopSound, playSparkleChime } from '../utils/audio';

interface OpeningHeroProps {
  onScrollToMessage: () => void;
}

export const OpeningHero: React.FC<OpeningHeroProps> = ({ onScrollToMessage }) => {
  // Stage 1: "Hey Ruciable… 🥺"
  // Stage 2: "I'm really sorry ❤️"
  // Stage 3: "SORRY RUCIABLE 💗" (Full Hero state)
  const [stage, setStage] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStage(2);
      playHeartPopSound(440);
    }, 2400);

    const timer2 = setTimeout(() => {
      setStage(3);
      playSparkleChime();
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <section
      id="opening-hero-section"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-16 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center relative z-10">
        <AnimatePresence mode="wait">
          {stage === 1 && (
            <motion.div
              key="stage1"
              initial={{ opacity: 0, scale: 0.85, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -20, filter: 'blur(8px)' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative">
                <span className="text-6xl sm:text-7xl animate-bounce inline-block">🥺</span>
                <span className="absolute -top-3 -right-3 text-2xl animate-pulse">✨</span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black italic tracking-tight text-[#ff477e] glow-text drop-shadow-sm font-cute">
                Hey Ruciable… 🥺
              </h1>
              <p className="text-[#6d4c51] text-base sm:text-lg font-cute max-w-md font-medium">
                I have something from the bottom of my heart to tell you...
              </p>
              <button
                onClick={() => setStage(2)}
                className="mt-4 text-xs text-[#ff477e]/80 hover:text-[#ff477e] underline font-cute cursor-pointer"
              >
                (Tap to continue)
              </button>
            </motion.div>
          )}

          {stage === 2 && (
            <motion.div
              key="stage2"
              initial={{ opacity: 0, scale: 0.85, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.15, y: -20, filter: 'blur(8px)' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-6"
            >
              <motion.div
                animate={{ scale: [1, 1.25, 1], rotate: [0, -5, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative"
              >
                <Heart className="w-16 h-16 sm:w-20 sm:h-20 text-[#ff477e] fill-[#ff477e] drop-shadow-[0_0_25px_rgba(255,71,126,0.8)]" />
                <Sparkles className="w-6 h-6 text-amber-300 absolute -top-2 -right-2 animate-spin" />
              </motion.div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black italic tracking-tight text-[#ff477e] glow-text drop-shadow-sm font-cute">
                I&apos;m really sorry ❤️
              </h1>
              <p className="text-[#6d4c51] text-base sm:text-lg font-cute max-w-md font-medium">
                Please hear me out...
              </p>
            </motion.div>
          )}

          {stage === 3 && (
            <motion.div
              key="stage3"
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-7 w-full"
            >
              {/* Little Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/65 border border-white/80 text-[#ff477e] text-xs sm:text-sm font-cute font-semibold backdrop-blur-md shadow-[0_4px_16px_rgba(255,140,165,0.2)]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#ff477e] animate-spin" />
                <span>A heartfelt message just for you</span>
                <Heart className="w-3.5 h-3.5 text-[#ff477e] fill-[#ff477e]" />
              </motion.div>

              {/* Pulsing Glowing Main Icon */}
              <div className="relative group">
                <motion.div
                  animate={{
                    scale: [1, 1.14, 1],
                    rotate: [0, -3, 3, 0],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="relative cursor-pointer"
                  onClick={() => playHeartPopSound(659.25)}
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/80 flex items-center justify-center border border-white/90 shadow-[0_12px_40px_rgba(255,71,126,0.35)] backdrop-blur-xl">
                    <Heart className="w-12 h-12 sm:w-14 sm:h-14 text-[#ff477e] fill-[#ff477e] filter drop-shadow-[0_0_20px_rgba(255,71,126,0.8)]" />
                  </div>
                </motion.div>

                {/* Orbiting Mini Hearts */}
                <span className="absolute -top-3 -right-3 text-xl animate-bounce delay-100">🌸</span>
                <span className="absolute -bottom-2 -left-3 text-xl animate-pulse delay-200">✨</span>
                <span className="absolute top-1/2 -left-6 text-lg animate-bounce delay-300">💖</span>
              </div>

              {/* Big Glowing Main Text */}
              <div className="space-y-3 max-w-3xl">
                <motion.h1
                  className="text-4xl sm:text-6xl md:text-8xl font-black italic tracking-tight text-[#ff477e] glow-text font-cute drop-shadow-sm"
                >
                  SORRY RUCIABLE 💗
                </motion.h1>

                {/* Aesthetic decorative pink bar */}
                <div className="w-24 h-1 bg-[#ff477e] rounded-full opacity-30 mx-auto my-2" />

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <p className="text-xl sm:text-2xl md:text-3xl text-[#ff477e] font-cute font-bold">
                    “I’m really sorry 🥺❤️ Please forgive me.”
                  </p>
                  <p className="text-[#6d4c51] text-sm sm:text-base font-cute max-w-lg mx-auto font-medium">
                    You mean so much to me, and my days aren&apos;t the same without your smile.
                  </p>
                </motion.div>
              </div>

              {/* Action & Scroll Hint */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col items-center gap-4 mt-2"
              >
                <button
                  onClick={onScrollToMessage}
                  className="btn-hover group relative inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-[#ff477e] hover:bg-[#ff336a] text-white font-cute font-bold text-base shadow-lg shadow-[#ff477e]/30 cursor-pointer"
                >
                  <span>Read My Apology Letter</span>
                  <Heart className="w-4 h-4 text-white fill-white group-hover:scale-125 transition-transform" />
                </button>

                <button
                  onClick={onScrollToMessage}
                  className="flex flex-col items-center text-[#6d4c51]/70 hover:text-[#ff477e] text-xs font-cute mt-4 transition-colors group cursor-pointer"
                >
                  <span>Scroll down with love</span>
                  <ChevronDown className="w-4 h-4 text-[#ff477e] group-hover:translate-y-1 transition-transform animate-bounce mt-1" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
