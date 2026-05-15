import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import config, { debugLog } from '../config';

const INITIAL_STATE = {
  view: 'welcome',
  isLoggedIn: false,
  playerName: '',
  character: null,
  currentScene: 0,
  currentStep: 0,
  highestPhase: 1,
  lives: 3,
  score: 0,
  gameOver: false,
  completed: false,
};

function loadState() {
  try {
    const saved = localStorage.getItem(config.storageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      debugLog('Estado carregado do LocalStorage');
      return { ...INITIAL_STATE, ...parsed, gameOver: false };
    }
  } catch (e) {
    debugLog('Falha ao carregar estado:', e);
  }
  return INITIAL_STATE;
}

function saveState(state) {
  try {
    localStorage.setItem(config.storageKey, JSON.stringify({
      ...state,
      timestamp: new Date().toISOString(),
    }));
  } catch (e) {
    debugLog('Falha ao salvar estado:', e);
  }
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, view: action.payload };

    case 'LOGIN':
      return { ...state, isLoggedIn: true, view: state.character ? 'map' : 'character_select' };

    case 'LOGOUT':
      return { ...INITIAL_STATE };

    case 'SET_CHARACTER':
      return { ...state, character: action.payload, view: 'map' };

    case 'SET_NAME':
      return { ...state, playerName: action.payload };

    case 'START_PHASE':
      return {
        ...state,
        view: 'playing',
        currentScene: action.payload,
        currentStep: 0,
        lives: 3,
        gameOver: false,
      };

    case 'NEXT_STEP':
      return { ...state, currentStep: state.currentStep + 1 };

    case 'NEXT_SCENE': {
      const nextScene = state.currentScene + 1;
      return {
        ...state,
        currentScene: nextScene,
        currentStep: 0,
        highestPhase: Math.max(state.highestPhase, nextScene),
      };
    }

    case 'COMPLETE_PHASE':
      return {
        ...state,
        view: 'map',
        highestPhase: Math.max(state.highestPhase, state.currentScene + 1),
      };

    case 'ADD_SCORE':
      return { ...state, score: state.score + (action.payload || 10) };

    case 'LOSE_LIFE': {
      const newLives = state.lives - 1;
      if (newLives <= 0) return { ...state, lives: 0, gameOver: true };
      return { ...state, lives: newLives };
    }

    case 'COMPLETE_GAME':
      return { ...state, completed: true, view: 'completed' };

    case 'RESTART_SCENE':
      return { ...state, currentStep: 0, lives: 3, gameOver: false };

    case 'RESTART_GAME':
      return { ...INITIAL_STATE, isLoggedIn: state.isLoggedIn };

    case 'BACK_TO_MAP':
      return { ...state, view: 'map' };

    default:
      return state;
  }
}

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, null, loadState);

  useEffect(() => { saveState(state); }, [state]);

  const setView = useCallback((view) => dispatch({ type: 'SET_VIEW', payload: view }), []);
  const login = useCallback(() => dispatch({ type: 'LOGIN' }), []);
  const logout = useCallback(() => dispatch({ type: 'LOGOUT' }), []);
  const setCharacter = useCallback((char) => dispatch({ type: 'SET_CHARACTER', payload: char }), []);
  const setName = useCallback((name) => dispatch({ type: 'SET_NAME', payload: name }), []);
  const startPhase = useCallback((phaseId) => dispatch({ type: 'START_PHASE', payload: phaseId }), []);
  const nextStep = useCallback(() => dispatch({ type: 'NEXT_STEP' }), []);
  const nextScene = useCallback(() => dispatch({ type: 'NEXT_SCENE' }), []);
  const completePhase = useCallback(() => dispatch({ type: 'COMPLETE_PHASE' }), []);
  const addScore = useCallback((pts) => dispatch({ type: 'ADD_SCORE', payload: pts }), []);
  const loseLife = useCallback(() => dispatch({ type: 'LOSE_LIFE' }), []);
  const completeGame = useCallback(() => dispatch({ type: 'COMPLETE_GAME' }), []);
  const restartScene = useCallback(() => dispatch({ type: 'RESTART_SCENE' }), []);
  const restartGame = useCallback(() => dispatch({ type: 'RESTART_GAME' }), []);
  const backToMap = useCallback(() => dispatch({ type: 'BACK_TO_MAP' }), []);

  const value = {
    ...state,
    setView, login, logout, setCharacter, setName,
    startPhase, nextStep, nextScene, completePhase,
    addScore, loseLife, completeGame,
    restartScene, restartGame, backToMap,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame deve ser usado dentro de GameProvider');
  return ctx;
}
