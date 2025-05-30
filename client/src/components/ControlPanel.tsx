import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw, SkipForward, SkipBack, ChevronLeft, ChevronRight } from "lucide-react";

interface ControlPanelProps {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  animationSpeed: number;
  gameMode: 'step' | 'instant';
  onPlayPause: () => void;
  onReset: () => void;
  onSkipToEnd: () => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
  onSpeedChange: (speed: number) => void;
  onModeChange: (mode: 'step' | 'instant') => void;
  isComplete: boolean;
}

export default function ControlPanel({
  isPlaying,
  currentStep,
  totalSteps,
  animationSpeed,
  gameMode,
  onPlayPause,
  onReset,
  onSkipToEnd,
  onNextStep,
  onPreviousStep,
  onSpeedChange,
  onModeChange,
  isComplete
}: ControlPanelProps) {

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    const rect = button.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.querySelector('.ripple');
    if (ripple) {
      ripple.remove();
    }
    
    button.appendChild(circle);
  };

  return (
    <div className="space-y-6">
      {/* Game Mode Toggle */}
      <Card className="p-6 material-shadow">
        <div className="text-center space-y-4">
          <h3 className="text-gray-800 font-medium text-lg">Game Mode</h3>
          <div className="flex rounded-lg bg-gray-100 p-1">
            <button
              className={`flex-1 px-4 py-2 rounded-md font-medium text-sm transition-all ${
                gameMode === 'step' 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => onModeChange('step')}
            >
              Step-by-Step
            </button>
            <button
              className={`flex-1 px-4 py-2 rounded-md font-medium text-sm transition-all ${
                gameMode === 'instant' 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => onModeChange('instant')}
            >
              Instant Result
            </button>
          </div>
          <p className="text-gray-500 text-xs max-w-md mx-auto">
            Choose between watching the step-by-step solution or jumping directly to the final result
          </p>
        </div>
      </Card>

      {/* Main Controls */}
      <Card className="p-6 material-shadow">
        <div className="space-y-6">
          {/* Primary Controls */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              className="material-button bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 min-w-[120px]"
              onClick={(e) => {
                createRipple(e);
                onPlayPause();
              }}
              disabled={isComplete}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Play
                </>
              )}
            </Button>
            
            <Button
              className="material-button bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 px-6 py-3 min-w-[120px]"
              onClick={(e) => {
                createRipple(e);
                onReset();
              }}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            
            <Button
              className="material-button bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 min-w-[120px]"
              onClick={(e) => {
                createRipple(e);
                onSkipToEnd();
              }}
              disabled={isComplete}
            >
              <SkipForward className="w-4 h-4 mr-2" />
              Skip to End
            </Button>
          </div>

          {/* Step Controls */}
          <div className="flex justify-center space-x-2">
            <Button
              className="material-button bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 w-12 h-12"
              onClick={(e) => {
                createRipple(e);
                onPreviousStep();
              }}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <Button
              className="material-button bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 w-12 h-12"
              onClick={(e) => {
                createRipple(e);
                onNextStep();
              }}
              disabled={currentStep >= totalSteps || isComplete}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Speed Control */}
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Animation Speed</span>
              <span className="text-purple-600 text-sm font-bold">{animationSpeed}x</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-xs">🐢</span>
              <Slider
                value={[animationSpeed]}
                onValueChange={(value) => onSpeedChange(value[0])}
                min={0.5}
                max={3}
                step={0.5}
                className="flex-1"
              />
              <span className="text-gray-400 text-xs">🐰</span>
            </div>
          </div>

          {/* Algorithm Info */}
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-gray-600 text-sm mb-2">
              <span className="font-medium">Current Step:</span>
              <span className="text-purple-600 font-bold ml-1">{currentStep + 1}</span>
              <span className="mx-2">of</span>
              <span className="text-purple-600 font-bold">{totalSteps}</span>
            </p>
            <p className="text-gray-500 text-xs">
              {currentStep === 0 && "Ready to start the puzzle"}
              {currentStep > 0 && currentStep < totalSteps && "Moving bones step by step..."}
              {currentStep === totalSteps && "Puzzle completed!"}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
