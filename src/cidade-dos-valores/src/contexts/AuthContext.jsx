import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import config, { debugLog } from '../config';

const AuthContext = createContext(null);

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
          debugLog('Auth: sessão restaurada para', data.user.email);
        }
      } catch (e) {
        debugLog('Auth: sem sessão ativa');
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  useEffect(() => {
    if (config.isMock) return;

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  const signUp = useCallback(async (nome, email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nome } },
    });
    if (error) throw error;
    setUser(data.user);
    return data;
  }, []);

  const signIn = useCallback(async (email, password) => {
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

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}
