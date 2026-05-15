import { useGame } from '../contexts/GameContext';

export default function GameOver() {
  const { gameOver, restartScene, restartGame, currentScene } = useGame();

  if (!gameOver) return null;

  return (
    <div className="game-over-overlay">
      <div className="game-over-card animate-scale">
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>💔</div>
        <h2 style={{ color: 'var(--error)' }}>Ops! Suas vidas acabaram!</h2>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: 'var(--fs-lg)',
          marginBottom: 'var(--space-2xl)',
          lineHeight: 1.6
        }}>
          Não desista! Todo mundo erra, o importante é tentar de novo.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', alignItems: 'center' }}>
          <button className="btn btn-primary" onClick={restartScene} style={{ width: '280px' }}>
            🔄 Tentar esta fase novamente
          </button>
          <button
            className="btn"
            onClick={restartGame}
            style={{
              background: 'transparent',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
              width: '280px'
            }}
          >
            🏠 Voltar ao início
          </button>
        </div>
      </div>
    </div>
  );
}
