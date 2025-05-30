import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import Tower from "./Tower";
import DogCharacter from "./DogCharacter";
import { GameState } from "@/hooks/useHanoiGame";

interface GameBoardProps {
  gameState: GameState;
  isPlaying: boolean;
  animationSpeed: number;
}

export default function GameBoard({ gameState, isPlaying, animationSpeed }: GameBoardProps) {
  const boardRef = useRef<HTMLDivElement>(null);

  // Touch gesture handling for mobile
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartX || !touchStartY) return;
      
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;
      
      // Horizontal swipe gestures
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          // Swipe left - next step
          // This would be handled by parent component
        } else {
          // Swipe right - previous step
          // This would be handled by parent component
        }
      }
      
      touchStartX = 0;
      touchStartY = 0;
    };

    const board = boardRef.current;
    if (board) {
      board.addEventListener('touchstart', handleTouchStart);
      board.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (board) {
        board.removeEventListener('touchstart', handleTouchStart);
        board.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, []);

  return (
    <Card className="p-6 material-shadow" ref={boardRef}>
      <div className="relative min-h-[400px] md:min-h-[500px]">
        {/* Towers Container */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mb-8 h-80 md:h-96">
          <Tower
            bones={gameState.towers[0]}
            label="Source"
            towerIndex={0}
            isPlaying={isPlaying}
            animationSpeed={animationSpeed}
          />
          <Tower
            bones={gameState.towers[1]}
            label="Auxiliary"
            towerIndex={1}
            isPlaying={isPlaying}
            animationSpeed={animationSpeed}
          />
          <Tower
            bones={gameState.towers[2]}
            label="Destination"
            towerIndex={2}
            isPlaying={isPlaying}
            animationSpeed={animationSpeed}
          />
        </div>

        {/* Dog Character */}
        <DogCharacter 
          isPlaying={isPlaying}
          animationSpeed={animationSpeed}
          currentTower={gameState.dogPosition || 0}
        />
      </div>
    </Card>
  );
}
