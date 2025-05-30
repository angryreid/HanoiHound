import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import GameBoard from "./GameBoard";
import ControlPanel from "./ControlPanel";
import { useHanoiGame } from "@/hooks/useHanoiGame";

export default function TowerOfHanoi() {
  const {
    gameState,
    isPlaying,
    currentStep,
    totalSteps,
    moves,
    animationSpeed,
    gameMode,
    playPause,
    reset,
    skipToEnd,
    nextStep,
    previousStep,
    setAnimationSpeed,
    setGameMode,
    isComplete
  } = useHanoiGame();

  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (isComplete) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isComplete]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">🐕</span>
              <h1 className="text-2xl md:text-3xl font-medium">Tower of Hanoi</h1>
            </div>
            <div className="text-sm md:text-base text-purple-200 font-medium">
              Dog & Bones Edition
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Game Status Card */}
        <Card className="p-6 material-shadow">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className={`w-3 h-3 rounded-full ${isComplete ? 'bg-green-500' : isPlaying ? 'bg-blue-500 pulse-status' : 'bg-yellow-500'}`}></div>
              <span className="text-gray-800 font-medium">
                {isComplete ? "Puzzle Solved! 🎉" : isPlaying ? "Animation Playing..." : "Ready to Play"}
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div>
                <span className="font-medium">Moves:</span>
                <span className="text-purple-600 font-bold ml-1">{moves}</span>
              </div>
              <div>
                <span className="font-medium">Optimal:</span>
                <span className="text-purple-600 font-bold ml-1">{totalSteps}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GameBoard 
              gameState={gameState}
              isPlaying={isPlaying}
              animationSpeed={animationSpeed}
            />
          </div>
          
          <div className="space-y-6">
            <ControlPanel
              isPlaying={isPlaying}
              currentStep={currentStep}
              totalSteps={totalSteps}
              animationSpeed={animationSpeed}
              gameMode={gameMode}
              onPlayPause={playPause}
              onReset={reset}
              onSkipToEnd={skipToEnd}
              onNextStep={nextStep}
              onPreviousStep={previousStep}
              onSpeedChange={setAnimationSpeed}
              onModeChange={setGameMode}
              isComplete={isComplete}
            />

            {/* Instructions Card */}
            <Card className="p-6 material-shadow">
              <div className="space-y-4">
                <h3 className="text-gray-800 font-medium text-lg flex items-center space-x-2">
                  <span className="text-purple-600">ℹ️</span>
                  <span>How to Play</span>
                </h3>
                <div className="text-sm text-gray-600 space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Goal:</h4>
                    <p>Help the dog move all bones from the Source tower to the Destination tower.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Rules:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Only move one bone at a time</li>
                      <li>Never place a larger bone on a smaller one</li>
                      <li>Use the Auxiliary tower as needed</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Controls:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Play/Pause:</strong> Start or stop the animation</li>
                      <li><strong>Step Controls:</strong> Move forward/backward through steps</li>
                      <li><strong>Speed Slider:</strong> Adjust animation speed</li>
                      <li><strong>Reset:</strong> Return to starting position</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Success Animation */}
        {showCelebration && (
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
            <div className="text-6xl success-celebration">🎉🐕🎉</div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-500 text-sm">
            <p>Tower of Hanoi Algorithm Visualizer</p>
            <p className="mt-1">Built with Material Design principles</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
