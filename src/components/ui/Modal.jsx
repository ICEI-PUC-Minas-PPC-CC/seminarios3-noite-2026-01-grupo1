import { useEffect } from 'react';

export default function Modal({ children, isOpen, onClose, style }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => { if (e.key === 'Escape' && onClose) onClose(); };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div style={{
        position: 'fixed', inset: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(10, 10, 26, 0.9)', animation: 'fadeIn 0.3s var(--ease)',
      }}
      onClick={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }}>
      <div className="card animate-scale" style={{ maxWidth: '500px', width: '90%', ...style }}>
        {children}
      </div>
    </div>
  );
}
