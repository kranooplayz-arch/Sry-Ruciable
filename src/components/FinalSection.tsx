import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, PartyPopper, CheckCircle2, RotateCcw, MessageSquareHeart } from 'lucide-react';
import { playCelebrationFanfare, playHeartPopSound, playSparkleChime } from '../utils/audio';

export const FinalSection: React.FC = () => {
  const [isForgiven, setIsForgiven] = useState(false);
  const [playfulAttempts, setPlayfulAttempts] = useState(0);
  const [playfulMessage, setPlayfulMessage] = useState<string | null>(null);

  const triggerHeartExplosion = () => {
    // Multi-stage confetti heart cannon
    const end = Date.now() + 3.5 * 1000;
    const colors = ['#f43f5e', '#ec4899', '#f472b6', '#fb7185', '#fda4af', '#ffffff', '#ffd700'];

    // Big central burst
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors,
      shapes: ['circle', 'square'],
      scalar: 1.2,
    });

    // Side cannons interval
    const interval: number = window.setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }

      confetti({
        particleCount: 40,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors,
      });
    }, 280);
  };

  const handleForgiveClick = () => {
    setIsForgiven(true);
    triggerHeartExplosion();
    playCelebrationFanfare();
    playSparkleChime();
  };

  const handlePlayfulClick = () => {
    const attempts = playfulAttempts + 1;
    setPlayfulAttempts(attempts);
    playHeartPopSound(400);

    const excuses = [
      'Are you sure? Ruciable has the kindest heart in the world! 🥺',
      'What if I bring you your favorite boba or chocolate? 🧋🍫',
      'Pretty please with a million cherries on top? 🍒🥺👉👈',
      'You are too sweet to stay mad! Look at that smiling heart! 💖',
      'The "Forgive Me" button is practically glowing for you! ✨',
    ];
    setPlayfulMessage(excuses[attempts % excuses.length]);
  };

  return (
    <section id="final-decision-section" className="relative py-24 px-4 overflow-hidden z-10">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Glow ambient background */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#ffb3c6]/30 blur-[120px] pointer-events-none" />

        {/* Top Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/65 border border-white/80 text-[#ff477e] text-xs sm:text-sm font-cute font-semibold backdrop-blur-md mb-6 shadow-[0_4px_16px_rgba(255,140,165,0.2)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#ff477e]" />
          <span>The moment that means everything</span>
          <Heart className="w-3.5 h-3.5 text-[#ff477e] fill-[#ff477e]" />
        </motion.div>

        {/* Section Glowing Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-3 mb-10 max-w-3xl"
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black italic font-cute text-[#ff477e] glow-text drop-shadow-sm">
            SORRY RUCIABLE ❤️
          </h2>
          <div className="w-24 h-1 bg-[#ff477e] rounded-full opacity-30 mx-auto my-2" />
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold font-cute text-[#ff477e]">
            Can we be okay again? 🥺💗
          </p>
          <p className="text-sm sm:text-base text-[#6d4c51] font-cute max-w-md mx-auto font-medium">
            I promise to always try my best, be there for you, and make you proud.
          </p>
        </motion.div>

        {/* Action Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-lg glass rounded-[44px] p-8 sm:p-12 border border-white/80 shadow-[0_16px_50px_rgba(255,140,165,0.28)] flex flex-col items-center gap-6"
        >
          {!isForgiven ? (
            <>
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-20 h-20 rounded-full bg-[#ff477e] flex items-center justify-center shadow-[0_0_35px_rgba(255,71,126,0.7)] border-2 border-white/80"
                >
                  <Heart className="w-10 h-10 text-white fill-white" />
                </motion.div>
                <Sparkles className="w-5 h-5 text-amber-300 absolute -top-1 -right-1 animate-spin" />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                {/* Main Forgive Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleForgiveClick}
                  className="btn-hover w-full sm:w-auto px-10 py-4 rounded-full bg-[#ff477e] hover:bg-[#ff336a] text-white font-cute font-bold text-lg sm:text-xl shadow-xl shadow-[#ff477e]/35 transition-all flex items-center justify-center gap-3 border border-white/40 cursor-pointer"
                >
                  <Heart className="w-6 h-6 text-white fill-white animate-bounce" />
                  <span>Forgive Me ❤️</span>
                </motion.button>

                {/* Playful Secondary Button */}
                <button
                  onClick={handlePlayfulClick}
                  className="px-5 py-3.5 rounded-full bg-white/60 hover:bg-white/90 border border-white/80 text-[#6d4c51] hover:text-[#ff477e] text-xs sm:text-sm font-cute font-medium transition-all cursor-pointer shadow-sm"
                >
                  Need 5 seconds... 🙈
                </button>
              </div>

              {/* Playful prompt message */}
              <AnimatePresence>
                {playfulMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-xs sm:text-sm font-cute font-bold text-[#ff477e] bg-white/85 px-4 py-2.5 rounded-2xl border border-white/90 text-center shadow-sm"
                  >
                    {playfulMessage}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            /* Celebration State */
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              className="flex flex-col items-center gap-6 w-full py-2"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-24 h-24 rounded-full bg-[#ff477e] flex items-center justify-center shadow-[0_0_50px_rgba(255,71,126,0.8)] border-2 border-white/80"
                >
                  <PartyPopper className="w-12 h-12 text-white" />
                </motion.div>
                <CheckCircle2 className="w-8 h-8 text-emerald-500 bg-white rounded-full absolute -bottom-1 -right-1 border-2 border-emerald-500 shadow-sm" />
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black italic font-cute text-[#ff477e] glow-text drop-shadow-sm">
                  YAYYY! THANK YOU RUCIABLE! ❤️🥹
                </h3>
                <p className="text-base sm:text-lg text-[#6d4c51] font-cute leading-relaxed font-medium">
                  You just made my whole entire world 1000x brighter! Thank you for your warmth and forgiveness. I cherish you so much! 🥰✨
                </p>
              </div>

              {/* Cute Celebration Tags */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <span className="px-4 py-1.5 rounded-full bg-white/70 border border-white/90 text-xs text-[#ff477e] font-cute font-bold shadow-sm">
                  Best Friend Bond Sealed 🔒💖
                </span>
                <span className="px-4 py-1.5 rounded-full bg-white/70 border border-white/90 text-xs text-[#ff477e] font-cute font-bold shadow-sm">
                  Infinite Smiles Ahead 🌈
                </span>
              </div>

              {/* Re-trigger confetti & replay */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#ff477e]/20 w-full justify-center">
                <button
                  onClick={() => {
                    triggerHeartExplosion();
                    playSparkleChime();
                  }}
                  className="btn-hover px-6 py-2.5 rounded-full bg-[#ff477e] hover:bg-[#ff336a] text-white text-xs sm:text-sm font-cute font-bold flex items-center gap-2 transition-all shadow-md shadow-[#ff477e]/30 cursor-pointer"
                >
                  <PartyPopper className="w-4 h-4" />
                  <span>More Confetti! 🎉</span>
                </button>

                <button
                  onClick={() => {
                    setIsForgiven(false);
                    playHeartPopSound(500);
                  }}
                  className="p-2.5 rounded-full bg-white/60 hover:bg-white/90 border border-white/80 text-[#6d4c51] hover:text-[#ff477e] transition-all cursor-pointer shadow-sm"
                  title="Replay decision"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Footer note */}
        <div className="mt-16 text-center text-xs text-[#6d4c51]/60 font-cute space-y-1 font-medium">
          <p>Handcrafted with endless love, sincerity, and care for Ruciable ❤️</p>
          <p className="text-[11px]">“Friendship is the comfort of knowing that even when mistakes happen, forgiveness makes love stronger.”</p>
        </div>
      </div>
    </section>
  );
};
