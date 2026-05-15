import { useState } from 'react';

export default function ChoiceStep({ step, onCorrect, onWrong }) {
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleChoice = (option) => {
    if (selected !== null) return;
    setSelected(option.id);
    setShowFeedback(true);
    setTimeout(() => {
      if (option.correct) onCorrect(step.points || 10);
      else onWrong();
    }, 1800);
  };

  return (
    <div className="animate-in">
      <div className="dialogue-box" style={{ marginBottom: 'var(--space-lg)' }}>
        <p className="dialogue-text">{step.text}</p>
      </div>
      <div className="choices-container">
        {step.options.map((opt) => {
          let className = 'btn btn-choice';
          if (selected !== null) {
            if (opt.id === selected && opt.correct) className += ' correct';
            else if (opt.id === selected && !opt.correct) className += ' wrong';
            else if (opt.correct && showFeedback) className += ' correct';
          }
          return (
            <button key={opt.id} className={className} onClick={() => handleChoice(opt)} disabled={selected !== null}>
              {opt.label}
            </button>
          );
        })}
      </div>
      {showFeedback && selected !== null && (
        <div className="card animate-scale" style={{
          marginTop: 'var(--space-md)',
          borderColor: step.options.find(o => o.id === selected)?.correct ? 'var(--success)' : 'var(--error)',
          textAlign: 'center'
        }}>
          <p style={{
            color: step.options.find(o => o.id === selected)?.correct ? 'var(--success)' : 'var(--error)',
            fontSize: 'var(--fs-lg)', fontWeight: 600
          }}>
            {step.options.find(o => o.id === selected)?.correct ? '✅ ' : '❌ '}
            {step.options.find(o => o.id === selected)?.feedback ||
              (step.options.find(o => o.id === selected)?.correct ? step.feedback?.correct : step.feedback?.wrong)}
          </p>
        </div>
      )}
    </div>
  );
}
