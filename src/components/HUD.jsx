import { useGame } from '../contexts/GameContext';
import imgJoao from '../assets/characters/joao.png';
import imgMaria from '../assets/characters/maria.png';

export default function HUD() {
  const { lives, score, currentScene, character, backToMap, restartGame } = useGame();

  const locations = [
    'Boas-Vindas', 'Escola Tarso', 'João Pinheiro',
    'Urca', 'Relógio Floral', 'Praça Pedro Sanches', 'Bondinho/Cristo'
  ];

  if (currentScene === 0) return null;

  return (
    <div className="hud">
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
        <button onClick={backToMap} className="hud-back-btn" title="Voltar ao mapa">
          ←
        </button>
        <button onClick={() => {
          if (window.confirm('Tem certeza que deseja reiniciar o jogo todo?')) restartGame();
        }} className="hud-back-btn" title="Reiniciar jogo">
          🔄
        </button>
        <img
          src={character === 'maria' ? imgMaria : imgJoao}
          alt={character === 'maria' ? 'Maria' : 'João'}
          className="hud-avatar"
        />
      </div>

      <span className="phase-indicator">
        📍 {locations[currentScene] || ''}
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
        <div className="lives-container" aria-label={`${lives} vidas restantes`}>
          {[0, 1, 2].map((i) => (
            <span key={i} className={`heart ${i >= lives ? 'lost' : ''}`}
              role="img" aria-label={i < lives ? 'vida' : 'vida perdida'}>
              ❤️
            </span>
          ))}
        </div>
        <div className="score-display">
          ⭐ {score}
        </div>
      </div>
    </div>
  );
}
