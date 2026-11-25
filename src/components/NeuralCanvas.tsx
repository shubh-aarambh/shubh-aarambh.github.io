import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
}

export const NeuralCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = Math.min(window.innerHeight * 1.05, 980));

    const mouse = { x: -9999, y: -9999, active: false };
    const count = Math.min(Math.floor((width * height) / 19000), 68);

    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.42,
      vy: (Math.random() - 0.5) * 0.42,
      radius: Math.random() * 1.6 + 0.9,
      pulse: Math.random() * Math.PI * 2,
    }));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = Math.min(window.innerHeight * 1.05, 980);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const styles = getComputedStyle(document.documentElement);
      const accentRgb = styles.getPropertyValue('--accent-rgb').trim() || '34, 211, 238';
      const secondaryRgb =
        styles.getPropertyValue('--accent-secondary-rgb').trim() || '245, 158, 11';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.pulse += 0.02;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 170 && dist > 1) {
            const force = (170 - dist) / 170;
            p.x -= (dx / dist) * force * 0.85;
            p.y -= (dy / dist) * force * 0.85;
          }
        }

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 135) {
            const alpha = (1 - d / 135) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${accentRgb}, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connection to cursor
        if (mouse.active) {
          const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (dm < 185) {
            const alpha = (1 - dm / 185) * 0.34;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${secondaryRgb}, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        const glowAlpha = 0.45 + Math.sin(p.pulse) * 0.25;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentRgb}, ${glowAlpha.toFixed(2)})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[980px] w-full opacity-75"
    />
  );
};

