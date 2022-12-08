import { Day } from "../day";

function findStartOfPacket(input: string, packetSize: number) {
  for (let i = 0; i < input.length; i++) {
    const slice = input.slice(i, i + packetSize);
    const uniqueCount = new Set(slice).size;

    if (uniqueCount === packetSize) {
      return (i + packetSize).toString();
    }
  }

  return "No unique string found.";
}

class Day6 extends Day {
  constructor() {
    super(6);
  }

  solveForPartOne(input: string): string {
    return findStartOfPacket(input, 4);
  }

  solveForPartTwo(input: string): string {
    return findStartOfPacket(input, 14);
  }
}

export default new Day6();
