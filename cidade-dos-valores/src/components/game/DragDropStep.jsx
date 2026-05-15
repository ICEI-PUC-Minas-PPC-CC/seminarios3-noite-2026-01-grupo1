import { useState } from 'react';

export default function DragDropStep({ step, onCorrect, onWrong }) {
  const [slots, setSlots] = useState({});
  const [draggedWord, setDraggedWord] = useState(null);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleDrop = (slotId) => {
    if (draggedWord && !checked) {
      setSlots((prev) => ({ ...prev, [slotId]: draggedWord }));
      setDraggedWord(null);
    }
  };

  const handleCheck = () => {
    const dropSlots = step.textParts.filter(p => p.type === 'drop');
    const allCorrect = dropSlots.every(s => slots[s.id] === s.answer);
    setIsCorrect(allCorrect);
    setChecked(true);
    setTimeout(() => {
      if (allCorrect) onCorrect(step.points || 20);
      else {
        setSlots({});
        setChecked(false);
        onWrong();
      }
    }, 1800);
  };

  const allFilled = step.textParts.filter(p => p.type === 'drop').every(s => slots[s.id]);
  const placedWords = Object.values(slots);

  return (
    <div className="animate-in">
      <div className="dialogue-box" style={{ marginBottom: 'var(--space-lg)' }}>
        <p className="dialogue-text" style={{ lineHeight: 2.2 }}>
          {step.textParts.map((part, i) => {
            if (part.type === 'text') return <span key={i}>{part.value}</span>;
            return (
              <span key={i}
                className={`drop-zone ${draggedWord ? 'drag-over' : ''} ${slots[part.id] ? 'filled' : ''}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(part.id)}
                onClick={() => {
                  if (draggedWord && !checked) {
                    setSlots(prev => ({ ...prev, [part.id]: draggedWord }));
                    setDraggedWord(null);
                  }
                }}>
                {slots[part.id] || '???'}
              </span>
            );
          })}
        </p>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 'var(--space-lg)' }}>
        {step.words.map((word) => (
          <span key={word}
            className={`draggable-word ${placedWords.includes(word) ? 'placed' : ''}`}
            draggable={!placedWords.includes(word) && !checked}
            onDragStart={() => setDraggedWord(word)}
            onClick={() => {
              if (!placedWords.includes(word) && !checked)
                setDraggedWord(prev => prev === word ? null : word);
            }}
            style={{ outline: draggedWord === word ? '2px solid var(--secondary)' : 'none', outlineOffset: '2px' }}>
            {word}
          </span>
        ))}
      </div>

      {!checked && allFilled && (
        <button className="btn btn-success animate-scale" onClick={handleCheck} style={{ width: '100%' }}>
          Confirmar ✓
        </button>
      )}

      {checked && (
        <div className="card animate-scale" style={{
          textAlign: 'center', borderColor: isCorrect ? 'var(--success)' : 'var(--error)',
        }}>
          <p style={{ color: isCorrect ? 'var(--success)' : 'var(--error)', fontSize: 'var(--fs-lg)', fontWeight: 600 }}>
            {isCorrect ? '✅ ' : '❌ '}{isCorrect ? step.feedback.correct : step.feedback.wrong}
          </p>
        </div>
      )}
    </div>
  );
}
