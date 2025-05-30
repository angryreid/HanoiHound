interface DogCharacterProps {
  isPlaying: boolean;
  animationSpeed: number;
  currentTower: number;
}

export default function DogCharacter({ isPlaying, animationSpeed, currentTower }: DogCharacterProps) {
  const getPositionStyle = () => {
    // Position dog based on current tower (0 = left, 1 = center, 2 = right)
    const positions = ['16.67%', '50%', '83.33%'];
    
    return {
      bottom: '80px',
      left: positions[currentTower] || positions[0],
      transform: 'translateX(-50%)',
      transition: `all ${1 / animationSpeed}s cubic-bezier(0.4, 0, 0.2, 1)`,
    };
  };

  return (
    <div
      className={`dog-sprite absolute z-10 ${isPlaying ? 'dog-walking' : ''}`}
      style={getPositionStyle()}
    >
      {/* Dog eyes and features are handled by CSS pseudo-elements */}
    </div>
  );
}
