import { useGame } from '../contexts/GameContext';
import Confetti from './Confetti';

export default function CompletionScreen() {
  const { completed, score, playerName, character, restartGame } = useGame();

  if (!completed) return null;

  return (
    <div className="completion-overlay">
      <Confetti active={true} />
      <div style={{ textAlign: 'center', padding: 'var(--space-2xl)', maxWidth: '600px', zIndex: 1 }}>
        <div style={{ fontSize: '6rem', marginBottom: 'var(--space-lg)' }} className="animate-float">
          🏆
        </div>
        <h1 className="gradient-text animate-in" style={{ fontSize: 'var(--fs-4xl)', marginBottom: 'var(--space-lg)' }}>
          Parabéns, {playerName || 'Jogador'}!
        </h1>
        <p style={{
          color: 'var(--text-secondary)', fontSize: 'var(--fs-xl)',
          lineHeight: 1.8, marginBottom: 'var(--space-xl)'
        }} className="animate-in">
          Você completou a jornada pela <strong style={{color: 'var(--secondary)'}}>Cidade dos Valores</strong>!
        </p>

        <div className="card animate-scale" style={{
          marginBottom: 'var(--space-2xl)',
          background: 'linear-gradient(135deg, var(--bg-card), rgba(108,92,231,0.1))',
          border: '2px solid var(--primary-light)',
        }}>
          <h3 style={{ fontSize: 'var(--fs-xl)', marginBottom: 'var(--space-lg)', color: 'var(--accent-light)' }}>
            📜 Certificado de Cidadania
          </h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-2xl)', flexWrap: 'wrap' }}>
            <div>
              <span style={{ fontSize: '2.5rem' }}>{character === 'maria' ? '👩' : '👦'}</span>
              <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-xs)' }}>Personagem</p>
            </div>
            <div>
              <span style={{ fontSize: '2.5rem' }}>⭐</span>
              <p style={{ color: 'var(--accent-light)', fontWeight: 700, fontSize: 'var(--fs-xl)' }}>{score}</p>
              <p style={{ color: 'var(--text-secondary)' }}>Pontos</p>
            </div>
            <div>
              <span style={{ fontSize: '2.5rem' }}>🗺️</span>
              <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-xs)' }}>7 locais</p>
            </div>
          </div>
        </div>

        <p style={{
          color: 'var(--secondary)', fontSize: 'var(--fs-lg)',
          fontWeight: 600, fontStyle: 'italic',
          marginBottom: 'var(--space-2xl)'
        }}>
          "Nossa cidade é linda, e fica ainda mais bonita quando praticamos valores e respeitamos a todos!"
        </p>

        <button className="btn btn-primary" onClick={restartGame}
                style={{ fontSize: 'var(--fs-lg)', padding: 'var(--space-lg) var(--space-3xl)' }}>
          🔄 Jogar Novamente
        </button>
      </div>
    </div>
  );
}
