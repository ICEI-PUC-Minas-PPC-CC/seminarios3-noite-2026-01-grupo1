import { useMemo } from 'react';

function createSeededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function Confetti({ active }) {
  const pieces = useMemo(() => {
    if (!active) return [];

    const colors = ['#6C5CE7', '#00CEC9', '#FD79A8', '#FDCB6E', '#55EFC4', '#FF6B6B', '#A29BFE'];
    return Array.from({ length: 50 }, (_, i) => {
      const seed = i + 1;
      const colorIndex = Math.floor(createSeededRandom(seed * 2) * colors.length);

      return {
        id: i,
        left: createSeededRandom(seed * 3) * 100,
        color: colors[colorIndex],
        delay: createSeededRandom(seed * 5) * 2,
        duration: 2 + createSeededRandom(seed * 7) * 3,
        size: 6 + createSeededRandom(seed * 11) * 8,
        rotation: createSeededRandom(seed * 13) * 360,
        borderRadius: createSeededRandom(seed * 17) > 0.5 ? '50%' : '2px',
      };
    });
  }, [active]);

  if (pieces.length === 0) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 300 }}>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: p.borderRadius,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}
