let input =
  ``
input =
  `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`
let split = input.split('\n');
const map = [];
for (let i = 0; i < split.length; i += 4) {
  let [a, b, prize] = split.slice(i, i + 4);
  a = a.slice(12).replace(' Y+', '').split(',').map(Number);
  b = b.slice(12).replace(' Y+', '').split(',').map(Number);
  prize = prize.slice(9).replace(' Y=', '').split(',').map(Number);
  map.push([a, b, prize]);
}
let minPushes = ([a, b, prize]) => {
  let min = Infinity;
  const [ax, ay] = a;
  const [bx, by] = b
  let aPresses = Math.ceil(100 * prize[0] / ax);
  let bPresses = 0;

  for (let i = aPresses; i >= 0; i--) {
    while (((i * ax) + (bPresses) * bx) < prize[0]) bPresses++
    if (((i * ax + bPresses * bx) === prize[0])
      && ((i * ay + bPresses * by) === prize[1])) {
      min = Math.min((3 * i) + bPresses, min);
    }
  }
  return min;
}
const output = map
  .map(minPushes)
  .filter(x => x !== Infinity)
  .reduce((sum, x) => sum + x, 0);
console.log(output)
