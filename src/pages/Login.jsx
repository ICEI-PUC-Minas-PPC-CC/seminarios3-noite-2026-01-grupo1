import { useState } from 'react';
import config from '../config';
import imgCristo from '../assets/images/cristo.png';

export default function Login({ onLogin }) {
  const auth = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = isRegister
        ? await auth.signUp(nome || username, username, password)
        : await auth.signIn(username, password);

      const user = data?.user ?? auth.user;
      const displayName =
        user?.user_metadata?.nome ||
        user?.user_metadata?.username ||
        username ||
        'Jogador';

      onLogin?.({ id: user?.id, email: user?.email, nome: displayName });
    } catch (err) {
      setError(err?.message || 'Falha ao autenticar');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    onLogin?.({ id: 'guest-uuid', email: 'visitante@cv.com', nome: 'Visitante' });
  };

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0A0A1A 0%, #1a1a3e 50%, #0A0A1A 100%)',
      padding: 'var(--space-xl)',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }} className="animate-in">
        <div style={{ fontSize: '4rem', marginBottom: 'var(--space-md)' }} className="animate-float">
          🏙️
        </div>
        <h1 className="gradient-text" style={{ fontSize: 'var(--fs-3xl)', marginBottom: 'var(--space-xs)' }}>
          {config.appName}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-md)' }}>
          Centro Tarso de Coimbra • Poços de Caldas
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
          style={{ fontSize: 'var(--fs-xl)', padding: 'var(--space-lg) var(--space-3xl)' }}>
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

      <p style={{ position: 'absolute', bottom: 'var(--space-md)',
        color: 'var(--text-muted)', fontSize: 'var(--fs-xs)' }}>
        v{config.appVersion}
      </p>
    </div>
  );
}
