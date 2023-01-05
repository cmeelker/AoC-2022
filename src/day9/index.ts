import { Day } from "../day";

class Knot {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `${this.x},${this.y}`;
  }

  isNeightbour(point: Knot) {
    return Math.abs(point.x - this.x) <= 1 && Math.abs(point.y - this.y) <= 1;
  }

  move(direction: Direction) {
    switch (direction) {
      case "U": {
        this.y += 1;
        break;
      }
      case "R": {
        this.x += 1;
        break;
      }
      case "D": {
        this.y -= 1;
        break;
      }
      case "L": {
        this.x -= 1;
        break;
      }
    }
  }
}

type Direction = "U" | "R" | "D" | "L";

let rope: Knot[] = [];

let touchedPositions = new Set<string>();

function move(line: string) {
  const direction = line.split(" ")[0] as Direction;
  const number = parseInt(line.split(" ")[1]);

  for (let i = 0; i < number; i++) {
    let previousHead = new Knot(rope[0].x, rope[0].y);
    rope[0].move(direction);
    if (!rope[1].isNeightbour(rope[0])) {
      rope[1].x = previousHead.x;
      rope[1].y = previousHead.y;
    }

    // Add position of last knot
    touchedPositions.add(rope[1].toString());
  }
}

class Day9 extends Day {
  constructor() {
    super(9);
  }

  // 6026
  solveForPartOne(input: string): string {
    for (let i = 0; i < 2; i++) {
      rope.push(new Knot(0, 0));
    }
    touchedPositions.add(rope[0].toString());

    const lines = input.split("\n");
    lines.forEach((line) => move(line));
    return touchedPositions.size.toString();
  }

  solveForPartTwo(input: string): string {
    // To do
    return "0";
  }
}

export default new Day9();
