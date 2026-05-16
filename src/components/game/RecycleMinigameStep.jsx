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
  const [items, setItems] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [feedbackState, setFeedbackState] = useState(null); // 'correct' | 'wrong' | null
  const [selectedItem, setSelectedItem] = useState(false);

  useEffect(() => {
    // Embaralha os 10 itens iniciais
    const shuffled = [...ALL_ITEMS].sort(() => Math.random() - 0.5);
    setItems(shuffled);
  }, []);

  const currentItem = items[currentItemIndex];

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', currentItem.type);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const processDrop = (binId) => {
    if (!currentItem || feedbackState) return;
    setSelectedItem(false);

    if (currentItem.type === binId) {
      setFeedbackState('correct');
      setTimeout(() => {
        setFeedbackState(null);
        if (currentItemIndex + 1 < items.length) {
          setCurrentItemIndex(idx => idx + 1);
        } else {
          onCorrect(step.points || 50);
        }
      }, 600); // tempo para o flash verde piscar
    } else {
      setFeedbackState('wrong');
      onWrong();
      setTimeout(() => {
        setFeedbackState(null);
      }, 600); // tempo para o flash vermelho/shake
    }
  };

  const handleDrop = (e, binId) => {
    e.preventDefault();
    const draggedType = e.dataTransfer.getData('text/plain');
    if (!draggedType) return;
    processDrop(binId);
  };

  // Suporte a toques na tela (Fallback se drag and drop falhar)
  const handleItemClick = () => {
    setSelectedItem(true);
  };
  const handleBinClick = (binId) => {
    if (selectedItem) {
      processDrop(binId);
    }
  };

  if (!currentItem) return null;

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

      {/* Bins */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 'var(--space-md)',
        flexWrap: 'wrap'
      }}>
        {BINS.map(bin => (
          <div 
            key={bin.id}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, bin.id)}
            onClick={() => handleBinClick(bin.id)}
            className="card"
            style={{
              width: '100px',
              padding: 'var(--space-sm)',
              textAlign: 'center',
              cursor: selectedItem ? 'pointer' : 'default',
              borderColor: selectedItem ? 'var(--primary-light)' : 'var(--border)'
            }}
          >
            <img 
              src={bin.src} 
              alt={bin.label}
              style={{
                width: '100%',
                height: '80px',
                objectFit: 'contain'
              }}
              draggable={false}
            />
            <p style={{
              marginTop: '8px',
              fontSize: 'var(--fs-sm)',
              fontWeight: 'bold',
              color: 'var(--text-secondary)'
            }}>
              {bin.label}
            </p>
          </div>
        ))}
      </div>
      
      <p style={{ marginTop: 'var(--space-xl)', color: 'var(--text-tertiary)', fontSize: 'var(--fs-sm)' }}>
        Restam: {items.length - currentItemIndex}
      </p>
    </div>
  );
}
