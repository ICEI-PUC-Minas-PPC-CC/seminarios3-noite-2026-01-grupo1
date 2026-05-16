import { useGame } from '../contexts/GameContext';
import Confetti from './Confetti';
import imgCristo from '../assets/images/cristo.png';
import imgJoao from '../assets/characters/joao.png';
import imgMaria from '../assets/characters/maria.png';
import { PHASES } from '../data/mockData';

export default function CompletionScreen() {
  const { completed, score, playerName, character, restartGame } = useGame();

  if (!completed) return null;

  const charImg = character === 'maria' ? imgMaria : imgJoao;

  return (
    <div className="completion-overlay">
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${imgCristo})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'blur(8px) brightness(0.15)',
        transform: 'scale(1.1)',
      }} />

      <Confetti active={true} />

      <div style={{
        textAlign: 'center', padding: 'var(--space-2xl)',
        maxWidth: '600px', zIndex: 1, position: 'relative',
      }}>
        <img src={charImg} alt={character === 'maria' ? 'Maria' : 'João'}
          style={{
            width: '100px', height: '100px', borderRadius: '50%',
            objectFit: 'cover', objectPosition: 'top', border: '4px solid var(--accent-light)',
            marginBottom: 'var(--space-lg)',
            boxShadow: '0 0 30px rgba(253, 203, 110, 0.4)',
          }} className="animate-float" />

        <h1 className="gradient-text animate-in"
          style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', marginBottom: 'var(--space-md)', lineHeight: 1.2 }}>
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

          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-2xl)', flexWrap: 'wrap', marginBottom: 'var(--space-lg)' }}>
            <div>
              <span style={{ fontSize: '2.5rem' }}>⭐</span>
              <p style={{ color: 'var(--accent-light)', fontWeight: 700, fontSize: 'var(--fs-xl)' }}>{score}</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>Pontos</p>
            </div>
            <div>
              <span style={{ fontSize: '2.5rem' }}>🗺️</span>
              <p style={{ color: 'var(--primary-light)', fontWeight: 700, fontSize: 'var(--fs-xl)' }}>{PHASES.length}</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>Locais</p>
            </div>
            <div>
              <span style={{ fontSize: '2.5rem' }}>🤟</span>
              <p style={{ color: 'var(--secondary)', fontWeight: 700, fontSize: 'var(--fs-xl)' }}>Libras</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>Aprendeu</p>
            </div>
          </div>

          <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--space-sm)',
          }}>
            {PHASES.map((phase) => (
              <span key={phase.id} style={{
                padding: 'var(--space-xs) var(--space-sm)',
                background: 'rgba(108, 92, 231, 0.15)',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--fs-xs)',
                color: 'var(--text-secondary)',
              }}>
                {phase.icon} {phase.name}
              </span>
            ))}
          </div>
        </div>

        <p style={{
          color: 'var(--secondary)', fontSize: 'var(--fs-lg)',
          fontWeight: 600, fontStyle: 'italic',
          marginBottom: 'var(--space-2xl)'
        }}>
          "Nossa cidade é linda, e fica ainda mais bonita quando aplicamos valores e respeitamos ela"
        </p>

        <button className="btn btn-primary" onClick={restartGame}
          style={{ fontSize: 'var(--fs-lg)', padding: 'var(--space-lg) var(--space-3xl)' }}>
          🔄 Jogar Novamente
        </button>
      </div>
    </div>
  );
}
