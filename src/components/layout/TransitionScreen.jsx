import { useState, useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';
import mapImage from '../../assets/images/TransitionScreen.png';
import imgJoao from '../../assets/characters/joao.png';
import imgMaria from '../../assets/characters/maria.png';
import SCENES from '../../data/scenes';

// Posições aproximadas de cada fase na imagem do mapa.
// 0: Boas-Vindas
// 1: Escola Tarso
// 2: João Pinheiro
// 3: Urca
// 4: Relógio Floral
// 5: Praça Pedro Sanches
// 6: Bondinho/Cristo
const POSITIONS = [
  { x: 5, y: 70 },   // 0 (Start)
  { x: 10, y: 65 },  // 1 Escola
  { x: 30, y: 55 },  // 2 João Pinheiro
  { x: 50, y: 45 },  // 3 Urca
  { x: 70, y: 35 },  // 4 Relógio
  { x: 80, y: 25 },  // 5 Praça
  { x: 92, y: 70 },  // 6 Cristo/Bondinho
];

export default function TransitionScreen({ show, fromScene, toScene, onComplete }) {
  const { character } = useGame();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!show) { setProgress(0); return; }

    const duration = 2500; // Duração da animação
    const interval = 16; // ~60fps
    const step = (interval / duration) * 100;
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= 100) {
        setProgress(100);
        clearInterval(timer);
        setTimeout(() => onComplete?.(), 500); // Pausa antes de mudar de cena
      } else {
        setProgress(current);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [show, onComplete]);

  if (!show) return null;

  const charImg = character === 'maria' ? imgMaria : imgJoao;
  
  // Garantir limites
  const safeFrom = Math.min(Math.max(0, fromScene), POSITIONS.length - 1);
  const safeTo = Math.min(Math.max(0, toScene), POSITIONS.length - 1);
  
  const startPos = POSITIONS[safeFrom];
  const endPos = POSITIONS[safeTo];

  const currentX = startPos.x + (endPos.x - startPos.x) * (progress / 100);
  const currentY = startPos.y + (endPos.y - startPos.y) * (progress / 100);

  const nextSceneName = SCENES[safeTo]?.location || 'Próximo Local';

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 150,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'rgba(10, 10, 26, 0.95)',
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
        background: '#fff'
      }}>
        <img 
          src={mapImage} 
          alt="Mapa da Cidade" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} 
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
      
      {/* Barra de progresso */}
      <div style={{ width: '80%', maxWidth: '400px', marginTop: 'var(--space-xl)' }}>
        <div className="progress-bar" style={{ height: '12px' }}>
          <div className="progress-bar-fill" style={{ width: `${progress}%`, transition: 'none' }} />
        </div>
      </div>
    </div>
  );
}
