import React, { useEffect, useRef, useState } from 'react';
import { playHeartPopSound, playSparkleChime } from '../utils/audio';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  type: 'heart' | 'sparkle' | 'bokeh' | 'bigHeart';
  color: string;
  wobble: number;
  wobbleSpeed: number;
  scale: number;
  direction: 'up' | 'down';
  life?: number;
  maxLife?: number;
}

const HEART_COLORS = [
  '#ff477e', // primary Immersive UI hot pink
  '#ff758f', // romantic blush
  '#ff85a1', // soft petal
  '#f72585', // deep rose fuchsia
  '#fb6f92', // strawberry cream
  '#ffb3c6', // cotton candy pink
  '#c77dff', // soft lavender accent
  '#ffffff', // sparkling diamond
];

export const BackgroundParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const touchParticlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    const initParticles = () => {
      const particles: Particle[] = [];
      const particleCount = Math.min(Math.floor((width * height) / 12000), 160);

      // Upward floating hearts
      for (let i = 0; i < particleCount * 0.55; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 16 + 8,
          speedY: -(Math.random() * 1.2 + 0.5),
          speedX: (Math.random() - 0.5) * 0.6,
          opacity: Math.random() * 0.6 + 0.2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          type: 'heart',
          color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.03 + 0.01,
          scale: 1,
          direction: 'up',
        });
      }

      // Downward falling hearts
      for (let i = 0; i < particleCount * 0.2; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 14 + 6,
          speedY: Math.random() * 0.9 + 0.4,
          speedX: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.03,
          type: 'heart',
          color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.03 + 0.01,
          scale: 0.9,
          direction: 'down',
        });
      }

      // Sparkles ✨
      for (let i = 0; i < particleCount * 0.18; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 8 + 4,
          speedY: (Math.random() - 0.5) * 0.4,
          speedX: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.7 + 0.2,
          rotation: Math.random() * Math.PI,
          rotationSpeed: (Math.random() - 0.5) * 0.05,
          type: 'sparkle',
          color: '#ffffff',
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.04 + 0.02,
          scale: 1,
          direction: 'up',
        });
      }

      // Glowing Bokeh Orbs
      for (let i = 0; i < 15; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 90 + 40,
          speedY: (Math.random() - 0.5) * 0.3,
          speedX: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.12 + 0.04,
          rotation: 0,
          rotationSpeed: 0,
          type: 'bokeh',
          color: HEART_COLORS[Math.floor(Math.random() * 4)],
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.01 + 0.005,
          scale: 1,
          direction: 'up',
        });
      }

      particlesRef.current = particles;
    };

    initParticles();

    // Draw a single romantic SVG heart path on canvas
    const drawHeart = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number,
      rotation: number
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(rotation);
      c.globalAlpha = Math.max(0, Math.min(1, opacity));
      c.fillStyle = color;
      c.shadowColor = color;
      c.shadowBlur = size > 16 ? 12 : 6;

      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      // top left curve
      c.bezierCurveTo(-size / 2, -topCurveHeight, -size, size / 3, 0, size);
      // top right curve
      c.bezierCurveTo(size, size / 3, size / 2, -topCurveHeight, 0, topCurveHeight);
      c.closePath();
      c.fill();
      c.restore();
    };

    // Draw sparkle ✨ on canvas
    const drawSparkle = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number,
      rotation: number
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(rotation);
      c.globalAlpha = Math.max(0, Math.min(1, opacity));
      c.fillStyle = color;
      c.shadowColor = '#fbcfe8';
      c.shadowBlur = 10;

      c.beginPath();
      c.moveTo(0, -size);
      c.quadraticCurveTo(size * 0.15, -size * 0.15, size, 0);
      c.quadraticCurveTo(size * 0.15, size * 0.15, 0, size);
      c.quadraticCurveTo(-size * 0.15, size * 0.15, -size, 0);
      c.quadraticCurveTo(-size * 0.15, -size * 0.15, 0, -size);
      c.closePath();
      c.fill();
      c.restore();
    };

    // Draw Glowing Bokeh Orb
    const drawBokeh = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number
    ) => {
      c.save();
      c.globalAlpha = Math.max(0, Math.min(1, opacity));
      const grad = c.createRadialGradient(x, y, 0, x, y, size);
      grad.addColorStop(0, color);
      grad.addColorStop(0.6, color);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      c.fillStyle = grad;
      c.beginPath();
      c.arc(x, y, size, 0, Math.PI * 2);
      c.fill();
      c.restore();
    };

    let lastBigHeartSpawn = Date.now();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Occasional big heart popping up
      if (Date.now() - lastBigHeartSpawn > 4500) {
        lastBigHeartSpawn = Date.now();
        particlesRef.current.push({
          x: Math.random() * (width - 100) + 50,
          y: height + 60,
          size: Math.random() * 32 + 28,
          speedY: -(Math.random() * 1.5 + 1.2),
          speedX: (Math.random() - 0.5) * 0.8,
          opacity: 0.8,
          rotation: (Math.random() - 0.5) * 0.4,
          rotationSpeed: (Math.random() - 0.5) * 0.015,
          type: 'bigHeart',
          color: HEART_COLORS[Math.floor(Math.random() * 3)],
          wobble: 0,
          wobbleSpeed: 0.02,
          scale: 1.2,
          direction: 'up',
          life: 0,
          maxLife: 350,
        });
      }

      // Update & render main particles
      const currentParticles = particlesRef.current;
      for (let i = currentParticles.length - 1; i >= 0; i--) {
        const p = currentParticles[i];

        p.wobble += p.wobbleSpeed;
        p.x += p.speedX + Math.sin(p.wobble) * 0.6;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.type === 'bigHeart') {
          p.life = (p.life || 0) + 1;
          if (p.life > (p.maxLife || 300) || p.y < -100) {
            currentParticles.splice(i, 1);
            continue;
          }
        } else {
          // Boundary wrapping
          if (p.direction === 'up' && p.y < -50) {
            p.y = height + 40;
            p.x = Math.random() * width;
          } else if (p.direction === 'down' && p.y > height + 50) {
            p.y = -40;
            p.x = Math.random() * width;
          }
          if (p.x < -50) p.x = width + 40;
          if (p.x > width + 50) p.x = -40;
        }

        if (p.type === 'heart' || p.type === 'bigHeart') {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.opacity, p.rotation);
        } else if (p.type === 'sparkle') {
          drawSparkle(ctx, p.x, p.y, p.size, p.color, p.opacity, p.rotation);
        } else if (p.type === 'bokeh') {
          drawBokeh(ctx, p.x, p.y, p.size, p.color, p.opacity);
        }
      }

      // Update & render click/touch burst particles
      const touchParticles = touchParticlesRef.current;
      for (let i = touchParticles.length - 1; i >= 0; i--) {
        const tp = touchParticles[i];
        tp.x += tp.speedX;
        tp.y += tp.speedY;
        tp.speedY += 0.05; // gentle gravity
        tp.rotation += tp.rotationSpeed;
        tp.opacity -= 0.015;
        tp.size *= 0.985;

        if (tp.opacity <= 0 || tp.size <= 1) {
          touchParticles.splice(i, 1);
          continue;
        }

        if (tp.type === 'heart') {
          drawHeart(ctx, tp.x, tp.y, tp.size, tp.color, tp.opacity, tp.rotation);
        } else {
          drawSparkle(ctx, tp.x, tp.y, tp.size, '#fff', tp.opacity, tp.rotation);
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Click/Touch Heart Burst handler
    const handleSpawnAtPosition = (clientX: number, clientY: number) => {
      const burstCount = Math.floor(Math.random() * 6 + 7);
      for (let k = 0; k < burstCount; k++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1.5;
        touchParticlesRef.current.push({
          x: clientX,
          y: clientY,
          size: Math.random() * 18 + 10,
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed - 1.5,
          opacity: 1,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.2,
          type: Math.random() > 0.3 ? 'heart' : 'sparkle',
          color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
          wobble: 0,
          wobbleSpeed: 0.1,
          scale: 1,
          direction: 'up',
        });
      }

      playHeartPopSound(Math.random() * 200 + 400);
      if (Math.random() > 0.6) {
        playSparkleChime();
      }
      setClickCount((prev) => prev + 1);
    };

    const handlePointerDown = (e: PointerEvent) => {
      // Don't intercept button or input clicks with disruptive preventDefault
      handleSpawnAtPosition(e.clientX, e.clientY);
    };

    window.addEventListener('pointerdown', handlePointerDown);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', handlePointerDown);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" id="background-particles-container">
      {/* Immersive UI Dreamy Blush Gradient Mesh Overlays */}
      <div className="absolute -top-[15%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-[#ffb3c6]/40 blur-[100px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-[30%] -right-[15%] w-[65vw] h-[65vw] rounded-full bg-[#ff758f]/25 blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-[20%] left-[15%] w-[70vw] h-[70vw] rounded-full bg-[#ffdde1]/60 blur-[130px] pointer-events-none" />
      <div className="absolute top-[60%] left-[5%] w-[40vw] h-[40vw] rounded-full bg-[#f72585]/15 blur-[110px] pointer-events-none" />

      {/* High performance Canvas rendering hearts and sparkles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Tap hint in small subtle frosted badge */}
      {clickCount > 0 && clickCount < 3 && (
        <div className="fixed bottom-4 left-4 text-xs text-[#ff477e] font-cute bg-white/70 px-3.5 py-1.5 rounded-full border border-white/90 backdrop-blur-md pointer-events-auto select-none transition-opacity shadow-[0_4px_16px_rgba(255,140,165,0.25)]">
          ✨ Tapped {clickCount} hearts sent with love!
        </div>
      )}
    </div>
  );
};
