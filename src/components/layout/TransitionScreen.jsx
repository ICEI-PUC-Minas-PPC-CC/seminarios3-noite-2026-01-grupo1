import { useState, useEffect } from 'react';
import { useGame } from '../../contexts/GameContext';
import mapImage from '../../assets/images/TransitionScreen.png';
import imgJoao from '../../assets/characters/joao.png';
import imgMaria from '../../assets/characters/maria.png';
import SCENES from '../../data/scenes';

// Posições baseadas na nova imagem do mapa (caminho pontilhado roxo)
// As coordenadas (x, y) são aproximadas com base na posição dos pins vermelhos e do caminho
const POSITIONS = [
  { x: 5, y: 65 },   // 0 (Start / Boas-Vindas - Perto da escola)
  { x: 5, y: 65 },   // 1 Escola (Primeiro pin vermelho à esquerda)
  { x: 33, y: 30 },  // 2 João Pinheiro (Segundo pin vermelho)
  { x: 76, y: 26 },  // 3 Urca (Terceiro pin vermelho)
  { x: 85, y: 26 },  // 4 Relógio (Quarto pin vermelho)
  { x: 94, y: 50 },  // 5 Praça (Ao longo do caminho azul descendo)
  { x: 94, y: 72 },  // 6 Cristo/Bondinho (Último pin perto da fonte)
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
