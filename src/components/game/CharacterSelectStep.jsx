import { useState } from 'react';

export default function CharacterSelectStep({ onSelect }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="animate-in">
      <h2 style={{ textAlign: 'center', fontSize: 'var(--fs-2xl)', marginBottom: 'var(--space-xl)' }} className="gradient-text">
        Escolha seu personagem
      </h2>
      <div className="character-grid">
        {[
          { id: 'joao', name: 'João', emoji: '👦' },
          { id: 'maria', name: 'Maria', emoji: '👩' },
        ].map((char) => (
          <div key={char.id} className={`character-card ${selected === char.id ? 'selected' : ''}`}
            onClick={() => setSelected(char.id)}>
            <img src={char.img} alt={char.name} style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', marginBottom: 'var(--space-md)', border: '4px solid var(--border)' }} className="animate-float" />
            <span className="character-name" style={{ display: 'block' }}>{char.name}</span>
          </div>
        ))}
      </div>
      {selected && (
        <button className="btn btn-success animate-scale" onClick={() => onSelect(selected)}
          style={{ width: '100%', marginTop: 'var(--space-xl)', fontSize: 'var(--fs-xl)' }}>
          Começar a Jornada!
        </button>
      )}
    </div>
  );
}
