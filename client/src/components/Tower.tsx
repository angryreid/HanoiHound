import Bone from "./Bone";

interface TowerProps {
  bones: number[];
  label: string;
  towerIndex: number;
  isPlaying: boolean;
  animationSpeed: number;
}

export default function Tower({ bones, label, towerIndex, isPlaying, animationSpeed }: TowerProps) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <h3 className="text-gray-800 font-medium text-sm md:text-base">{label}</h3>
      <div className="relative flex-1 flex flex-col justify-end">
        {/* Tower Pole */}
        <div className="tower-pole w-3 md:w-4 h-60 md:h-80 mx-auto"></div>
        
        {/* Base Platform */}
        <div className="w-20 md:w-24 h-3 md:h-4 bg-gray-400 rounded mx-auto -mt-1"></div>
        
        {/* Bones */}
        <div className="absolute bottom-3 md:bottom-4 left-1/2 transform -translate-x-1/2">
          {bones.map((size, index) => (
            <Bone
              key={`${towerIndex}-${size}-${index}`}
              size={size}
              position={index}
              towerIndex={towerIndex}
              isPlaying={isPlaying}
              animationSpeed={animationSpeed}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
