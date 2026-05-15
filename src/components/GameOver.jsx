import { useGame } from '../contexts/GameContext';
import imgJoao from '../assets/characters/joao.png';
import imgMaria from '../assets/characters/maria.png';

export default function GameOver() {
  const { gameOver, restartScene, restartGame, character, backToMap } = useGame();

  if (!gameOver) return null;

  return (
    <div className="game-over-overlay">
      <div className="game-over-card animate-scale">
        <img
          src={character === 'maria' ? imgMaria : imgJoao}
          alt="Personagem triste"
          style={{
            width: '120px', height: '120px', borderRadius: '50%',
            objectFit: 'cover', border: '4px solid var(--error)',
            filter: 'brightness(0.7) saturate(0.5)',
            marginBottom: 'var(--space-lg)',
          }}
        />
        <h2 style={{ color: 'var(--error)' }}>Ops! Suas vidas acabaram!</h2>
        <p style={{
          color: 'var(--text-secondary)', fontSize: 'var(--fs-lg)',
          marginBottom: 'var(--space-2xl)', lineHeight: 1.6
        }}>
          Não desista! Todo mundo erra, o importante é tentar de novo.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', alignItems: 'center' }}>
          <button className="btn btn-primary" onClick={restartScene} style={{ width: '280px' }}>
            🔄 Tentar esta fase novamente
          </button>
          <button className="btn" onClick={backToMap}
            style={{ background: 'transparent', color: 'var(--text-secondary)',
              border: '1px solid var(--border)', width: '280px' }}>
            🗺️ Voltar ao Mapa
          </button>
          <button className="btn" onClick={restartGame}
            style={{ background: 'transparent', color: 'var(--text-muted)',
              border: 'none', width: '280px', fontSize: 'var(--fs-sm)' }}>
            🏠 Recomeçar do início
          </button>
        </div>
      </div>
    </div>
  );
}
