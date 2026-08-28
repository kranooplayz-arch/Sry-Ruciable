import React, { useRef } from 'react';
import { BackgroundParticles } from './components/BackgroundParticles';
import { AudioControls } from './components/AudioControls';
import { OpeningHero } from './components/OpeningHero';
import { ApologyMessageSection } from './components/ApologyMessageSection';
import { HeartInteractiveSection } from './components/HeartInteractiveSection';
import { FinalSection } from './components/FinalSection';
import { Heart, MessageSquareHeart, Sparkles } from 'lucide-react';

export default function App() {
  const messageRef = useRef<HTMLDivElement | null>(null);
  const heartSectionRef = useRef<HTMLDivElement | null>(null);
  const finalSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToMessage = () => {
    messageRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHeart = () => {
    heartSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFinal = () => {
    finalSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative selection:bg-[#ff477e] selection:text-white text-[#6d4c51] overflow-x-hidden font-sans">
      {/* Background Animated Floating Hearts & Glowing Sparkles Engine */}
      <BackgroundParticles />

      {/* Floating Audio & Melody Controls */}
      <AudioControls />

      {/* Floating Quick Navigation Bar */}
      <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 bg-white/70 backdrop-blur-xl border border-white/90 rounded-full px-4 py-2 flex items-center gap-3 shadow-[0_12px_32px_rgba(255,140,165,0.3)]">
        <button
          onClick={scrollToMessage}
          className="text-xs font-cute text-[#6d4c51] hover:text-[#ff477e] px-2.5 py-1 rounded-full hover:bg-white/80 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <MessageSquareHeart className="w-3.5 h-3.5 text-[#ff477e]" />
          <span>Letter</span>
        </button>

        <span className="w-1 h-1 rounded-full bg-[#ff477e]/30" />

        <button
          onClick={scrollToHeart}
          className="text-xs font-cute text-[#6d4c51] hover:text-[#ff477e] px-2.5 py-1 rounded-full hover:bg-white/80 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Heart className="w-3.5 h-3.5 text-[#ff477e] fill-[#ff477e]" />
          <span>Heart</span>
        </button>

        <span className="w-1 h-1 rounded-full bg-[#ff477e]/30" />

        <button
          onClick={scrollToFinal}
          className="text-xs font-cute text-white px-3 py-1 rounded-full bg-[#ff477e] hover:bg-[#ff336a] transition-all flex items-center gap-1.5 font-semibold shadow-[0_0_15px_rgba(255,71,126,0.4)] cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
          <span>Forgive Me</span>
        </button>
      </nav>

      {/* 1. Opening Screen */}
      <OpeningHero onScrollToMessage={scrollToMessage} />

      {/* 2. Apology Message Letter Section */}
      <div ref={messageRef}>
        <ApologyMessageSection />
      </div>

      {/* 3. Huge Heart Section */}
      <div ref={heartSectionRef}>
        <HeartInteractiveSection />
      </div>

      {/* 4. Final Section with Forgive Me Button & Explosion */}
      <div ref={finalSectionRef}>
        <FinalSection />
      </div>
    </div>
  );
}
