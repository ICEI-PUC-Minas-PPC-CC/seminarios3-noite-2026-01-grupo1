export default function Card({ children, style, className = '', onClick, ...props }) {
  return (
    <div className={`card ${className}`} style={style} onClick={onClick} {...props}>
      {children}
    </div>
  );
}
