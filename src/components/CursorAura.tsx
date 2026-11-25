import React, { useEffect, useRef } from 'react';

export const CursorAura: React.FC = () => {
  const auraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    if (!mq.matches) return;

    let rafId = 0;
    let targetX = -500;
    let targetY = -500;
    let currentX = -500;
    let currentY = -500;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;
      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${currentX - 240}px, ${currentY - 240}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={auraRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[480px] w-[480px] rounded-full opacity-35 blur-[90px] transition-opacity duration-500 lg:block print:hidden"
      style={{
        background:
          'radial-gradient(circle, rgba(var(--accent-rgb), 0.22) 0%, rgba(var(--accent-secondary-rgb), 0.08) 45%, transparent 72%)',
        willChange: 'transform',
      }}
    />
  );
};

