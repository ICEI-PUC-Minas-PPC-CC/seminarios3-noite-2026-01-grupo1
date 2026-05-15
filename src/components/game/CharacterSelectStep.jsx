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
            <span className="character-emoji">{char.emoji}</span>
            <span className="character-name">{char.name}</span>
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
