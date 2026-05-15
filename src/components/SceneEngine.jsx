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
  LibrasImageQuizStep,
  DragDropStep,
  RecycleMinigameStep,
  FinaleStep,
} from './game';
import TransitionScreen from './layout/TransitionScreen';

import imgEscola from '../assets/images/escola.png';
import imgJoaoPinheiro from '../assets/images/joao-pinheiro.png';
import imgUrca from '../assets/images/urca.png';
import imgRelogio from '../assets/images/relogio-floral.png';
import imgPraca from '../assets/images/praca.png';
import imgBondinho from '../assets/images/bondinho.png';
import imgCristo from '../assets/images/cristo.png';
import imgParabens from '../assets/images/parabens.gif';

export default function SceneEngine() {
  const game = useGame();
  const { currentScene, currentStep, character, playerName } = game;
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
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
        setShowCongrats(true);
        setTimeout(() => {
          setShowCongrats(false);
          setTransitioning(true);
        }, 2500);
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
    game.completePhase();
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

  const sceneImages = {
    1: imgEscola,
    2: imgJoaoPinheiro,
    3: imgUrca,
    4: imgRelogio,
    5: imgPraca,
    6: imgBondinho,
    7: imgCristo,
  };

  const sceneIcons = ['🏙️', '🏫', '🚦', '🏛️', '⏰', '🌳', '🚡'];

  const currentBgImage = sceneImages[currentScene];

  return (
    <>
      <TransitionScreen 
        show={transitioning}
        fromScene={currentScene}
        toScene={currentScene + 1}
        onComplete={handleTransitionComplete}
      />
      
      <div className="scene-container" style={{
        opacity: transitioning ? 0 : 1,
        transition: 'opacity 0.8s var(--ease)',
      }}>
        {/* Background Image Layer */}
        <div className="scene-bg" style={{ 
          backgroundImage: currentBgImage ? `url(${currentBgImage})` : 'linear-gradient(135deg, var(--bg-dark) 0%, var(--bg-card) 50%, var(--bg-dark) 100%)' 
        }} />

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

        <div className="scene-content" key={`${currentScene}-${currentStep}`} style={{ position: 'relative', zIndex: 1 }}>
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
          {step.type === 'libras_image_quiz' && (
            <LibrasImageQuizStep step={step} onCorrect={handleCorrect} onWrong={handleWrong} />
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

      {showCongrats && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.8)',
          animation: 'fadeIn 0.3s var(--ease)'
        }}>
          <img src={imgParabens} alt="Parabéns!" style={{
            maxWidth: '90%', maxHeight: '90%',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 0 50px rgba(255, 255, 255, 0.2)'
          }} className="animate-scale" />
        </div>
      )}
    </>
  );
}
