import { useState } from 'react';

export default function NameInputStep({ onSubmit, character }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length >= 2) onSubmit(name.trim());
  };

  return (
    <div className="animate-in">
      <div className="dialogue-box">
        <div className="dialogue-avatar" style={{
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem'
        }}>
          {character === 'maria' ? '👩' : '👦'}
        </div>
        <p className="dialogue-text">Bom dia! Qual o seu nome? 😊</p>
      </div>
      <form onSubmit={handleSubmit} style={{ marginTop: 'var(--space-lg)', display: 'flex', gap: 'var(--space-md)' }}>
        <input className="input-field" type="text" placeholder="Digite seu nome..."
          value={name} onChange={(e) => setName(e.target.value)} autoFocus maxLength={30} />
        <button className="btn btn-primary" type="submit" disabled={name.trim().length < 2}>✓</button>
      </form>
    </div>
  );
}
