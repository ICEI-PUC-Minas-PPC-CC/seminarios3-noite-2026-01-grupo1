import { useState } from 'react';
import config from '../config';
import { useAuth } from '../contexts/useAuth';

export default function Login({ onLogin }) {
  const auth = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = isRegister
        ? await auth.signUp(nome, username, password)
        : await auth.signIn(username, password);

      const user = data?.user ?? auth.user;
      const displayName = user?.user_metadata?.nome || username || 'Jogador';

      onLogin?.({ id: user?.id, username, nome: displayName });
    } catch (err) {
      console.error(err?.message || 'Falha ao autenticar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0A0A1A 0%, #1a1a3e 50%, #0A0A1A 100%)',
        padding: 'var(--space-xl)',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }} className="animate-in">
        <h1 className="gradient-text" style={{ fontSize: 'var(--fs-3xl)' }}>{config.appName}</h1>
      </div>

      {config.enableAuth && (
        <div className="card animate-scale" style={{ width: '100%', maxWidth: '400px', padding: 'var(--space-2xl)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            {isRegister && (
              <input
                className="input-field"
                type="text"
                placeholder="Nome de exibicao"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
              />
            )}
            <input
              className="input-field"
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <input
              className="input-field"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Entrando...' : (isRegister ? 'Criar Conta' : 'Entrar')}
            </button>
          </form>
          <button
            onClick={() => setIsRegister(!isRegister)}
            style={{ background: 'none', border: 'none', color: 'var(--primary-light)', marginTop: '10px', cursor: 'pointer' }}
          >
            {isRegister ? 'Ja tem conta? Entrar' : 'Nao tem conta? Criar'}
          </button>
        </div>
      )}
    </div>
  );
}
