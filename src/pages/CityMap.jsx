import { useMemo } from 'react';
import { useGame } from '../contexts/useGame';
import { PHASES } from '../data/mockData';
import imgCristo from '../assets/images/cristo.png';
import '../styles/map.css';

function createSeededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function CityMap({ onStartPhase }) {
  const { currentScene, highestPhase, score, character, playerName } = useGame();
  const currentPhase = currentScene;

  const stars = useMemo(
    () => Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: createSeededRandom((i + 1) * 3) * 100,
      top: createSeededRandom((i + 1) * 5) * 100,
      delay: createSeededRandom((i + 1) * 7) * 3,
      size: 2 + createSeededRandom((i + 1) * 11) * 2,
    })),
    []
  );

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
        {stars.map((star) => (
          <div
            key={star.id}
            className="map-star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
            }}
          />
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
                <div
                  className={`map-connector ${index < currentPhase ? 'completed' : index === currentPhase - 1 ? 'current' : 'locked'}`}
                  style={{ margin: '0 auto' }}
                />
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

        <div
          className={`map-connector ${currentPhase > PHASES.length ? 'completed' : 'locked'}`}
          style={{ margin: '0 auto' }}
        />
        <div className={`map-finish ${highestPhase > PHASES.length ? '' : 'locked'}`}>
          <img src={imgCristo} alt="Cristo Redentor" className="map-finish-img" />
          <p className="gradient-text" style={{ fontWeight: 700 }}>Conclusao</p>
        </div>
      </div>
    </div>
  );
}
