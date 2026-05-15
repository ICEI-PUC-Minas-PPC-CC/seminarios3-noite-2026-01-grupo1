import config, { debugLog } from '../config';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mockApi = {
  async register(nome, email, password) {
    await delay(config.mockDelayMs);
    debugLog('API register:', { nome, email });
    return { id: 'mock-uuid', nome, email };
  },

  async login(email, password) {
    await delay(config.mockDelayMs);
    debugLog('API login:', email);
    return { token: 'mock-token', user: { id: 'mock-uuid', email } };
  },

  async getProgress(userId) {
    await delay(config.mockDelayMs);
    debugLog('API getProgress:', userId);
    return { fase_atual: 1, vidas: 3, pontuacao: 0, acertos: 0, erros: 0 };
  },

  async updateProgress(userId, data) {
    await delay(config.mockDelayMs);
    debugLog('API updateProgress:', userId, data);
    return { ...data, atualizado_em: new Date().toISOString() };
  },

  async syncProgress(localState) {
    await delay(config.mockDelayMs);
    debugLog('API syncProgress:', localState);
    return localState;
  },

  async getScenes(fase) {
    await delay(config.mockDelayMs);
    debugLog('API getScenes fase:', fase);
    return [];
  },

  async submitAnswer(userId, cenaId, resposta) {
    await delay(config.mockDelayMs);
    debugLog('API submitAnswer:', { userId, cenaId, resposta });
    return { acertou: true, feedback: 'Mock feedback', vidas: 3, pontos: 10 };
  },
};

const realApi = {
  async _fetch(endpoint, options = {}) {
    const url = `${config.apiBaseUrl}${endpoint}`;
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || `API error: ${res.status}`);
    }
    return res.json();
  },

  async register(nome, email, password) {
    return this._fetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ nome, email, password }),
    });
  },

  async login(email, password) {
    return this._fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async getProgress(userId) {
    return this._fetch(`/progresso/${userId}`);
  },

  async updateProgress(userId, data) {
    return this._fetch(`/progresso/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async syncProgress(localState) {
    return this._fetch('/progresso/sync', {
      method: 'POST',
      body: JSON.stringify(localState),
    });
  },

  async getScenes(fase) {
    return this._fetch(`/cenas/${fase}`);
  },

  async submitAnswer(userId, cenaId, resposta) {
    return this._fetch('/cenas/responder', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, cena_id: cenaId, resposta }),
    });
  },
};

export const api = config.isMock ? mockApi : realApi;
export default api;
