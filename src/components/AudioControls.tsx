import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';
import { toggleBackgroundMusic, setMuted, playHeartPopSound } from '../utils/audio';

export const AudioControls: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  const handleToggleMusic = () => {
    const active = toggleBackgroundMusic();
    setIsPlaying(active);
    playHeartPopSound(587.33);
  };

  const handleToggleMute = () => {
    const newMuted = !isAudioMuted;
    setIsAudioMuted(newMuted);
    setMuted(newMuted);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2" id="audio-controls">
      {/* Background Music Box Toggle */}
      <button
        onClick={handleToggleMusic}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-cute font-medium transition-all duration-300 backdrop-blur-md shadow-[0_8px_25px_rgba(255,140,165,0.25)] cursor-pointer ${
          isPlaying
            ? 'bg-[#ff477e] text-white border border-[#ff477e] shadow-[#ff477e]/30'
            : 'bg-white/60 hover:bg-white/90 border border-white/80 text-[#6d4c51] hover:text-[#ff477e]'
        }`}
        title="Play/Pause dreamy music box melody"
      >
        <Music className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin text-white' : 'text-[#ff477e]'}`} />
        <span className="hidden sm:inline">{isPlaying ? 'Playing Melody 🎵' : 'Sweet Melody 🎶'}</span>
        {isPlaying && (
          <span className="flex gap-0.5 items-end h-3">
            <span className="w-0.5 h-full bg-white rounded animate-pulse" />
            <span className="w-0.5 h-2/3 bg-pink-100 rounded animate-pulse delay-75" />
            <span className="w-0.5 h-4/5 bg-white rounded animate-pulse delay-150" />
          </span>
        )}
      </button>

      {/* Sound Effects Mute Toggle */}
      <button
        onClick={handleToggleMute}
        className="p-2.5 rounded-full bg-white/60 hover:bg-white/90 border border-white/80 text-[#6d4c51] hover:text-[#ff477e] backdrop-blur-md transition-all shadow-[0_8px_25px_rgba(255,140,165,0.2)] cursor-pointer"
        title={isAudioMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
      >
        {isAudioMuted ? <VolumeX className="w-4 h-4 text-[#ff477e]" /> : <Volume2 className="w-4 h-4 text-[#6d4c51]" />}
      </button>
    </div>
  );
};
