import { useGame } from '../contexts/GameContext';

export default function HUD() {
  const { lives, score, currentScene } = useGame();

  const locations = [
    'Boas-Vindas', 'Escola Tarso', 'João Pinheiro',
    'Urca', 'Relógio Floral', 'Praça Pedro Sanches', 'Bondinho/Cristo'
  ];

  // Não mostrar o HUD na tela de boas-vindas
  if (currentScene === 0) return null;

  return (
    <div className="hud">
      <div className="lives-container" aria-label={`${lives} vidas restantes`}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`heart ${i >= lives ? 'lost' : ''}`}
            role="img"
            aria-label={i < lives ? 'vida' : 'vida perdida'}
          >
            ❤️
          </span>
        ))}
      </div>

      <span className="phase-indicator">
        📍 {locations[currentScene] || ''}
      </span>

      <div className="score-display">
        ⭐ {score}
      </div>
    </div>
  );
}
