export function sum(numbers: number[]): number {
  return numbers.reduce((x, y) => {
    return x + y;
  });
}
