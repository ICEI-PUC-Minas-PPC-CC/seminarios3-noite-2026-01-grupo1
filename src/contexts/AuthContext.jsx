import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import config, { debugLog } from '../config';
import { AuthContext } from './AuthContextValue';

function usernameToEmail(usernameRaw) {
  const username = String(usernameRaw || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '.')
    .replace(/[^a-z0-9._-]/g, '');

  if (!username) {
    throw new Error('Usuario invalido');
  }

  return `${username}@cidadevalores.local`;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      if (config.isMock) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await supabase.auth.getUser();
        if (data?.user) {
          setUser(data.user);
          debugLog('Auth: sessao restaurada para', data.user.email);
        }
      } catch {
        debugLog('Auth: sem sessao ativa');
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  useEffect(() => {
    if (config.isMock) return undefined;

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  const signUp = useCallback(async (nome, username, password) => {
    const email = usernameToEmail(username);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nome, username: String(username || '').trim() } },
    });
    if (error) throw error;
    setUser(data.user);
    return data;
  }, []);

  const signIn = useCallback(async (username, password) => {
    const email = usernameToEmail(username);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    setUser(data.user);
    return data;
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  const guestLogin = useCallback(() => {
    setUser({ id: 'guest-uuid', email: 'visitante@cidadevalores.com', nome: 'Visitante' });
  }, []);

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    guestLogin,
    isAuthenticated: !!user,
    isMock: config.isMock,
    authRequired: config.enableAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
