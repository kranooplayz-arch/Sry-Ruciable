export interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
  color: string;
  emoji?: string;
  wobbleSpeed: number;
  direction: 'up' | 'down';
}

export interface TouchSparkle {
  id: string;
  x: number;
  y: number;
  emoji: string;
  size: number;
  vx: number;
  vy: number;
  opacity: number;
  color: string;
}

export interface PromiseItem {
  id: string;
  icon: string;
  title: string;
  detail: string;
}
