export interface HanoiMove {
  from: number;
  to: number;
  disk: number;
}

export function generateHanoiSolution(n: number, source: number = 0, destination: number = 2, auxiliary: number = 1): HanoiMove[] {
  const moves: HanoiMove[] = [];
  
  function hanoi(disks: number, from: number, to: number, aux: number) {
    if (disks === 1) {
      moves.push({ from, to, disk: 1 });
      return;
    }
    
    // Move n-1 disks from source to auxiliary
    hanoi(disks - 1, from, aux, to);
    
    // Move the largest disk from source to destination
    moves.push({ from, to, disk: disks });
    
    // Move n-1 disks from auxiliary to destination
    hanoi(disks - 1, aux, to, from);
  }
  
  hanoi(n, source, destination, auxiliary);
  return moves;
}

export function getOptimalMoveCount(n: number): number {
  return Math.pow(2, n) - 1;
}

export function validateMove(towers: number[][], from: number, to: number): boolean {
  // Check if source tower has disks
  if (towers[from].length === 0) {
    return false;
  }
  
  // Check if destination tower is empty or top disk is larger
  const sourceDisk = towers[from][towers[from].length - 1];
  const destinationTopDisk = towers[to][towers[to].length - 1];
  
  return towers[to].length === 0 || sourceDisk < destinationTopDisk;
}

export function isSolved(towers: number[][], diskCount: number): boolean {
  return towers[2].length === diskCount;
}
