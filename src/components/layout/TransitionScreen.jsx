import { useEffect } from 'react';
import { useGame } from '../../contexts/useGame';
import SCENES from '../../data/scenes';
import mapImage from '../../assets/images/TransitionScreen.png';
import joaoImg from '../../assets/characters/joao.png';
import mariaImg from '../../assets/characters/maria.png';

const POSITIONS = [
  { x: 13.3, y: 73.2 },
  { x: 13.3, y: 73.2 },
  { x: 23.9, y: 42.2 },
  { x: 50.1, y: 22.5 },
  { x: 61.7, y: 49.3 },
  { x: 71.0, y: 68.9 },
  { x: 87.2, y: 29.2 },
];

export default function TransitionScreen({ show, fromScene, toScene, onComplete }) {
  const { character } = useGame();

  useEffect(() => {
    if (!show) return undefined;

    const timer = setTimeout(() => onComplete?.(), 2300);
    return () => clearTimeout(timer);
  }, [show, onComplete]);

  if (!show) return null;

  const charImg = character === 'João' ? joaoImg : mariaImg;
  const fromPos = POSITIONS[fromScene] || POSITIONS[0];
  const toPos = POSITIONS[toScene] || POSITIONS[fromScene] || POSITIONS[0];
  const nextSceneName = SCENES[toScene]?.location || 'o próximo destino';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 150,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(18, 24, 32, 0.98)',
        animation: 'fadeIn 0.4s var(--ease)',
        padding: 'var(--space-md)',
      }}
    >
      <h2
        className="gradient-text animate-in"
        style={{ fontSize: 'var(--fs-2xl)', marginBottom: 'var(--space-xl)', textAlign: 'center' }}
      >
        Caminhando para {nextSceneName}...
      </h2>

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '900px',
          aspectRatio: '2/1',
          borderRadius: 'var(--radius-xl)',
          border: '4px solid var(--border)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          background: 'var(--bg-card)',
        }}
      >
        <img
          src={mapImage}
          alt="Mapa da Cidade"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.9,
            filter: 'saturate(0.7) contrast(1.1) brightness(0.9) sepia(0.1)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: `${fromPos.x}%`,
            top: `${fromPos.y}%`,
            transform: 'translate(-50%, -100%)',
            zIndex: 10,
            animation: 'transitionMove 2s linear forwards',
          }}
        >
          <img
            src={charImg}
            alt="Personagem"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: '3px solid var(--primary-light)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              backgroundColor: 'var(--bg-card)',
              objectFit: 'cover',
              objectPosition: 'top',
            }}
          />
          <div
            style={{
              fontSize: '1.5rem',
              textAlign: 'center',
              marginTop: '-10px',
              animation: 'bounce 1s infinite',
            }}
          >
            📍
          </div>
        </div>
      </div>

      <div style={{ width: '80%', maxWidth: '400px', marginTop: 'var(--space-xl)' }}>
        <div className="progress-bar" style={{ height: '12px', overflow: 'hidden' }}>
          <div
            className="progress-bar-fill"
            style={{
              width: '100%',
              transformOrigin: 'left',
              animation: 'transitionProgress 2s linear forwards',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes transitionProgress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        @keyframes transitionMove {
          from { left: ${fromPos.x}%; top: ${fromPos.y}%; }
          to { left: ${toPos.x}%; top: ${toPos.y}%; }
        }
      `}</style>
    </div>
  );
}
