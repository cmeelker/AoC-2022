import { Day } from "../day";

function getSums(input: string) {
  const numbers = input.split("\n").map(Number);

  let sums: number[] = [0];
  let elfNumber = 0;

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > 0) {
      sums[elfNumber] += numbers[i];
    } else {
      elfNumber += 1;
      sums.push(0);
    }
  }

  sums = sums.sort(function (a, b) {
    return b - a;
  });

  return sums;
}

class Day1 extends Day {
  constructor() {
    super(1);
  }

  solveForPartOne(input: string): string {
    let sums = getSums(input);
    return sums[0].toString();
  }

  solveForPartTwo(input: string): string {
    let sums = getSums(input);
    const topThreeSum = sums[0] + sums[1] + sums[2];

    return topThreeSum.toString();
  }
}

export default new Day1();
