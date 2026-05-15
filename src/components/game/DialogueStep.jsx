export default function DialogueStep({ step, onNext, character, playerName }) {
  const text = step.textTemplate
    ? step.textTemplate.replace('{playerName}', playerName || 'Jogador')
    : step.text;

  return (
    <div className="animate-in">
      <div className="dialogue-box">
        {step.character && (
          <div className="dialogue-avatar" style={{
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem',
          }}>
            {character === 'maria' ? '👩' : '👦'}
          </div>
        )}
        <div style={{ flex: 1 }}>
          <p className="dialogue-text">{text}</p>
          {step.subtext && (
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-sm)', fontSize: 'var(--fs-md)' }}>
              {step.subtext}
            </p>
          )}
        </div>
      </div>
      {step.showRules && (
        <div style={{ display: 'flex', gap: 'var(--space-xl)', justifyContent: 'center', margin: 'var(--space-xl) 0' }}
          className="animate-in">
          {[
            { icon: '❤️', label: '3 Vidas' },
            { icon: '🗺️', label: '6 Locais' },
            { icon: '🤟', label: 'Libras' },
          ].map((rule, i) => (
            <div key={i} className="card" style={{ textAlign: 'center', padding: 'var(--space-lg)', minWidth: '100px' }}>
              <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: 'var(--space-sm)' }}>{rule.icon}</span>
              <span style={{ fontWeight: 600 }}>{rule.label}</span>
            </div>
          ))}
        </div>
      )}
      <button className="btn btn-primary" onClick={onNext} style={{ width: '100%', marginTop: 'var(--space-md)' }}>
        Continuar ➜
      </button>
    </div>
  );
}
