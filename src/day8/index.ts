import { Day } from "../day";

function createTwoDimensionalArray(input: string) {
  const trees: number[][] = [[]];
  const lines = input.split("\n");

  lines.forEach((line, lineIndex) => {
    trees[lineIndex] = [];
    line.split("").map((tree) => {
      const treeValue = parseInt(tree);
      if (!isNaN(treeValue)) {
        trees[lineIndex].push(parseInt(tree));
      }
    });
  });

  return trees;
}

function arrayColumn(arr: any[][], n: number) {
  return arr.map((x) => x[n]);
}

function isAscendingArray(trees: number[]): boolean {
  const currentTree = trees[trees.length - 1];

  for (let i = 0; i < trees.length - 1; i++) {
    if (trees[i] >= currentTree) {
      return false;
    }
  }

  return true;
}

function isVisibleFromTop(x: number, y: number, trees: number[][]) {
  const column = arrayColumn(trees, y);
  const treesOnTop = column.slice(0, x + 1);
  return isAscendingArray(treesOnTop);
}

function isVisibleFromLeft(x: number, y: number, trees: number[][]) {
  const treesOnTheLeft = trees[x].slice(0, y + 1);
  return isAscendingArray(treesOnTheLeft);
}

function isVisibileFromRight(x: number, y: number, trees: number[][]) {
  const treesOnTheRight = trees[x].slice(y, trees[x].length);
  return isAscendingArray(treesOnTheRight.reverse());
}

function isVisibleFromBottom(x: number, y: number, trees: number[][]) {
  const column = arrayColumn(trees, y);
  const treesBelow = column.slice(x, column.length).reverse();
  return isAscendingArray(treesBelow);
}

function calculateVisibilities(trees: number[][]): number {
  let totalVisibilitie = 0;

  for (let x = 0; x < trees.length; x++) {
    for (let y = 0; y < trees[0].length; y++) {
      if (
        isVisibleFromTop(x, y, trees) ||
        isVisibleFromLeft(x, y, trees) ||
        isVisibileFromRight(x, y, trees) ||
        isVisibleFromBottom(x, y, trees)
      ) {
        totalVisibilitie += 1;
      } else {
      }
    }
  }
  return totalVisibilitie;
}

function treesInView(trees: number[]): number {
  const currentTree = trees[0];
  let score = 0;
  let i = 1;

  while (i < trees.length) {
    if (trees.length === 1) {
      break;
    } else if (trees[i] < currentTree) {
      score += 1;
    } else if (trees[i] >= currentTree) {
      score += 1;
      break;
    }

    i += 1;
  }
  return score;
}

function topScore(x: number, y: number, trees: number[][]) {
  const column = arrayColumn(trees, y);
  const treesOnTop = column.slice(0, x + 1).reverse();
  const score = treesInView(treesOnTop);
  return score;
}

function leftScore(x: number, y: number, trees: number[][]) {
  const treesOnTheLeft = trees[x].slice(0, y + 1).reverse();
  return treesInView(treesOnTheLeft);
}

function rightScore(x: number, y: number, trees: number[][]) {
  const treesOnTheRight = trees[x].slice(y, trees[x].length);
  return treesInView(treesOnTheRight);
}

function bottomScore(x: number, y: number, trees: number[][]) {
  const column = arrayColumn(trees, y);
  const treesBelow = column.slice(x, column.length);
  return treesInView(treesBelow);
}

function calculateScenicScores(trees: number[][]): number[] {
  const scenicScores = [];

  for (let x = 0; x < trees.length; x++) {
    for (let y = 0; y < trees[0].length; y++) {
      const totalScore =
        topScore(x, y, trees) *
        leftScore(x, y, trees) *
        rightScore(x, y, trees) *
        bottomScore(x, y, trees);
      scenicScores.push(totalScore);
    }
  }

  return scenicScores;
}

class Day8 extends Day {
  constructor() {
    super(8);
  }

  solveForPartOne(input: string): string {
    const trees = createTwoDimensionalArray(input);
    const visibilities = calculateVisibilities(trees);
    return visibilities.toString();
  }

  solveForPartTwo(input: string): string {
    const trees = createTwoDimensionalArray(input);
    const scenicScores = calculateScenicScores(trees);
    return Math.max(...scenicScores).toString();
  }
}

export default new Day8();
