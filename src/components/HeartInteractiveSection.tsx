import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Flame } from 'lucide-react';
import { playHeartPopSound, playSparkleChime } from '../utils/audio';

export const HeartInteractiveSection: React.FC = () => {
  const [pulseCount, setPulseCount] = useState(0);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const cuteNotes = [
    'I really miss talking with you! 🥺',
    'You are literally irreplaceable ❤️',
    'I promise to treat you to your favorite snacks! 🧋✨',
    'A million apologies wrapped in love! 🌸',
    'You are the sweetest friend in the whole universe 🌟',
    'Sending infinite hugs and care! 🫂💕',
  ];

  const handleHeartClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newId = Date.now();
    setRipples((prev) => [...prev.slice(-6), { id: newId, x, y }]);
    setPulseCount((prev) => prev + 1);

    playHeartPopSound(587.33 + Math.min(pulseCount * 15, 300));
    if (pulseCount % 3 === 0) {
      playSparkleChime();
    }

    const randomMsg = cuteNotes[Math.floor(Math.random() * cuteNotes.length)];
    setPopupMessage(randomMsg);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newId));
    }, 1200);
  };

  const meterPercentage = Math.min(100, Math.round((pulseCount / 10) * 100));

  return (
    <section id="heart-interactive-section" className="relative py-24 px-4 overflow-hidden z-10">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Section Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/65 border border-white/80 text-[#ff477e] text-xs sm:text-sm font-cute font-semibold backdrop-blur-md mb-6 shadow-[0_4px_16px_rgba(255,140,165,0.2)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#ff477e]" />
          <span>Tap the giant heart to send love &amp; forgive energy</span>
          <Sparkles className="w-3.5 h-3.5 text-[#ff477e]" />
        </motion.div>

        {/* Orbiting Floating Hearts Container Around the Big Heart */}
        <div className="relative my-8 flex items-center justify-center">
          {/* Ambient Glowing Background Halos */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#ffb3c6]/40 blur-[80px] pointer-events-none animate-pulse-glow" />
          <div className="absolute w-60 h-60 sm:w-80 sm:h-80 rounded-full bg-[#ff758f]/30 blur-[70px] pointer-events-none animate-pulse" />

          {/* Floating Orbiting Emojis & Hearts */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] pointer-events-none"
          >
            <span className="absolute top-0 left-1/2 -translate-x-1/2 text-2xl filter drop-shadow-md">💖</span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-2xl filter drop-shadow-md">💕</span>
            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-2xl filter drop-shadow-md">💗</span>
            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-2xl filter drop-shadow-md">🌸</span>
            <span className="absolute top-1/6 left-1/6 text-xl filter drop-shadow-md">✨</span>
            <span className="absolute bottom-1/6 right-1/6 text-xl filter drop-shadow-md">🥺</span>
          </motion.div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
            className="absolute w-96 h-96 sm:w-[480px] sm:h-[480px] pointer-events-none"
          >
            <span className="absolute top-4 right-1/4 text-xl">❤️</span>
            <span className="absolute bottom-4 left-1/4 text-xl">💝</span>
            <span className="absolute left-4 top-1/3 text-lg">✨</span>
            <span className="absolute right-4 bottom-1/3 text-lg">🌷</span>
          </motion.div>

          {/* Huge Animated Beating Heart Container */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleHeartClick}
            className="relative cursor-pointer select-none group z-20"
          >
            {/* Pulsing Beating Heart SVG Container */}
            <motion.div
              animate={{
                scale: [1, 1.12, 1, 1.18, 1],
              }}
              transition={{
                duration: Math.max(0.8, 1.8 - pulseCount * 0.08),
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative flex items-center justify-center"
            >
              {/* Giant SVG Heart Shape */}
              <svg
                viewBox="0 0 24 24"
                className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 drop-shadow-[0_12px_45px_rgba(255,71,126,0.65)] filter"
                fill="url(#heart-gradient)"
              >
                <defs>
                  <linearGradient id="heart-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff477e" />
                    <stop offset="60%" stopColor="#f72585" />
                    <stop offset="100%" stopColor="#db2777" />
                  </linearGradient>
                </defs>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>

              {/* Heart Inner Glow & Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none">
                <motion.span
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  className="text-2xl sm:text-3xl filter drop-shadow-md mb-1"
                >
                  🥺👉👈
                </motion.span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black font-cute text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] italic">
                  Please forgive me?
                </h3>
                <span className="text-xs sm:text-sm text-pink-100 font-cute font-semibold drop-shadow mt-1">
                  (Tap to send a heartbeat ❤️)
                </span>
              </div>
            </motion.div>

            {/* Click Wave Ripples */}
            {ripples.map((ripple) => (
              <motion.span
                key={ripple.id}
                initial={{ scale: 0.2, opacity: 1 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="absolute w-24 h-24 rounded-full border-2 border-[#ff477e]/80 pointer-events-none -translate-x-1/2 -translate-y-1/2"
                style={{ left: ripple.x, top: ripple.y }}
              />
            ))}
          </motion.div>
        </div>

        {/* Dynamic Love & Forgiveness Meter */}
        <div className="w-full max-w-md glass rounded-[32px] p-6 border border-white/80 shadow-[0_12px_36px_rgba(255,140,165,0.22)] space-y-3.5">
          <div className="flex items-center justify-between text-xs sm:text-sm font-cute text-[#ff477e]">
            <span className="flex items-center gap-1.5 font-bold">
              <Flame className="w-4 h-4 text-[#ff477e]" />
              <span>Forgiveness &amp; Love Energy</span>
            </span>
            <span className="font-extrabold text-[#ff477e]">{meterPercentage}% Loaded</span>
          </div>

          <div className="w-full bg-white/80 rounded-full h-4 p-0.5 border border-white/90 shadow-inner overflow-hidden relative">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#ff85a1] via-[#ff477e] to-[#f72585] shadow-[0_0_15px_rgba(255,71,126,0.6)]"
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(12, meterPercentage)}%` }}
              transition={{ type: 'spring', bounce: 0.2 }}
            />
          </div>

          {/* Dynamic Heartfelt Bubble Note on Click */}
          <div className="min-h-[28px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {popupMessage ? (
                <motion.p
                  key={popupMessage}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="text-xs sm:text-sm font-cute text-[#ff477e] font-bold"
                >
                  ✨ {popupMessage}
                </motion.p>
              ) : (
                <p className="text-xs text-[#6d4c51] font-cute font-medium">
                  Tap the big heart to fill up the meter! 💕
                </p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
