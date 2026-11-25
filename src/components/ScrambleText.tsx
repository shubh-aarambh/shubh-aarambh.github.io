import React, { useEffect, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/_#';

interface ScrambleTextProps {
  text: string;
  className?: string;
  triggerOnHover?: boolean;
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  triggerOnHover = true,
}) => {
  const [display, setDisplay] = useState(text);

  const runScramble = () => {
    let iteration = 0;
    const interval = window.setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, idx) => {
            if (char === ' ') return ' ';
            if (idx < iteration) return text[idx];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );
      iteration += 0.55;
      if (iteration >= text.length) {
        window.clearInterval(interval);
        setDisplay(text);
      }
    }, 24);
    return interval;
  };

  useEffect(() => {
    const id = runScramble();
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span
      onMouseEnter={triggerOnHover ? () => void runScramble() : undefined}
      className={className}
    >
      {display}
    </span>
  );
};

