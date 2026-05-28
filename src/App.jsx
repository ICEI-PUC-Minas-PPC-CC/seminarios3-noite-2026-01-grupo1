import { GameProvider } from './contexts/GameContext'
import { useGame } from './contexts/useGame'
import HUD from './components/HUD'
import SceneEngine from './components/SceneEngine'
import GameOver from './components/GameOver'
import CompletionScreen from './components/CompletionScreen'
import Login from './pages/Login'
import CityMap from './pages/CityMap'
import { CharacterSelectStep } from './components/game'
import { AuthProvider } from './contexts/AuthContext'
import { useAuth } from './contexts/useAuth'
import './index.css'

/**
 * AppContent — Renderiza a view correta baseada no estado do jogo.
 * 
 * Fluxo: Login → Personagem → Mapa (Duolingo) → Fase → Mapa → ... → Conclusão
 */
function AppContent() {
  const game = useGame();
  const { view } = game;
  const auth = useAuth();

  if (auth.authRequired) {
    if (auth.loading) {
      return (
        <div style={{
          width: '100%', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(135deg, #0A0A1A 0%, #1a1a3e 50%, #0A0A1A 100%)',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font)',
        }}>
          Carregando...
        </div>
      );
    }

    if (!auth.isAuthenticated) {
      return (
        <Login onLogin={(u) => {
          if (u?.nome) game.setName(u.nome);
          game.login();
        }} />
      );
    }
  }

  // === LOGIN ===
  if (view === 'welcome' || view === 'login') {
    return (
      <Login onLogin={(u) => {
        if (u?.nome) game.setName(u.nome);
        game.login();
      }} />
    );
  }

  // === SELEÇÃO DE PERSONAGEM ===
  if (view === 'character_select') {
    return (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #0A0A1A 0%, #1a1a3e 50%, #0A0A1A 100%)',
        padding: 'var(--space-xl)',
      }}>
        <div style={{ maxWidth: '600px', width: '100%' }}>
          <CharacterSelectStep onSelect={(char) => game.setCharacter(char)} />
        </div>
      </div>
    );
  }

  // === MAPA DA CIDADE (Duolingo) ===
  if (view === 'map') {
    return (
      <CityMap onStartPhase={(phaseId) => game.startPhase(phaseId)} />
    );
  }

  // === JOGANDO UMA FASE ===
  if (view === 'playing') {
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <HUD />
        <SceneEngine />
        <GameOver />
      </div>
    );
  }

  // === CONCLUSÃO ===
  if (view === 'completed') {
    return <CompletionScreen />;
  }

  // Fallback
  return <Login onLogin={() => game.login()} />;
}

function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <AppContent />
        </div>
      </GameProvider>
    </AuthProvider>
  )
}

export default App
