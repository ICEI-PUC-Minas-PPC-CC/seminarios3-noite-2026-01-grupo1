export default function ProgressBar({ value = 0, label, style }) {
  return (
    <div style={style}>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </div>
      {label && (
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-xs)', marginTop: 'var(--space-xs)', textAlign: 'center' }}>
          {label}
        </p>
      )}
    </div>
  );
}
