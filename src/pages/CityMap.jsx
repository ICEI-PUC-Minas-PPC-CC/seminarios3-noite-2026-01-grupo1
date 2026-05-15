import { useMemo } from 'react';
import { useGame } from '../contexts/GameContext';
import { PHASES } from '../data/mockData';
import '../styles/map.css';

import imgEscola from '../assets/images/escola.png';
import imgJoaoPinheiro from '../assets/images/joao-pinheiro.png';
import imgUrca from '../assets/images/urca.png';
import imgRelogio from '../assets/images/relogio-floral.png';
import imgPraca from '../assets/images/praca.png';
import imgBondinho from '../assets/images/bondinho.png';
import imgCristo from '../assets/images/cristo.png';

const PHASE_IMAGES = {
  1: imgEscola,
  2: imgJoaoPinheiro,
  3: imgUrca,
  4: imgRelogio,
  5: imgPraca,
  6: imgBondinho,
};

export default function CityMap({ onStartPhase }) {
  const { highestPhase, score, character, playerName } = useGame();

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
    if (phaseId < highestPhase) return 'completed';
    if (phaseId === highestPhase) return 'current';
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
          <span className="name">{playerName || 'Jogador'}</span>
          <span className="score">⭐ {score}</span>
        </div>
      </div>

      <div className="map-path">
        {PHASES.map((phase, index) => {
          const status = getNodeStatus(phase.id);
          const side = index % 2 === 0 ? 'left' : 'right';
          const phaseImage = PHASE_IMAGES[phase.id];

          return (
            <div key={phase.id}>
              {index > 0 && (
                <div className={`map-connector ${index + 1 < highestPhase ? 'completed' : index + 1 === highestPhase ? 'current' : 'locked'}`}
                  style={{ margin: '0 auto' }} />
              )}

              <div className={`map-node ${status} ${side}`} onClick={() => handleNodeClick(phase.id)}>
                <div className="map-node-circle">
                  {phaseImage ? (
                    <img
                      src={phaseImage}
                      alt={phase.name}
                      className="map-node-img"
                    />
                  ) : (
                    phase.icon
                  )}
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

        <div className={`map-connector ${highestPhase > PHASES.length ? 'completed' : 'locked'}`}
          style={{ margin: '0 auto' }} />
        <div className={`map-finish ${highestPhase > PHASES.length ? '' : 'locked'}`}>
          <img src={imgCristo} alt="Cristo Redentor" className="map-finish-img" />
          <p className="gradient-text" style={{ fontWeight: 700 }}>Conclusão</p>
        </div>
      </div>
    </div>
  );
}
