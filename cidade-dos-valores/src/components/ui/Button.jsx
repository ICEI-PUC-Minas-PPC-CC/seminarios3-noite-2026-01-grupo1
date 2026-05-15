export default function Button({ children, variant = 'primary', onClick, disabled, style, className = '', ...props }) {
  const variantClass = variant === 'ghost' ? '' : `btn-${variant}`;
  const ghostStyle = variant === 'ghost' ? {
    background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border)',
  } : {};

  return (
    <button className={`btn ${variantClass} ${className}`}
      onClick={onClick} disabled={disabled} style={{ ...ghostStyle, ...style }} {...props}>
      {children}
    </button>
  );
}
