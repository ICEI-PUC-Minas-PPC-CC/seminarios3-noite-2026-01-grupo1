import { useState } from 'react';

export default function LibrasQuizStep({ step, onCorrect, onWrong }) {
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [canRetry, setCanRetry] = useState(false);

  const handleSelect = (opt) => {
    if (selected !== null) return;
    setSelected(opt.id);
    setShowFeedback(true);
    setCanRetry(false);
    setTimeout(() => {
      if (opt.correct) onCorrect(step.points || 15);
      else {
        onWrong();
        setCanRetry(true);
      }
    }, 1800);
  };

  const handleRetry = () => {
    setSelected(null);
    setShowFeedback(false);
    setCanRetry(false);
  };

  const selectedOption = step.options.find((option) => option.id === selected);

  return (
    <div className="animate-in">
      <div className="dialogue-box" style={{ marginBottom: 'var(--space-lg)' }}>
        <p className="dialogue-text">🤟 {step.text}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${step.options.length}, 1fr)`, gap: 'var(--space-md)' }}>
        {step.options.map((opt) => {
          let borderColor = 'var(--border)';
          if (selected !== null) {
            if (opt.id === selected && opt.correct) borderColor = 'var(--success)';
            else if (opt.id === selected && !opt.correct) borderColor = 'var(--error)';
            else if (opt.correct && showFeedback) borderColor = 'var(--success)';
          }
          return (
            <div key={opt.id}
              className={`card ${selected === opt.id && !opt.correct ? 'flash-error' : ''} ${selected === opt.id && opt.correct ? 'flash-success' : ''}`}
              onClick={() => handleSelect(opt)}
              style={{
                textAlign: 'center', cursor: selected === null ? 'pointer' : 'default',
                borderColor, padding: 'var(--space-xl)',
                transition: 'all 0.3s var(--ease)',
                transform: selected === opt.id ? 'scale(1.05)' : 'scale(1)',
              }}>
              <span style={{ fontSize: '5rem', display: 'block', marginBottom: 'var(--space-sm)' }}>{opt.emoji}</span>
              <span style={{ fontWeight: 600, fontSize: 'var(--fs-lg)' }}>{opt.label}</span>
            </div>
          );
        })}
      </div>
      {showFeedback && (
        <div className="card animate-scale" style={{
          marginTop: 'var(--space-lg)', textAlign: 'center',
          borderColor: selectedOption?.correct ? 'var(--success)' : 'var(--error)',
        }}>
          <p style={{
            color: selectedOption?.correct ? 'var(--success)' : 'var(--error)',
            fontSize: 'var(--fs-lg)', fontWeight: 600
          }}>
            {step.options.find(o => o.id === selected)?.correct ? '✅ ' : '❌ '}
            {selectedOption?.correct ? step.feedback.correct : step.feedback.wrong}
          </p>
          {!selectedOption?.correct && canRetry && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleRetry}
              style={{ marginTop: 'var(--space-md)' }}
            >
              Tentar novamente
            </button>
          )}
        </div>
      )}
    </div>
  );
}
