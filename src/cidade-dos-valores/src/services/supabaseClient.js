import { createClient } from '@supabase/supabase-js';
import config, { debugLog } from '../config';

function createMockClient() {
  const mockQuery = (table) => ({
    select: (cols) => ({
      eq: (col, val) => ({
        single: async () => {
          debugLog(`SELECT ${cols} FROM ${table} WHERE ${col}=${val}`);
          return { data: null, error: null };
        },
      }),
    }),
    insert: (data) => ({
      select: () => ({
        single: async () => {
          debugLog(`INSERT INTO ${table}:`, data);
          return { data, error: null };
        },
      }),
    }),
    update: (data) => ({
      eq: (col, val) => async () => {
        debugLog(`UPDATE ${table} SET`, data, `WHERE ${col}=${val}`);
        return { data, error: null };
      },
    }),
    upsert: async (data) => {
      debugLog(`UPSERT ${table}:`, data);
      return { data, error: null };
    },
  });

  return {
    auth: {
      signUp: async ({ email }) => {
        debugLog('signUp:', email);
        return { data: { user: { id: 'mock-uuid', email } }, error: null };
      },
      signInWithPassword: async ({ email }) => {
        debugLog('signIn:', email);
        return {
          data: {
            user: { id: 'mock-uuid', email },
            session: { access_token: 'mock-token' },
          },
          error: null,
        };
      },
      signOut: async () => {
        debugLog('signOut');
        return { error: null };
      },
      getUser: async () => ({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: () => {} } },
      }),
    },
    from: mockQuery,
  };
}

function initSupabase() {
  if (config.isMock) {
    debugLog('Supabase em modo MOCK');
    return createMockClient();
  }

  if (!config.supabaseUrl || !config.supabaseKey) {
    console.error('Supabase URL/Key não configurados no .env — usando mock como fallback.');
    return createMockClient();
  }

  debugLog('Supabase conectando a:', config.supabaseUrl);
  return createClient(config.supabaseUrl, config.supabaseKey);
}

export const supabase = initSupabase();
export default supabase;
