import { useState, useEffect } from 'react';

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
  { id: 'metal', src: lixoMetal, label: 'Metal' },
  { id: 'papel', src: lixoPapel, label: 'Papel' },
  { id: 'organico', src: lixoOrganico, label: 'Orgânico' },
  { id: 'plastico', src: lixoPlastico, label: 'Plástico' },
  { id: 'vidro', src: lixoVidro, label: 'Vidro' },
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
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (bin) => {
    if (selected) return;
    setSelected(bin.id);
    setShowFeedback(true);
    const correct = bin.id === step.correctBin;
    setTimeout(() => {
      if (correct) {
        onCorrect(step.points || 15);
      } else {
        onWrong();
        setSelected(null);
        setShowFeedback(false);
      }
    }, 1500);
  };

  return (
    <div className="animate-in" style={{ 
      background: 'var(--bg-card)', 
      padding: 'var(--space-xl)', 
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-lg)',
      textAlign: 'center'
    }}>
      <h2 className="gradient-text" style={{ 
        fontSize: 'var(--fs-2xl)', 
        fontWeight: 'bold',
        marginBottom: 'var(--space-lg)'
      }}>
        Desafio: Acerte o lixo correto!
      </h2>
      
      {/* Central Item */}
      <div style={{
        height: '160px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 'var(--space-2xl)'
      }}>
        <div style={{
          position: 'relative',
          padding: '10px',
          borderRadius: 'var(--radius-lg)',
          border: feedbackState === 'correct' ? '4px solid var(--success)' : 
                  feedbackState === 'wrong' ? '4px solid var(--error)' : 
                  selectedItem ? '4px solid var(--primary-light)' : '4px solid transparent',
          backgroundColor: feedbackState === 'correct' ? 'var(--success-bg)' : 
                           feedbackState === 'wrong' ? 'var(--error-bg)' : 
                           selectedItem ? 'rgba(255,255,255,0.05)' : 'transparent',
          transition: 'all 0.2s ease',
          animation: feedbackState === 'correct' ? 'pulse 0.5s' :
                     feedbackState === 'wrong' ? 'shake 0.5s' : 'none',
          cursor: 'grab'
        }}>
          <img 
            src={currentItem.src} 
            alt="Resíduo"
            draggable
            onDragStart={handleDragStart}
            onClick={handleItemClick}
            style={{
              width: '120px',
              height: '120px',
              objectFit: 'contain',
              animation: !feedbackState ? 'float 3s ease-in-out infinite' : 'none'
            }}
          />
        </div>
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
      
      <p style={{ marginTop: 'var(--space-xl)', color: 'var(--text-tertiary)', fontSize: 'var(--fs-sm)' }}>
        Restam: {items.length - currentItemIndex}
      </p>
    </div>
  );
}
