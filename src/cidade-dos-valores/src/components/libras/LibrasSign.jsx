export default function LibrasSign({ sinal, gifUrl, altText, autoPlay = true }) {
  if (gifUrl) {
    return (
      <div className="libras-sign animate-in" style={{
        display: 'inline-flex', alignItems: 'center', gap: 'var(--space-sm)',
        padding: 'var(--space-sm) var(--space-md)',
        background: 'rgba(108, 92, 231, 0.1)',
        borderRadius: 'var(--radius-md)', border: '1px solid var(--border)',
      }}>
        <img src={gifUrl} alt={altText || `Sinal de ${sinal} em Libras`}
          style={{ height: '48px', borderRadius: 'var(--radius-sm)' }} loading="lazy" />
        <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>
          🤟 {sinal?.toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <span className="libras-sign"
      style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-xs)',
        fontSize: 'var(--fs-sm)', color: 'var(--primary-light)', opacity: 0.8 }}
      title={`Sinal: ${sinal}`}>
      🤟
    </span>
  );
}
