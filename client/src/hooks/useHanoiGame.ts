import { useState, useEffect, useCallback } from "react";
import { generateHanoiSolution, HanoiMove } from "@/lib/hanoiAlgorithm";

export interface GameState {
  towers: number[][];
  dogPosition: number;
  currentMove?: HanoiMove;
}

export function useHanoiGame(diskCount: number = 3) {
  const [gameState, setGameState] = useState<GameState>({
    towers: [
      Array.from({ length: diskCount }, (_, i) => diskCount - i), // Source tower
      [], // Auxiliary tower
      []  // Destination tower
    ],
    dogPosition: 0
  });
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [gameMode, setGameMode] = useState<'step' | 'instant'>('step');
  const [moves, setMoves] = useState(0);
  
  const solution = generateHanoiSolution(diskCount);
  const totalSteps = solution.length;
  const isComplete = gameState.towers[2].length === diskCount;
  
  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || currentStep >= totalSteps || isComplete) {
      return;
    }
    
    const timer = setTimeout(() => {
      nextStep();
    }, 1000 / animationSpeed);
    
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, animationSpeed, totalSteps, isComplete]);

  const applyMove = useCallback((move: HanoiMove, isForward: boolean = true) => {
    setGameState(prev => {
      const newTowers = prev.towers.map(tower => [...tower]);
      
      if (isForward) {
        // Move disk from source to destination
        const disk = newTowers[move.from].pop();
        if (disk !== undefined) {
          newTowers[move.to].push(disk);
        }
      } else {
        // Reverse move: move disk from destination back to source
        const disk = newTowers[move.to].pop();
        if (disk !== undefined) {
          newTowers[move.from].push(disk);
        }
      }
      
      return {
        towers: newTowers,
        dogPosition: isForward ? move.to : move.from,
        currentMove: move
      };
    });
  }, []);

  const playPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const reset = useCallback(() => {
    setGameState({
      towers: [
        Array.from({ length: diskCount }, (_, i) => diskCount - i),
        [],
        []
      ],
      dogPosition: 0
    });
    setCurrentStep(0);
    setMoves(0);
    setIsPlaying(false);
  }, [diskCount]);

  const skipToEnd = useCallback(() => {
    if (gameMode === 'instant') {
      // Instantly move all disks to destination tower
      setGameState({
        towers: [
          [],
          [],
          Array.from({ length: diskCount }, (_, i) => diskCount - i)
        ],
        dogPosition: 2
      });
      setCurrentStep(totalSteps);
      setMoves(totalSteps);
    } else {
      // Fast-forward through all steps
      let tempGameState = {
        towers: [
          Array.from({ length: diskCount }, (_, i) => diskCount - i),
          [],
          []
        ],
        dogPosition: 0
      };
      
      solution.forEach(move => {
        const newTowers = tempGameState.towers.map(tower => [...tower]);
        const disk = newTowers[move.from].pop();
        if (disk !== undefined) {
          newTowers[move.to].push(disk);
        }
        tempGameState = {
          towers: newTowers,
          dogPosition: move.to
        };
      });
      
      setGameState(tempGameState);
      setCurrentStep(totalSteps);
      setMoves(totalSteps);
    }
    setIsPlaying(false);
  }, [gameMode, diskCount, solution, totalSteps]);

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps) {
      const move = solution[currentStep];
      applyMove(move, true);
      setCurrentStep(prev => prev + 1);
      setMoves(prev => prev + 1);
    }
  }, [currentStep, totalSteps, solution, applyMove]);

  const previousStep = useCallback(() => {
    if (currentStep > 0) {
      const move = solution[currentStep - 1];
      applyMove(move, false);
      setCurrentStep(prev => prev - 1);
      setMoves(prev => Math.max(0, prev - 1));
    }
  }, [currentStep, solution, applyMove]);

  return {
    gameState,
    isPlaying,
    currentStep,
    totalSteps,
    moves,
    animationSpeed,
    gameMode,
    isComplete,
    playPause,
    reset,
    skipToEnd,
    nextStep,
    previousStep,
    setAnimationSpeed,
    setGameMode
  };
}
