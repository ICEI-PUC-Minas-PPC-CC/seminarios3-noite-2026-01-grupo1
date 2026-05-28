import { useState } from 'react';

import imgDesculpa from '../../assets/libras/desculpa.png';
import imgDia from '../../assets/libras/dia.png';
import imgFeio from '../../assets/libras/feio.png';
import imgObrigada from '../../assets/libras/obrigada.png';
import imgPorFavor from '../../assets/libras/porfavor.png';

const LIBRAS_IMAGES = {
  desculpa: imgDesculpa,
  dia: imgDia,
  feio: imgFeio,
  obrigada: imgObrigada,
  porfavor: imgPorFavor,
};

export default function LibrasImageQuizStep({ step, onCorrect, onWrong }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  const correctIds = step.options.filter((opt) => opt.correct).map((opt) => opt.id);

  const handleSelect = (opt) => {
    if (showFeedback && !isWrong) return;

    if (!opt.correct) {
      setSelectedIds([opt.id]);
      setIsWrong(true);
      setShowFeedback(true);
      onWrong();

      setTimeout(() => {
        setSelectedIds([]);
        setIsWrong(false);
        setShowFeedback(false);
      }, 1500);
      return;
    }

    if (selectedIds.includes(opt.id)) return;

    const newSelected = [...selectedIds, opt.id];
    setSelectedIds(newSelected);

    if (newSelected.length === correctIds.length) {
      setShowFeedback(true);
      setIsWrong(false);
      setTimeout(() => {
        onCorrect(step.points || 15);
      }, 1500);
    }
  };

  return (
    <div className="animate-in">
      <div className="dialogue-box" style={{ marginBottom: 'var(--space-lg)' }}>
        <p className="dialogue-text">🤟 {step.text}</p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 'var(--space-sm)',
          padding: 'var(--space-sm)',
          width: '100%',
        }}
      >
        {step.options.map((opt) => {
          const isSelected = selectedIds.includes(opt.id);
          let borderColor = 'var(--border)';

          if (isSelected) {
            borderColor = opt.correct ? 'var(--success)' : 'var(--error)';
          }

          return (
            <div
              key={opt.id}
              className={`card ${isSelected && !opt.correct ? 'flash-error' : ''} ${isSelected && opt.correct && selectedIds.length === correctIds.length ? 'flash-success' : ''}`}
              onClick={() => handleSelect(opt)}
              style={{
                textAlign: 'center',
                cursor: 'pointer',
                borderColor,
                padding: 'var(--space-xs)',
                transition: 'all 0.3s var(--ease)',
                transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '140px',
                background: isSelected && opt.correct ? 'rgba(0, 184, 148, 0.1)' : 'var(--bg-card)',
              }}
            >
              <img
                src={LIBRAS_IMAGES[opt.image]}
                alt="Sinal em Libras"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '120px',
                  objectFit: 'contain',
                  borderRadius: 'var(--radius-md)',
                }}
              />
            </div>
          );
        })}
      </div>

      {showFeedback && (
        <div
          className="card animate-scale"
          style={{
            marginTop: 'var(--space-lg)',
            textAlign: 'center',
            borderColor: isWrong ? 'var(--error)' : 'var(--success)',
            padding: 'var(--space-md)',
          }}
        >
          <p
            style={{
              color: isWrong ? 'var(--error)' : 'var(--success)',
              fontSize: 'var(--fs-lg)',
              fontWeight: 600,
            }}
          >
            {isWrong ? 'Tente novamente! Esse sinal nao e uma das palavras magicas.' : 'Excelente! Voce encontrou os dois sinais!'}
          </p>
        </div>
      )}
    </div>
  );
}
