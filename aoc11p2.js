let input = `9694820 93 54276 1304 314 664481 0 4`
//input = `125 17`

let arr = input.split(' ').map(x => Number(x));
let totalBlinks = 75;
let cache = {};
let calcStones = (n, blinksLeft, memo = {}) => {
  if([n, blinksLeft] in memo) return memo[[n, blinksLeft]];
  if (!blinksLeft) return 1;
  else if (n === 0) memo[[n, blinksLeft]] = calcStones(1, blinksLeft - 1, memo);
  else if (n.toString().length % 2 === 0) {
    let str = n.toString();
    let first = str.slice(0, str.length / 2);
    let second = str.slice(str.length / 2);
    memo[[n, blinksLeft]] = calcStones(Number(first), blinksLeft - 1, memo) + calcStones(Number(second), blinksLeft - 1, memo);
  } else {
    memo[[n, blinksLeft]] = calcStones(n * 2024, blinksLeft - 1, memo);
  }
  return memo[[n, blinksLeft]];

}
let total = arr.reduce((sum, stone) => sum + calcStones(stone, totalBlinks,cache), 0);
console.log(total)
console.log("done")
