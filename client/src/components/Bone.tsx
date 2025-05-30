interface BoneProps {
  size: number;
  position: number;
  towerIndex: number;
  isPlaying: boolean;
  animationSpeed: number;
}

export default function Bone({
  size,
  position,
  towerIndex,
  isPlaying,
  animationSpeed,
}: BoneProps) {
  const getPositionStyle = () => {
    const baseHeight = 18; // Height of each bone including margin
    const bottom = position * baseHeight;

    return {
      width: `${size * 24 + 20}px`,
      bottom: `${bottom}px`,
      transition: `all ${1 / animationSpeed}s cubic-bezier(0.4, 0, 0.2, 1)`,
    };
  };

  return (
    <div
      className={`bone bone-size-${size} absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center text-white font-bold text-xs ${
        isPlaying ? "bone-moving" : ""
      }`}
      style={getPositionStyle()}
    >
      {size}
    </div>
  );
}
