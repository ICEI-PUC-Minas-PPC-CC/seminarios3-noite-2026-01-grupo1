import { useState, useCallback } from 'react';
import { useGame } from '../contexts/GameContext';
import Confetti from './Confetti';
import SCENES from '../data/scenes';
import {
  DialogueStep,
  CharacterSelectStep,
  NameInputStep,
  ChoiceStep,
  LibrasQuizStep,
  DragDropStep,
  RecycleMinigameStep,
  FinaleStep,
} from './game';
import TransitionScreen from './layout/TransitionScreen';

export default function SceneEngine() {
  const game = useGame();
  const { currentScene, currentStep, character, playerName } = game;
  const [showConfetti, setShowConfetti] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const scene = SCENES[currentScene];
  if (!scene) return null;
  const step = scene.steps[currentStep];
  if (!step) return null;

  const handleCorrect = useCallback((points) => {
    setShowConfetti(true);
    game.addScore(points);
    setTimeout(() => {
      setShowConfetti(false);
      if (currentStep + 1 < scene.steps.length) {
        game.nextStep();
      } else if (currentScene + 1 < SCENES.length) {
        setTransitioning(true);
      }
    }, 1500);
  }, [currentStep, currentScene, scene?.steps?.length, game]);

  const handleWrong = useCallback(() => {
    game.loseLife();
  }, [game]);

  const handleNext = useCallback(() => {
    if (currentStep + 1 < scene.steps.length) {
      game.nextStep();
    } else if (currentScene + 1 < SCENES.length) {
      setTransitioning(true);
    }
  }, [currentStep, currentScene, scene?.steps?.length, game]);

  const handleTransitionComplete = useCallback(() => {
    setTransitioning(false);
    game.nextScene();
  }, [game]);

  const handleCharacterSelect = useCallback((char) => {
    game.setCharacter(char);
    handleNext();
  }, [game, handleNext]);

  const handleNameSubmit = useCallback((name) => {
    game.setName(name);
    handleNext();
  }, [game, handleNext]);

  const handleComplete = useCallback(() => {
    setShowConfetti(true);
    game.completeGame();
  }, [game]);

  const bgGradients = {
    0: 'linear-gradient(135deg, #0A0A1A 0%, #1a1a3e 50%, #0A0A1A 100%)',
    1: 'linear-gradient(135deg, #1a2a1a 0%, #0A0A1A 100%)',
    2: 'linear-gradient(135deg, #1a1a2a 0%, #2a1a1a 50%, #0A0A1A 100%)',
    3: 'linear-gradient(135deg, #2a1a2a 0%, #1a2a3a 100%)',
    4: 'linear-gradient(135deg, #1a2a1a 0%, #2a2a0a 50%, #0A0A1A 100%)',
    5: 'linear-gradient(135deg, #0a1a2a 0%, #1a3a1a 100%)',
    6: 'linear-gradient(135deg, #2a1a0a 0%, #0a2a3a 50%, #1a0a2a 100%)',
  };

  const sceneIcons = ['🏙️', '🏫', '🚦', '🏛️', '⏰', '🌳', '🚡'];

  return (
    <>
      <TransitionScreen 
        show={transitioning}
        fromScene={currentScene}
        toScene={currentScene + 1}
        onComplete={handleTransitionComplete}
      />
      <div className="scene-container" style={{
        background: bgGradients[currentScene] || bgGradients[0],
        opacity: transitioning ? 0 : 1,
        transition: 'opacity 0.8s var(--ease)',
      }}>
        <Confetti active={showConfetti} />

      {scene.type === 'scene' && (
        <div style={{
          position: 'relative', zIndex: 1,
          paddingTop: '80px', textAlign: 'center',
          marginBottom: 'auto',
        }}>
          <span style={{ fontSize: '3rem' }}>
            {sceneIcons[currentScene] || '🏙️'}
          </span>
          <h2 style={{
            fontSize: 'var(--fs-xl)', fontWeight: 700,
            marginTop: 'var(--space-sm)', color: 'var(--text-primary)'
          }}>
            {scene.location}
          </h2>
          <div className="progress-bar" style={{ maxWidth: '300px', margin: 'var(--space-md) auto 0' }}>
            <div className="progress-bar-fill"
              style={{ width: `${((currentStep + 1) / scene.steps.length) * 100}%` }} />
          </div>
        </div>
      )}

      {scene.type === 'welcome' && (
        <div style={{
          position: 'relative', zIndex: 1,
          paddingTop: '60px', textAlign: 'center',
          marginBottom: 'auto',
        }}>
          <h1 className="gradient-text" style={{
            fontSize: 'var(--fs-4xl)', fontWeight: 800,
            lineHeight: 1.2, marginBottom: 'var(--space-sm)'
          }}>
            Cidade dos Valores
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-lg)' }}>
            Uma jornada por Poços de Caldas 🏙️
          </p>
        </div>
      )}

      <div className="scene-content" key={`${currentScene}-${currentStep}`}>
        {step.type === 'dialogue' && (
          <DialogueStep step={step} onNext={handleNext} character={character} playerName={playerName} />
        )}
        {step.type === 'character_select' && (
          <CharacterSelectStep onSelect={handleCharacterSelect} />
        )}
        {step.type === 'name_input' && (
          <NameInputStep onSubmit={handleNameSubmit} character={character} />
        )}
        {step.type === 'choice' && (
          <ChoiceStep step={step} onCorrect={handleCorrect} onWrong={handleWrong} />
        )}
        {step.type === 'libras_quiz' && (
          <LibrasQuizStep step={step} onCorrect={handleCorrect} onWrong={handleWrong} />
        )}
        {step.type === 'drag_drop' && (
          <DragDropStep step={step} onCorrect={handleCorrect} onWrong={handleWrong} />
        )}
        {step.type === 'recycle_minigame' && (
          <RecycleMinigameStep step={step} onCorrect={handleCorrect} onWrong={handleWrong} />
        )}
        {step.type === 'finale' && (
          <FinaleStep step={step} onComplete={handleComplete} />
        )}
      </div>
    </div>
    </>
  );
}
