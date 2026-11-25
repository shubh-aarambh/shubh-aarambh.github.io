import React, { useRef, useState } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightSize?: number;
  tilt?: boolean;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightSize = 380,
  tilt = false,
  ...props
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPos({ x, y });

    if (tilt) {
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const rotateY = ((x - midX) / midX) * 3.2;
      const rotateX = -((y - midY) / midY) * 3.2;
      setTransform(
        `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`
      );
    }
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    if (tilt) {
      setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)');
    }
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={handleMouseLeave}
      style={
        tilt
          ? {
              transform,
              transition: 'transform 0.22s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s ease, box-shadow 0.3s ease',
            }
          : undefined
      }
      className={`card-glass relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] backdrop-blur-xl transition-all duration-300 hover:border-[var(--border-strong)] ${className}`}
      {...props}
    >
      {/* Top glass specular highlight hairline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60"
      />

      {/* Pointer radial spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(${spotlightSize}px circle at ${pos.x}px ${pos.y}px, rgba(var(--accent-rgb), 0.15), transparent 65%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};
