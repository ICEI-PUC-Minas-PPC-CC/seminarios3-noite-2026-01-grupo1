const env = (key, fallback) => {
  const value = import.meta.env[key];
  if (value === undefined || value === '') return fallback;
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (!isNaN(value) && value.trim() !== '') return Number(value);
  return value;
};

const config = {
  isMock:         env('VITE_MOCK_MODE', true),
  mockDelayMs:    env('VITE_MOCK_DELAY_MS', 400),

  supabaseUrl:    env('VITE_SUPABASE_URL', ''),
  supabaseKey:    env('VITE_SUPABASE_ANON_KEY', ''),

  apiBaseUrl:     env('VITE_API_BASE_URL', 'http://localhost:8000/api'),

  appName:        env('VITE_APP_NAME', 'Cidade dos Valores'),
  appVersion:     env('VITE_APP_VERSION', '0.1.0'),

  storageKey:     env('VITE_STORAGE_KEY', 'cidadeValores_gameState'),

  enableAuth:     env('VITE_ENABLE_AUTH', false),
  enableVlibras:  env('VITE_ENABLE_VLIBRAS', true),
  enableAnalytics:env('VITE_ENABLE_ANALYTICS', false),

  debugLog:       env('VITE_DEBUG_LOG', true),
};

export function debugLog(...args) {
  if (config.debugLog) {
    console.log(`[${config.appName}]`, ...args);
  }
}

if (config.isMock) {
  console.info(
    `%c🎮 ${config.appName} v${config.appVersion} — MODO MOCK`,
    'background: #6C5CE7; color: white; padding: 4px 12px; border-radius: 4px; font-weight: bold;'
  );
}

export default config;
