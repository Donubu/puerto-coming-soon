'use client';

import { useEffect, useState } from 'react';

export function MouseFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX + 30, y: e.clientY + 30 });
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-6 h-6 bg-[red] rounded-full pointer-events-none z-[5000]"
      style={{
        transform: `translate(${position.x - 24}px, ${position.y - 24}px)`,
        transition: 'transform 0.2s cubic-bezier(0.33, 1, 0.68, 1)',
      }}
    />
  );
}