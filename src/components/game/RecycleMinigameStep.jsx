import { useMemo, useState } from 'react';

import lixoMetal from '../../assets/images/lixometal.png';
import lixoPapel from '../../assets/images/lixopapel.png';
import lixoOrganico from '../../assets/images/lixoorganico.png';
import lixoPlastico from '../../assets/images/lixoplastico.png';
import lixoVidro from '../../assets/images/lixovidro.png';

import metal1 from '../../assets/images/metal1.png';
import metal2 from '../../assets/images/metal2.png';
import papel1 from '../../assets/images/papel1.png';
import papel2 from '../../assets/images/papel2.png';
import organico1 from '../../assets/images/organico1.png';
import organico2 from '../../assets/images/organico2.png';
import plastico1 from '../../assets/images/plastico1.png';
import plastico2 from '../../assets/images/plastico2.png';
import vidro1 from '../../assets/images/vidro1.png';
import vidro2 from '../../assets/images/vidro2.png';

const BINS = [
  { id: 'metal', src: lixoMetal, label: 'Metal', color: '#95A5A6' },
  { id: 'papel', src: lixoPapel, label: 'Papel', color: '#3498DB' },
  { id: 'organico', src: lixoOrganico, label: 'Organico', color: '#8BC34A' },
  { id: 'plastico', src: lixoPlastico, label: 'Plastico', color: '#F1C40F' },
  { id: 'vidro', src: lixoVidro, label: 'Vidro', color: '#2ECC71' },
];

const ALL_ITEMS = [
  { id: 'metal1', src: metal1, type: 'metal' },
  { id: 'metal2', src: metal2, type: 'metal' },
  { id: 'papel1', src: papel1, type: 'papel' },
  { id: 'papel2', src: papel2, type: 'papel' },
  { id: 'organico1', src: organico1, type: 'organico' },
  { id: 'organico2', src: organico2, type: 'organico' },
  { id: 'plastico1', src: plastico1, type: 'plastico' },
  { id: 'plastico2', src: plastico2, type: 'plastico' },
  { id: 'vidro1', src: vidro1, type: 'vidro' },
  { id: 'vidro2', src: vidro2, type: 'vidro' },
];

export default function RecycleMinigameStep({ step, onCorrect, onWrong }) {
  const items = useMemo(() => [...ALL_ITEMS].sort((a, b) => a.id.localeCompare(b.id)), []);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [selectedBinId, setSelectedBinId] = useState(null);
  const [feedbackState, setFeedbackState] = useState(null);

  const currentItem = items[currentItemIndex];

  const handleSelect = (bin) => {
    if (!currentItem || feedbackState) return;

    const isCorrect = bin.id === currentItem.type;
    setSelectedBinId(bin.id);
    setFeedbackState(isCorrect ? 'correct' : 'wrong');

    setTimeout(() => {
      if (!isCorrect) {
        onWrong();
        setSelectedBinId(null);
        setFeedbackState(null);
        return;
      }

      const nextIndex = currentItemIndex + 1;
      if (nextIndex >= items.length) {
        onCorrect(step.points || 50);
        return;
      }

      setCurrentItemIndex(nextIndex);
      setSelectedBinId(null);
      setFeedbackState(null);
    }, 900);
  };

  if (!currentItem) return null;

  return (
    <div
      className="animate-in"
      style={{
        background: 'var(--bg-card)',
        padding: 'var(--space-xl)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-lg)',
        textAlign: 'center',
      }}
    >
      <h2
        className="gradient-text"
        style={{
          fontSize: 'var(--fs-2xl)',
          fontWeight: 'bold',
          marginBottom: 'var(--space-lg)',
        }}
      >
        Desafio: acerte a lixeira correta!
      </h2>

      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)' }}>
        Escolha onde este residuo deve ser descartado.
      </p>

      <div
        style={{
          height: '160px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 'var(--space-2xl)',
        }}
      >
        <div
          style={{
            padding: '10px',
            borderRadius: 'var(--radius-lg)',
            border:
              feedbackState === 'correct'
                ? '4px solid var(--success)'
                : feedbackState === 'wrong'
                  ? '4px solid var(--error)'
                  : '4px solid transparent',
            backgroundColor:
              feedbackState === 'correct'
                ? 'rgba(0, 184, 148, 0.12)'
                : feedbackState === 'wrong'
                  ? 'rgba(214, 48, 49, 0.12)'
                  : 'transparent',
            transition: 'all 0.2s ease',
          }}
        >
          <img
            src={currentItem.src}
            alt="Residuo"
            style={{
              width: '120px',
              height: '120px',
              objectFit: 'contain',
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
          gap: 'var(--space-md)',
        }}
      >
        {BINS.map((bin) => {
          const isSelected = selectedBinId === bin.id;
          const isCorrectSelection = isSelected && feedbackState === 'correct';
          const isWrongSelection = isSelected && feedbackState === 'wrong';

          return (
            <button
              key={bin.id}
              type="button"
              onClick={() => handleSelect(bin)}
              style={{
                background: isCorrectSelection
                  ? 'rgba(0, 184, 148, 0.12)'
                  : isWrongSelection
                    ? 'rgba(214, 48, 49, 0.12)'
                    : 'var(--bg-elevated)',
                border: `2px solid ${isCorrectSelection ? 'var(--success)' : isWrongSelection ? 'var(--error)' : bin.color}`,
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-md)',
                cursor: feedbackState ? 'default' : 'pointer',
              }}
              disabled={!!feedbackState}
            >
              <img
                src={bin.src}
                alt={bin.label}
                style={{ width: '72px', height: '72px', objectFit: 'contain', marginBottom: 'var(--space-sm)' }}
              />
              <div style={{ color: bin.color, fontWeight: 700 }}>{bin.label}</div>
            </button>
          );
        })}
      </div>

      <p style={{ marginTop: 'var(--space-xl)', color: 'var(--text-tertiary)', fontSize: 'var(--fs-sm)' }}>
        Restam: {items.length - currentItemIndex}
      </p>
    </div>
  );
}
