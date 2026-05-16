import imgMenina from '../../assets/characters/meninasemfundo.png';
import imgMenino from '../../assets/characters/meninosemfundo.png';

export default function CristoArrivalStep({ step, onNext, character }) {
  const charImg = character === 'maria' ? imgMenina : imgMenino;

  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      marginLeft: 'calc(-50vw + 50%)', // Força o contentor a esticar para fora do limite de 800px
      minHeight: '60vh',
      alignItems: 'flex-end',
      justifyContent: 'flex-start', // Começa tudo na esquerda
      padding: '0 4rem',
      gap: '4rem', // Espaço entre o personagem e a caixa
    }} className="animate-in">
      
      {/* Composição Visual - Personagem na lateral esquerda */}
      <div style={{
        flex: '0 0 auto',
        display: 'flex',
        alignItems: 'flex-end',
        height: '100%'
      }}>
        <img 
          src={charImg} 
          alt="Personagem Escolhido" 
          style={{ 
            maxHeight: '80vh', 
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 15px rgba(0,0,0,0.3))',
            background: 'transparent'
          }} 
        />
      </div>

      {/* Interface de Diálogo e Mensagem Pedagógica - Mais Horizontal */}
      <div style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingBottom: '10vh'
      }}>
        <div className="dialogue-box" style={{ 
          width: '100%', 
          maxWidth: '900px', // Mais largo e horizontal
          backgroundColor: 'var(--bg-card)', 
          boxShadow: 'var(--shadow-lg)',
          padding: '3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '2.5rem'
        }}>
          
          <p className="dialogue-text" style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            lineHeight: '1.5', 
            textAlign: 'left' 
          }}>
            Parabéns! Você completou todas as fases. Hoje aprendemos sobre Obediência, Honestidade, Respeito, Educação, Organização e Paciência!
          </p>

          <button 
            className="btn btn-primary" 
            onClick={onNext}
            style={{ 
              width: '100%', 
              fontSize: '1.6rem', 
              padding: '1.2rem'
            }}
          >
            Concluir Jornada ➜
          </button>
          
        </div>
      </div>
    </div>
  );
}
