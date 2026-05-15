import { useState } from 'react';
import config from '../config';
import imgCristo from '../assets/images/cristo.png';

export default function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin?.({ id: 'form-uuid', email: email || 'jogador@cv.com', nome: nome || 'Jogador' });
    }, config.isMock ? config.mockDelayMs : 0);
  };

  const handleGuestLogin = () => {
    onLogin?.({ id: 'guest-uuid', email: 'visitante@cv.com', nome: 'Visitante' });
  };

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${imgCristo})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'blur(6px) brightness(0.25)',
        transform: 'scale(1.1)',
      }} />

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(10,10,26,0.85) 0%, rgba(108,92,231,0.15) 50%, rgba(10,10,26,0.9) 100%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: 'var(--space-xl)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }} className="animate-in">
          <h1 className="gradient-text" style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', marginBottom: 'var(--space-sm)', lineHeight: 1.2 }}>
            {config.appName}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-md)' }}>
            Centro Tarso de Coimbra • Poços de Caldas
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-sm)', marginTop: 'var(--space-xs)' }}>
            Uma jornada de cidadania e valores 🤟
          </p>
        </div>

        {config.enableAuth && (
          <div className="card animate-scale" style={{ width: '100%', maxWidth: '400px', padding: 'var(--space-2xl)' }}>
            <h2 style={{ textAlign: 'center', fontSize: 'var(--fs-xl)', marginBottom: 'var(--space-xl)' }}>
              {isRegister ? '📝 Criar Conta' : '👋 Entrar'}
            </h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {isRegister && (
                <input className="input-field" type="text" placeholder="Seu nome"
                  value={nome} onChange={(e) => setNome(e.target.value)} />
              )}
              <input className="input-field" type="email" placeholder="Email"
                value={email} onChange={(e) => setEmail(e.target.value)} />
              <input className="input-field" type="password" placeholder="Senha"
                value={password} onChange={(e) => setPassword(e.target.value)} />
              <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%' }}>
                {loading ? '⏳ Carregando...' : (isRegister ? 'Criar Conta' : 'Entrar')}
              </button>
            </form>
            <div style={{ textAlign: 'center', marginTop: 'var(--space-lg)' }}>
              <button onClick={() => setIsRegister(!isRegister)}
                style={{ background: 'none', border: 'none', color: 'var(--primary-light)',
                  cursor: 'pointer', fontFamily: 'var(--font)', fontSize: 'var(--fs-sm)' }}>
                {isRegister ? 'Já tem conta? Entrar' : 'Não tem conta? Criar'}
              </button>
            </div>
          </div>
        )}

        {!config.enableAuth && (
          <button className="btn btn-primary animate-scale" onClick={handleGuestLogin}
            style={{ fontSize: 'var(--fs-xl)', padding: 'var(--space-lg) var(--space-3xl)',
              boxShadow: '0 0 40px rgba(108, 92, 231, 0.4)' }}>
            🎮 Começar a Jogar
          </button>
        )}

        {config.enableAuth && config.isMock && (
          <button className="btn animate-in" onClick={handleGuestLogin}
            style={{ marginTop: 'var(--space-xl)', background: 'transparent',
              color: 'var(--text-muted)', border: '1px solid var(--border)', fontSize: 'var(--fs-md)' }}>
            🎮 Entrar como Visitante
          </button>
        )}
      </div>

      <p style={{ position: 'absolute', bottom: 'var(--space-md)', zIndex: 1,
        color: 'var(--text-muted)', fontSize: 'var(--fs-xs)' }}>
        v{config.appVersion}
      </p>
    </div>
  );
}
