import { Day } from "../day";
import { sum } from "../utils/utils";

function getPriority(char: string) {
  if (char === char.toLocaleLowerCase()) {
    return char.charCodeAt(0) - 96;
  } else {
    return char.charCodeAt(0) - 38;
  }
}

function getInnerJoinValue(string: string) {
  const characters = string.split("");
  const priorities = characters.map((char) => getPriority(char));
  const left = priorities.slice(0, priorities.length / 2);
  const right = priorities.slice(priorities.length / 2, priorities.length);
  const innerJoin = left.filter((value) => right.includes(value));
  return innerJoin[0];
}

function getInnerJoinValueTriple(strings: string[]) {
  console.log(strings);
  const characters = strings.map((string) => string.split(""));
  const priorities = characters.map((characters) =>
    characters.map((char) => getPriority(char))
  );

  const innerJoin = priorities[0].filter(
    (value) => priorities[1].includes(value) && priorities[2].includes(value)
  );

  return innerJoin[0];
}

class Day3 extends Day {
  constructor() {
    super(3);
  }

  solveForPartOne(input: string): string {
    const strings = input.split("\n").map(String);
    const values = strings.map((string) => getInnerJoinValue(string));
    return sum(values).toString();
  }

  solveForPartTwo(input: string): string {
    const strings = input.split("\n").map(String);

    let sum = 0;
    for (let i = 0; i < strings.length - 3; i += 3) {
      sum += getInnerJoinValueTriple([
        strings[i],
        strings[i + 1],
        strings[i + 2],
      ]);
    }

    return sum.toString();
  }
}

export default new Day3();
