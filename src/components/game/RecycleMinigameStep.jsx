import { useState } from 'react';

export default function RecycleMinigameStep({ step, onCorrect, onWrong }) {
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (bin) => {
    if (selected) return;
    setSelected(bin.id);
    setShowFeedback(true);
    const correct = bin.id === step.correctBin;
    setTimeout(() => {
      if (correct) onCorrect(step.points || 15);
      else onWrong();
    }, 1800);
  };

  return (
    <div className="animate-in">
      <div className="dialogue-box" style={{ marginBottom: 'var(--space-lg)' }}>
        <p className="dialogue-text">🗑️ {step.text}</p>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
        <span style={{ fontSize: '3rem' }} className="animate-float">📄</span>
        <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-sm)' }}>Papel de bala</p>
      </div>

      <div className="bins-container">
        {step.bins.map((bin) => {
          let style = { borderColor: bin.color };
          if (selected) {
            if (bin.id === selected && bin.id === step.correctBin) {
              style.background = 'var(--success-bg)';
              style.borderColor = 'var(--success)';
              style.boxShadow = 'var(--shadow-success)';
            } else if (bin.id === selected && bin.id !== step.correctBin) {
              style.background = 'var(--error-bg)';
              style.borderColor = 'var(--error)';
            } else if (bin.id === step.correctBin && showFeedback) {
              style.borderColor = 'var(--success)';
            }
          }
          return (
            <div key={bin.id} className={`recycle-bin ${bin.id}`} style={style} onClick={() => handleSelect(bin)}>
              <span className="bin-icon">{bin.emoji}</span>
              <span className="bin-label" style={{ color: bin.color }}>{bin.label}</span>
            </div>
          );
        })}
      </div>

      {showFeedback && (
        <div className="card animate-scale" style={{
          marginTop: 'var(--space-lg)', textAlign: 'center',
          borderColor: selected === step.correctBin ? 'var(--success)' : 'var(--error)',
        }}>
          <p style={{
            color: selected === step.correctBin ? 'var(--success)' : 'var(--error)',
            fontSize: 'var(--fs-lg)', fontWeight: 600
          }}>
            {selected === step.correctBin ? '✅ ' : '❌ '}
            {selected === step.correctBin ? step.feedback.correct : step.feedback.wrong}
          </p>
        </div>
      )}
    </div>
  );
}
