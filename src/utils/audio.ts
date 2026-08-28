/**
 * Web Audio API based sound synthesizer for dreamy music box melodies,
 * chime effects, heart clicks, and celebration fanfares.
 */

let audioCtx: AudioContext | null = null;
let isMuted = false;
let musicInterval: number | null = null;
let isPlayingMusic = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playHeartPopSound(freq = 440, type: OscillatorType = 'sine') {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.26);
  } catch {
    // ignore audio playback errors on restricted autoplay
  }
}

export function playSparkleChime() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
  notes.forEach((freq, index) => {
    setTimeout(() => {
      if (isMuted) return;
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.36);
      } catch {}
    }, index * 45);
  });
}

export function playCelebrationFanfare() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const chords = [
    [523.25, 659.25, 783.99], // C Major
    [587.33, 739.99, 880.00], // D Major
    [659.25, 830.61, 987.77], // E Major
    [1046.50, 1318.51, 1567.98] // High C Major
  ];

  chords.forEach((chord, step) => {
    setTimeout(() => {
      if (isMuted) return;
      chord.forEach((freq) => {
        try {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.7);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 0.75);
        } catch {}
      });
    }, step * 180);
  });
}

// Gentle lullaby/music box notes for soft background ambiance
const MELODY = [
  { note: 523.25, dur: 0.6 }, // C5
  { note: 659.25, dur: 0.6 }, // E5
  { note: 783.99, dur: 0.8 }, // G5
  { note: 880.00, dur: 0.6 }, // A5
  { note: 783.99, dur: 0.8 }, // G5
  { note: 659.25, dur: 0.6 }, // E5
  { note: 587.33, dur: 0.6 }, // D5
  { note: 523.25, dur: 1.0 }, // C5
  { note: 659.25, dur: 0.6 }, // E5
  { note: 783.99, dur: 0.8 }, // G5
  { note: 1046.50, dur: 1.2 }, // C6
  { note: 880.00, dur: 0.6 }, // A5
  { note: 783.99, dur: 0.8 }, // G5
  { note: 659.25, dur: 0.8 }, // E5
  { note: 523.25, dur: 1.4 }, // C5
];

export function toggleBackgroundMusic(enabled?: boolean): boolean {
  if (enabled !== undefined) {
    isPlayingMusic = enabled;
  } else {
    isPlayingMusic = !isPlayingMusic;
  }

  if (isPlayingMusic) {
    startMusicLoop();
  } else {
    stopMusicLoop();
  }

  return isPlayingMusic;
}

function startMusicLoop() {
  if (musicInterval) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  let noteIndex = 0;
  const playNext = () => {
    if (!isPlayingMusic || isMuted) return;
    const item = MELODY[noteIndex % MELODY.length];
    noteIndex++;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.note, ctx.currentTime);

      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + item.dur * 1.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + item.dur * 1.55);
    } catch {}
  };

  playNext();
  musicInterval = window.setInterval(playNext, 750);
}

function stopMusicLoop() {
  if (musicInterval) {
    clearInterval(musicInterval);
    musicInterval = null;
  }
}

export function setMuted(muted: boolean) {
  isMuted = muted;
}
