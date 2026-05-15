import { useGame } from '../contexts/GameContext';
import { PHASES } from '../data/mockData';

export default function useGameState() {
  const game = useGame();

  const currentPhaseInfo = PHASES[game.currentScene - 1] || null;
  const completedPhases = PHASES.filter(p => p.id < game.currentScene);
  const isLastPhase = game.currentScene >= PHASES.length;
  const overallProgress = Math.round(((game.currentScene - 1) / PHASES.length) * 100);

  return {
    ...game,
    currentPhaseInfo,
    completedPhases,
    isLastPhase,
    overallProgress,
    totalPhases: PHASES.length,
  };
}
