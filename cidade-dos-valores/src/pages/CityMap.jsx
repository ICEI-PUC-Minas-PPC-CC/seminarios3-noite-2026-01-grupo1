import { useMemo } from 'react';
import { useGame } from '../contexts/GameContext';
import { PHASES } from '../data/mockData';
import '../styles/map.css';

export default function CityMap({ onStartPhase }) {
  const { currentScene, score, character, playerName } = useGame();
  const currentPhase = currentScene;

  const stars = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      size: 2 + Math.random() * 2,
    })),
  []);

  const getNodeStatus = (phaseId) => {
    if (phaseId < currentPhase) return 'completed';
    if (phaseId === currentPhase) return 'current';
    return 'locked';
  };

  const handleNodeClick = (phaseId) => {
    if (getNodeStatus(phaseId) === 'current') {
      onStartPhase?.(phaseId);
    }
  };

  return (
    <div className="city-map">
      <div className="map-stars">
        {stars.map((s) => (
          <div key={s.id} className="map-star"
            style={{ left: `${s.left}%`, top: `${s.top}%`,
              width: `${s.size}px`, height: `${s.size}px`, animationDelay: `${s.delay}s` }} />
        ))}
      </div>

      <div className="map-header">
        <h1 className="gradient-text">Cidade dos Valores</h1>
        <div className="map-player-info">
          <span className="avatar">{character === 'maria' ? '👩' : '👦'}</span>
          <span className="name">{playerName || 'Jogador'}</span>
          <span className="score">⭐ {score}</span>
        </div>
      </div>

      <div className="map-path">
        {PHASES.map((phase, index) => {
          const status = getNodeStatus(phase.id);
          const side = index % 2 === 0 ? 'left' : 'right';

          return (
            <div key={phase.id}>
              {index > 0 && (
                <div className={`map-connector ${index < currentPhase ? 'completed' : index === currentPhase - 1 ? 'current' : 'locked'}`}
                  style={{ margin: '0 auto' }} />
              )}

              <div className={`map-node ${status} ${side}`} onClick={() => handleNodeClick(phase.id)}>
                <div className="map-node-circle">
                  {phase.icon}
                  {status === 'completed' && <span className="map-node-check">✓</span>}
                  {status === 'locked' && <span className="map-node-lock">🔒</span>}
                </div>
                <div className="map-node-info">
                  <div className="phase-name">{phase.name}</div>
                  <div className="phase-theme">{phase.theme}</div>
                  {status === 'current' && (
                    <button className="map-play-btn" onClick={() => handleNodeClick(phase.id)}>
                      ▶ Jogar
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        <div className={`map-connector ${currentPhase > PHASES.length ? 'completed' : 'locked'}`}
          style={{ margin: '0 auto' }} />
        <div className={`map-finish ${currentPhase > PHASES.length ? '' : 'locked'}`}>
          <span className="finish-icon">🏆</span>
          <p className="gradient-text" style={{ fontWeight: 700 }}>Conclusão</p>
        </div>
      </div>
    </div>
  );
}
