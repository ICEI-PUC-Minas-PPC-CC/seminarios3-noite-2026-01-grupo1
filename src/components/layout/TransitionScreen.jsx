import { useState, useEffect } from 'react';

export default function TransitionScreen({ show, fromLocation, toLocation, toIcon, onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!show) { setProgress(0); return; }

    const duration = 2000;
    const interval = 16;
    const step = (interval / duration) * 100;
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= 100) {
        setProgress(100);
        clearInterval(timer);
        setTimeout(() => onComplete?.(), 300);
      } else {
        setProgress(current);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 150,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0A0A1A 0%, #1a1a3e 100%)',
      animation: 'fadeIn 0.5s var(--ease)', gap: 'var(--space-xl)',
    }}>
      <div style={{ fontSize: '5rem' }} className="animate-float">
        {toIcon || '🏙️'}
      </div>
      <h2 className="gradient-text" style={{ fontSize: 'var(--fs-2xl)', textAlign: 'center' }}>
        Caminhando para...
      </h2>
      <p style={{ fontSize: 'var(--fs-xl)', color: 'var(--text-primary)', fontWeight: 600 }}>
        {toLocation}
      </p>
      <div style={{ width: '80%', maxWidth: '400px' }}>
        <div className="progress-bar" style={{ height: '12px' }}>
          <div className="progress-bar-fill" style={{ width: `${progress}%`, transition: 'none' }} />
        </div>
      </div>
      <div style={{ fontSize: '2rem', transform: `translateX(${(progress - 50) * 2}px)`, transition: 'transform 0.1s linear' }}>
        🚶
      </div>
    </div>
  );
}
