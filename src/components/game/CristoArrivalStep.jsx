import imgMenina from '../../assets/characters/meninasemfundo.png';
import imgMenino from '../../assets/characters/meninosemfundo.png';

export default function CristoArrivalStep({ onNext, character }) {
  const charImg = character === 'maria' ? imgMenina : imgMenino;

  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        minHeight: '60vh',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        padding: '0 4rem',
        gap: '4rem',
      }}
      className="animate-in"
    >
      <div
        style={{
          flex: '0 0 auto',
          display: 'flex',
          alignItems: 'flex-end',
          height: '100%',
        }}
      >
        <img
          src={charImg}
          alt="Personagem escolhido"
          style={{
            maxHeight: '80vh',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 15px rgba(0,0,0,0.3))',
            background: 'transparent',
          }}
        />
      </div>

      <div
        style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingBottom: '10vh',
        }}
      >
        <div
          className="dialogue-box"
          style={{
            width: '100%',
            maxWidth: '900px',
            backgroundColor: 'var(--bg-card)',
            boxShadow: 'var(--shadow-lg)',
            padding: '3rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '2.5rem',
          }}
        >
          <p
            className="dialogue-text"
            style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              lineHeight: '1.5',
              textAlign: 'left',
            }}
          >
            Parabens! Voce completou todas as fases. Hoje aprendemos sobre obediencia, honestidade, respeito, educacao, organizacao e paciencia!
          </p>

          <button
            className="btn btn-primary"
            onClick={onNext}
            style={{
              width: '100%',
              fontSize: '1.6rem',
              padding: '1.2rem',
            }}
          >
            Concluir Jornada
          </button>
        </div>
      </div>
    </div>
  );
}
