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
  prize[0] += 10000000000000;
  prize[1] += 10000000000000;
  map.push([a, b, prize]);
}

let minPushes = ([a, b, prize]) => {
  const [ax, ay] = a;
  const [bx, by] = b;
  const [px, py] = prize;

  const bPresses = (ay * px - ax * py) / (ay * bx - ax * by);
  const aPresses = (px - bx * bPresses) / ax;

  if (aPresses % 1 !== 0 || bPresses % 1 !== 0) {
    return Infinity;
  } else if ((aPresses * ax + bPresses * bx) === px
    && (aPresses * ay + bPresses * by === py)) {
    return (3 * aPresses + bPresses);
  }
}
const output = map
  .map(minPushes)
  .filter(x => x !== Infinity)
  .reduce((sum, x) => sum + x, 0);
console.log(output)//875318608908
