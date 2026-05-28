import { useState } from 'react';
import imgMenina from '../../assets/characters/meninasemfundo.png';
import imgMenino from '../../assets/characters/meninosemfundo.png';

export default function NameInputStep({ onSubmit, character }) {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // 1. Conditional Rendering (Estado do Personagem)
  const charImg = character === 'maria' ? imgMenina : imgMenino;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length >= 2) {
      setSubmitted(true);
    }
  };

  const handleNext = () => {
    onSubmit(name.trim());
  };

  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      marginLeft: 'calc(-50vw + 50%)', // Força o contentor a esticar para fora do limite de 800px
      minHeight: '60vh',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      padding: '0 4rem'
    }} className="animate-in">
      
      {/* 2. Composição Visual - Personagem na lateral esquerda */}
      <div style={{
        flex: '0 0 40%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        height: '100%'
      }}>
        <img 
          src={charImg} 
          alt="Personagem Escolhido" 
          style={{ 
            maxHeight: '75vh', 
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 15px rgba(0,0,0,0.3))',
            background: 'transparent'
          }} 
        />
      </div>

      {/* 3. Interface de Diálogo e Input - Lado direito */}
      <div style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        marginBottom: '10vh'
      }}>
        <div className="dialogue-box" style={{ 
          width: '100%', 
          maxWidth: '650px', 
          backgroundColor: 'var(--bg-card)', 
          boxShadow: 'var(--shadow-lg)',
          padding: '3rem'
        }}>
          {!submitted ? (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                <p className="dialogue-text" style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', lineHeight: '1.2' }}>
                  Bom dia!<br/>Qual é o teu nome?
                </p>
              </div>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
                <input 
                  className="input-field" 
                  type="text" 
                  placeholder="Digite o teu nome..."
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  autoFocus 
                  maxLength={30}
                  style={{ fontSize: '1.5rem', padding: '1.2rem', textAlign: 'center' }}
                />
                <button 
                  className="btn btn-primary" 
                  type="submit" 
                  disabled={name.trim().length < 2}
                  style={{ fontSize: '1.5rem', padding: '1.2rem' }}
                >
                  Confirmar
                </button>
              </form>
            </>
          ) : (
            <>
              <p className="dialogue-text" style={{ fontSize: '2.5rem', marginBottom: '2.5rem', textAlign: 'center', fontWeight: 'bold', lineHeight: '1.2' }}>
                Prazer, {name}!<br/>Vamos dar um passeio?
              </p>
              <button 
                className="btn btn-primary" 
                onClick={handleNext}
                style={{ width: '100%', fontSize: '1.5rem', padding: '1.2rem' }}
              >
                Avançar ➜
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
