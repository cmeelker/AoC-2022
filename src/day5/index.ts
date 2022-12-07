import { Day } from "../day";

type Crate = string;
type Stack = Crate[];
type Command = {
  amount: number;
  from: number;
  to: number;
};

function parseStacks(stacklines: string[]): Stack[] {
  const stacks: Stack[] = [[]];

  for (let i = 1; i < stacklines[0].length / 4; i++) {
    stacks.push([]);
  }

  for (let i = stacklines.length - 2; i >= 0; i--) {
    for (let j = 0; stacklines[i].length > j; j += 4) {
      const possibleCrate = stacklines[i].slice(j, j + 4);
      if (possibleCrate.startsWith("[")) {
        const crate: Crate = possibleCrate[1];
        const stackNumber = j / 4;
        stacks[stackNumber].push(crate);
      }
    }
  }

  return stacks;
}

function parseCommands(commandLines: string[]): Command[] {
  const commands = commandLines.map((commandLine) => {
    const line = commandLine.split(" ");
    const command: Command = {
      amount: parseInt(line[1]),
      from: parseInt(line[3]),
      to: parseInt(line[5]),
    };
    return command;
  });
  return commands;
}

function doCommand(stacks: Stack[], command: Command): Stack[] {
  for (let i = 0; i < command.amount; i++) {
    const crate = stacks[command.from - 1].pop();
    stacks[command.to - 1].push(crate as Crate);
  }

  return stacks;
}

function doCommand9001(stacks: Stack[], command: Command): Stack[] {
  const cratesToMove = stacks[command.from - 1].slice(
    stacks[command.from - 1].length - command.amount,
    stacks[command.from - 1].length
  );

  stacks[command.to - 1] = stacks[command.to - 1].concat(cratesToMove);
  stacks[command.from - 1] = stacks[command.from - 1].slice(
    0,
    stacks[command.from - 1].length - command.amount
  );

  return stacks;
}

function getTopCrates(stacks: Stack[]) {
  return stacks.map((stack) => stack.pop());
}

function parseInput(input: string): [Stack[], Command[]] {
  const lines = input.split("\n");
  const stackLineHeight = lines.findIndex((line) => line === "");
  const stackLines = lines.splice(0, stackLineHeight);
  const commandLines = lines.splice(1);

  const commands = parseCommands(commandLines);
  let stacks = parseStacks(stackLines);

  return [stacks, commands];
}

class Day5 extends Day {
  constructor() {
    super(5);
  }

  // CNSFCGJSM
  solveForPartOne(input: string): string {
    let [stacks, commands] = parseInput(input);

    commands.map((command) => {
      stacks = doCommand(stacks, command);
    });

    return getTopCrates(stacks).join("");
  }

  solveForPartTwo(input: string): string {
    let [stacks, commands] = parseInput(input);

    commands.map((command) => {
      stacks = doCommand9001(stacks, command);
    });

    return getTopCrates(stacks).join("");
  }
}

export default new Day5();
