import { Day } from "../day";
import { sum } from "../utils/utils";

type Dir = {
  name: string;
  parent: Dir | null;
  children: Dir[];
  size: number;
};

let fileSystem: Dir = {
  name: "root",
  parent: null,
  children: [],
  size: 0,
};

let currentDir: Dir = fileSystem;
let allDirSizes: number[] = [];

function parseLine(line: string) {
  const splittedLine = line.split(" ");

  switch (splittedLine[0]) {
    case "$": {
      switch (splittedLine[1]) {
        case "cd": {
          // change dir
          switch (splittedLine[2]) {
            case "/": {
              break;
            }
            default: {
              if (splittedLine[2].startsWith("..")) {
                currentDir = currentDir.parent || fileSystem;
              } else {
                // move down
                let dirName = splittedLine[2];

                let newDir = currentDir.children.find(
                  (dir) => dir.name === dirName
                );

                if (newDir) {
                  currentDir = newDir;
                }
              }
            }
          }

          break;
        }
        case "ls": {
          break;
        }
      }
      break;
    }
    default: {
      if (splittedLine[0].startsWith("dir")) {
        // add dir to children
        let newDir: Dir = {
          name: splittedLine[1],
          parent: currentDir,
          children: [],
          size: 0,
        };
        currentDir.children.push(newDir);
      } else {
        // add file size to dir size
        currentDir.size += parseInt(splittedLine[0]);
      }
      break;
    }
  }
}

function traverseTree(dir: Dir) {
  dir.children.forEach((childDir) => {
    traverseTree(childDir);
  });

  dir.children.forEach((childDir) => (dir.size += childDir.size));

  allDirSizes.push(dir.size);
}

class Day7 extends Day {
  constructor() {
    super(7);
  }

  // 1206825
  solveForPartOne(input: string): string {
    const lines = input.split("\n");
    lines.forEach((line) => parseLine(line));

    traverseTree(fileSystem);

    return sum(allDirSizes.filter((size) => size <= 100000)).toString();
  }

  // 9608311
  solveForPartTwo(input: string): string {
    const minSpaceToDelete = 30000000 - (70000000 - fileSystem.size);

    return Math.min(
      ...allDirSizes.filter((size) => size >= minSpaceToDelete)
    ).toString();
  }
}

export default new Day7();
