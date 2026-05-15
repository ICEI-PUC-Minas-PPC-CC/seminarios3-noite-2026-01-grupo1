import { GameProvider, useGame } from './contexts/GameContext'
import HUD from './components/HUD'
import SceneEngine from './components/SceneEngine'
import GameOver from './components/GameOver'
import CompletionScreen from './components/CompletionScreen'
import Login from './pages/Login'
import CityMap from './pages/CityMap'
import { CharacterSelectStep } from './components/game'
import './index.css'

/**
 * AppContent — Renderiza a view correta baseada no estado do jogo.
 * 
 * Fluxo: Login → Personagem → Mapa (Duolingo) → Fase → Mapa → ... → Conclusão
 */
function AppContent() {
  const game = useGame();
  const { view } = game;

  // === LOGIN ===
  if (view === 'welcome' || view === 'login') {
    return (
      <Login onLogin={() => game.login()} />
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
    <GameProvider>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <AppContent />
      </div>
    </GameProvider>
  )
}

export default App
