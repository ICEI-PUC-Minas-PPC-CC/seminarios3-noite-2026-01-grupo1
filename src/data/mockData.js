export const MOCK_USER = {
  id: 'mock-uuid-001',
  email: 'jogador@cidadevalores.com',
  nome: 'Jogador',
  personagem: null,
  avatar_url: null,
  criado_em: new Date().toISOString(),
};

export const MOCK_PROGRESS = {
  id: 'mock-progress-001',
  user_id: 'mock-uuid-001',
  fase_atual: 1,
  vidas: 3,
  pontuacao: 0,
  acertos: 0,
  erros: 0,
  completou: false,
};

export const PHASES = [
  { id: 1, name: 'Escola Tarso de Coimbra', icon: '🏫', theme: 'Respeito e Inclusão', image: 'escola', color: '#6C5CE7' },
  { id: 2, name: 'Rua João Pinheiro', icon: '🚦', theme: 'Educação no Trânsito', image: 'joao-pinheiro', color: '#00CEC9' },
  { id: 3, name: 'Complexo Cultural Urca', icon: '🏛️', theme: 'Cultura e Patrimônio', image: 'urca', color: '#FD79A8' },
  { id: 4, name: 'Relógio Floral', icon: '⏰', theme: 'Pontualidade e Compromisso', image: 'relogio-floral', color: '#FDCB6E' },
  { id: 5, name: 'Praça Pedro Sanches', icon: '🌳', theme: 'Convivência Social', image: 'praca', color: '#55EFC4' },
  { id: 6, name: 'Bondinho → Cristo', icon: '🚡', theme: 'Coragem e Gratidão', image: 'bondinho', color: '#A29BFE' },
];
