let input = `9694820 93 54276 1304 314 664481 0 4`
//input = `125 17`

let arr = input.split(' ').map(x => Number(x));
let totalBlinks = 25;
let calcStones = (n, blinks) => {
  let stones = [n];
  while (blinks > 0) {
    stones = stones.map(stone => {
      if (stone === 0) return 1;
      else if (stone.toString().length % 2 === 0) {
        let str = stone.toString()
        let first = str.slice(0, str.length / 2)
        let second = str.slice(str.length / 2)
        return [Number(first), Number(second)];
      } else {
        return stone * 2024;
      }
    });
    stones = stones.flat(Infinity);
    blinks--;
  }
  return stones.length;
}
let total = arr.reduce((sum, stone) => sum + calcStones(stone, totalBlinks), 0);
console.log(total)
