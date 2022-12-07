import { Day } from "../day";

function parseInput(input: string): number[][] {
  const pairs = input.split("\n").map((line) => {
    const pairs = line.split(",");
    const left = pairs[0].split("-");
    const right = pairs[1].split("-");

    return [
      parseInt(left[0]),
      parseInt(left[1]),
      parseInt(right[0]),
      parseInt(right[1]),
    ];
  });

  return pairs;
}

function countFullyContained(pairs: number[][]) {
  let count = 0;

  pairs.forEach((pair) => {
    if (
      (pair[0] <= pair[2] && pair[1] >= pair[3]) ||
      (pair[2] <= pair[0] && pair[3] >= pair[1])
    ) {
      count += 1;
    }
  });

  return count;
}

function countPartiallyContained(pairs: number[][]) {
  let count = 0;

  pairs.forEach((pair) => {
    if (
      (pair[1] >= pair[2] && pair[0] <= pair[2]) ||
      (pair[3] >= pair[0] && pair[2] <= pair[0])
    ) {
      count += 1;
    }
  });

  return count;
}

class Day4 extends Day {
  constructor() {
    super(4);
  }

  solveForPartOne(input: string): string {
    const pairs = parseInput(input);
    return countFullyContained(pairs).toString();
  }

  solveForPartTwo(input: string): string {
    const pairs = parseInput(input);
    return countPartiallyContained(pairs).toString();
  }
}

export default new Day4();
