export default function FinaleStep({ step, onComplete }) {
  return (
    <div className="animate-in" style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '6rem', marginBottom: 'var(--space-lg)' }} className="animate-float">🗽</div>
      <h2 className="gradient-text" style={{ fontSize: 'var(--fs-3xl)', marginBottom: 'var(--space-lg)' }}>
        {step.text}
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-xl)', marginBottom: 'var(--space-2xl)' }}>
        {step.subtext}
      </p>
      <button className="btn btn-success" onClick={onComplete}
        style={{ fontSize: 'var(--fs-xl)', padding: 'var(--space-lg) var(--space-3xl)' }}>
        🎉 Concluir Jornada
      </button>
    </div>
  );
}
