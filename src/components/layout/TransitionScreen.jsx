import { useState, useEffect, useMemo } from 'react';
import { useGame } from '../../contexts/GameContext';
import SCENES from '../../data/scenes';
import mapImage from '../../assets/images/TransitionScreen.png';
import joaoImg from '../../assets/characters/joao.png';
import mariaImg from '../../assets/characters/maria.png';

// Posições baseadas na nova imagem do mapa (caminho pontilhado roxo)
// As coordenadas (x, y) são aproximadas com base na posição dos pins vermelhos e do caminho
const POSITIONS = [
  { x: 13.3, y: 73.2 },  // 0 (Start / Boas-Vindas - Mesma posição da escola)
  { x: 13.3, y: 73.2 },  // 1 Escola Tarso de Coimbra
  { x: 23.9, y: 42.2 },  // 2 Avenida João Pinheiro
  { x: 50.1, y: 22.5 },  // 3 Espaço Cultural da Urca
  { x: 61.7, y: 49.3 },  // 4 Relógio Floral
  { x: 71.0, y: 68.9 },  // 5 Praça do Palace
  { x: 87.2, y: 29.2 },  // 6 Bondinho / Cristo
];

export default function TransitionScreen({ show, fromScene, toScene, onComplete }) {
  const { character } = useGame();
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

  const charImg = character === 'João' ? joaoImg : mariaImg;
  
  const fromPos = POSITIONS[fromScene] || POSITIONS[0];
  const toPos = POSITIONS[toScene] || POSITIONS[fromScene] || POSITIONS[0];

  const currentX = fromPos.x + (toPos.x - fromPos.x) * (progress / 100);
  const currentY = fromPos.y + (toPos.y - fromPos.y) * (progress / 100);

  const nextSceneName = SCENES[toScene]?.location || 'o próximo destino';

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 150,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'rgba(18, 24, 32, 0.98)',
      animation: 'fadeIn 0.4s var(--ease)',
      padding: 'var(--space-md)'
    }}>
      <h2 className="gradient-text animate-in" style={{ fontSize: 'var(--fs-2xl)', marginBottom: 'var(--space-xl)', textAlign: 'center' }}>
        Caminhando para {nextSceneName}...
      </h2>

      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '900px',
        aspectRatio: '2/1',
        borderRadius: 'var(--radius-xl)',
        border: '4px solid var(--border)',
        boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden',
        background: 'var(--bg-card)'
      }}>
        <img 
          src={mapImage} 
          alt="Mapa da Cidade" 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            opacity: 0.9,
            filter: 'saturate(0.7) contrast(1.1) brightness(0.9) sepia(0.1)'
          }} 
        />
        
        {/* Marcador do personagem andando */}
        <div style={{
          position: 'absolute',
          left: `${currentX}%`,
          top: `${currentY}%`,
          transform: 'translate(-50%, -100%)',
          zIndex: 10,
          transition: 'none'
        }}>
          <img src={charImg} alt="Personagem" style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: '3px solid var(--primary-light)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            backgroundColor: 'var(--bg-card)',
            objectFit: 'cover'
          }} />
          {/* Seta animada embaixo do avatar */}
          <div style={{ 
            fontSize: '1.5rem', 
            textAlign: 'center', 
            marginTop: '-10px',
            animation: 'bounce 1s infinite'
          }}>
            📍
          </div>
        </div>
      </div>

      <div style={{ width: '80%', maxWidth: '400px', marginTop: 'var(--space-xl)' }}>
        <div className="progress-bar" style={{ height: '12px' }}>
          <div className="progress-bar-fill" style={{ width: `${progress}%`, transition: 'none' }} />
        </div>
      </div>
    </div>
  );
}
