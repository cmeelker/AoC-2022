import { Day } from "../day";
import { sum } from "../utils/utils";

function calculateScore(round: string) {
  const shapes = round.split(" ");
  const componentShape = shapes[0];
  const yourShape = shapes[1];

  let score = 0;

  switch (yourShape) {
    case "X": // Rock
      score += 1;
      switch (componentShape) {
        case "A": // Rock
          score += 3;
          break;
        case "B": // Paper
          score += 0;
          break;
        case "C": // Scissor
          score += 6;
          break;
      }
      break;

    case "Y": // Paper
      score += 2;
      switch (componentShape) {
        case "A": // Rock
          score += 6;
          break;
        case "B": // Paper
          score += 3;
          break;
        case "C": // Scissor
          score += 0;
          break;
      }
      break;

    case "Z": // Scissor
      score += 3;
      switch (componentShape) {
        case "A": // Rock
          score += 0;
          break;
        case "B": // Paper
          score += 6;
          break;
        case "C": // Scissor
          score += 3;
          break;
      }
      break;
  }
  return score;
}

function calculateNewScore(round: string) {
  const shapes = round.split(" ");
  const oponentShape = shapes[0];
  const requiredEnding = shapes[1];

  let score = 0;

  switch (oponentShape) {
    case "A": // Rock
      switch (requiredEnding) {
        case "X": // lose
          score += 0;
          score += 3;

          break;
        case "Y": // draw
          score += 3;
          score += 1;

          break;
        case "Z": // win
          score += 6;
          score += 2;

          break;
      }
      break;

    case "B": // Paper
      switch (requiredEnding) {
        case "X": // lose
          score += 0;
          score += 1;

          break;
        case "Y": // draw
          score += 3;
          score += 2;

          break;
        case "Z": // win
          score += 6;
          score += 3;

          break;
      }
      break;

    case "C": // Scissor
      switch (requiredEnding) {
        case "X": // lose
          score += 0;
          score += 2;

          break;
        case "Y": // draw
          score += 3;
          score += 3;

          break;
        case "Z": // win
          score += 6;
          score += 1;

          break;
      }
      break;
  }

  return score;
}

class Day2 extends Day {
  constructor() {
    super(2);
  }

  solveForPartOne(input: string): string {
    const rounds = input.split("\n").map(String);
    const scores = rounds.map((round) => calculateScore(round));

    const totalScore = sum(scores);
    return totalScore.toString();
  }

  solveForPartTwo(input: string): string {
    const rounds = input.split("\n").map(String);
    const scores = rounds.map((round) => calculateNewScore(round));

    const totalScore = sum(scores);
    return totalScore.toString();
  }
}

export default new Day2();
