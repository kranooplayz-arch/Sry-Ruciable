import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Send, ShieldCheck, Smile, Star } from 'lucide-react';
import { playHeartPopSound, playSparkleChime } from '../utils/audio';

export const ApologyMessageSection: React.FC = () => {
  const [hugCount, setHugCount] = useState(0);
  const [showHugMessage, setShowHugMessage] = useState(false);
  const [activeTab, setActiveTab] = useState<'letter' | 'promises'>('letter');

  const handleSendHug = () => {
    setHugCount((prev) => prev + 1);
    setShowHugMessage(true);
    playSparkleChime();
    playHeartPopSound(523.25);
    setTimeout(() => {
      setShowHugMessage(false);
    }, 3500);
  };

  const promises = [
    {
      icon: <Smile className="w-5 h-5 text-amber-300" />,
      title: 'Cherish Your Smile',
      desc: 'I never want to be the reason your smile fades. You bring so much light and laughter.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-pink-300" />,
      title: 'Listen & Understand Better',
      desc: 'I promise to always communicate with patience, empathy, and genuine care for your feelings.',
    },
    {
      icon: <Star className="w-5 h-5 text-purple-300" />,
      title: 'Never Take You For Granted',
      desc: 'Our bond is precious and one of the brightest parts of my life. I will protect and treasure it always.',
    },
  ];

  return (
    <section id="apology-message-section" className="relative py-20 px-4 max-w-4xl mx-auto w-full z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/65 border border-white/80 text-[#ff477e] text-xs sm:text-sm font-cute font-semibold backdrop-blur-md shadow-[0_4px_16px_rgba(255,140,165,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-[#ff477e]" />
          <span>From the bottom of my heart</span>
          <Sparkles className="w-3.5 h-3.5 text-[#ff477e]" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-black italic font-cute text-[#ff477e] glow-text drop-shadow-sm">
          A Letter For Ruciable 💌
        </h2>
        <div className="w-20 h-1 bg-[#ff477e] rounded-full opacity-30 mx-auto my-1" />
        <p className="text-[#6d4c51] text-sm sm:text-base font-cute font-medium">
          Please take a gentle moment to read what is in my heart...
        </p>

        {/* Tab Switcher */}
        <div className="flex justify-center gap-2 pt-3">
          <button
            onClick={() => {
              setActiveTab('letter');
              playHeartPopSound(440);
            }}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-cute transition-all cursor-pointer ${
              activeTab === 'letter'
                ? 'bg-[#ff477e] text-white shadow-[0_0_20px_rgba(255,71,126,0.45)] font-bold'
                : 'bg-white/60 text-[#6d4c51] hover:text-[#ff477e] hover:bg-white/85 border border-white/80'
            }`}
          >
            Heartfelt Letter 💌
          </button>
          <button
            onClick={() => {
              setActiveTab('promises');
              playHeartPopSound(493.88);
            }}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-cute transition-all cursor-pointer ${
              activeTab === 'promises'
                ? 'bg-[#ff477e] text-white shadow-[0_0_20px_rgba(255,71,126,0.45)] font-bold'
                : 'bg-white/60 text-[#6d4c51] hover:text-[#ff477e] hover:bg-white/85 border border-white/80'
            }`}
          >
            My Promises 🌸
          </button>
        </div>
      </motion.div>

      {/* Main Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass rounded-[40px] p-6 sm:p-10 relative overflow-hidden shadow-[0_16px_45px_rgba(255,140,165,0.25)] border border-white/80"
      >
        {/* Cute Decorative Elements */}
        <div className="absolute -right-6 -top-6 w-36 h-36 bg-[#ffb3c6]/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-6 -bottom-6 w-36 h-36 bg-[#ffdde1]/70 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between border-b border-[#ff477e]/20 pb-4 mb-6 text-xs text-[#ff477e] font-cute font-semibold">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff477e] animate-ping" />
            <span>To: Dearest Ruciable</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-[#ff477e] fill-[#ff477e]" />
            <span>With All My Sincerity</span>
          </div>
        </div>

        {activeTab === 'letter' ? (
          <div className="space-y-6">
            {/* The Explicit Apology Message Quote */}
            <div className="relative p-6 sm:p-8 rounded-3xl bg-white/70 border border-white/90 shadow-[0_6px_20px_rgba(255,140,165,0.15)]">
              <span className="text-4xl text-[#ff477e]/40 font-serif-dream absolute top-2 left-3 select-none leading-none">
                “
              </span>
              <p className="text-lg sm:text-2xl text-[#ff477e] font-bold leading-relaxed sm:leading-loose text-center font-cute pt-2">
                “Ruciable, I’m genuinely sorry. I never wanted to hurt you or make you upset. You’re important to me, and I hope you can forgive me. 🥺❤️”
              </p>
              <span className="text-4xl text-[#ff477e]/40 font-serif-dream absolute bottom-1 right-3 select-none leading-none">
                ”
              </span>
            </div>

            <div className="space-y-4 text-[#6d4c51] text-sm sm:text-base leading-relaxed font-cute text-justify sm:text-left font-medium">
              <p>
                Sometimes I make silly mistakes, say the wrong things, or mess up without realizing the weight it carries. Seeing you upset breaks my heart because your presence and happiness mean so very much to me.
              </p>
              <p>
                Every single memory we share, every conversation, and every laugh is deeply treasured. I value you more than words can fully express, and nothing matters more to me right now than making things right between us.
              </p>
              <p className="font-handwritten text-2xl sm:text-3xl text-[#ff477e] text-right pt-2 font-bold">
                Yours truly &amp; endlessly sorry, ❤️
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {promises.map((p, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                className="p-5 rounded-3xl bg-white/75 border border-white/90 shadow-[0_6px_20px_rgba(255,140,165,0.15)] hover:border-[#ff477e]/50 hover:shadow-md transition-all flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#fff0f3] border border-[#ff477e]/20 flex items-center justify-center">
                  {p.icon}
                </div>
                <h4 className="font-cute font-bold text-[#ff477e] text-base">{p.title}</h4>
                <p className="font-cute text-xs sm:text-sm text-[#6d4c51] leading-relaxed font-medium">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Interactive Virtual Hug Button */}
        <div className="mt-8 pt-6 border-t border-[#ff477e]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleSendHug}
              className="btn-hover px-6 py-3 rounded-full bg-[#ff477e] hover:bg-[#ff336a] text-white font-cute font-bold text-sm flex items-center gap-2 shadow-lg shadow-[#ff477e]/30 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Ruciable a Warm Virtual Hug 🤗</span>
            </button>
            {hugCount > 0 && (
              <span className="text-xs font-cute font-bold text-[#ff477e] bg-white/80 px-3.5 py-1.5 rounded-full border border-white/90 shadow-sm">
                {hugCount} Hugs Sent! 💖
              </span>
            )}
          </div>

          {showHugMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs sm:text-sm font-cute font-semibold text-[#ff477e] bg-white/80 px-4 py-2 rounded-full border border-white/90 shadow-sm flex items-center gap-1.5"
            >
              <span>Hug wrapped with warmth &amp; love delivered! 🫂✨</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};
