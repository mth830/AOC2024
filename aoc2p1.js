let input =
  `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

let levels = input.split('\n').map(x => x.split(' ').map(Number));
let safe = (arr) => {
  return (
    arr.every((x, i, a) => (i === 0 || x <= (a[i - 1] - 1) && x >= (a[i - 1] - 3)))
    || arr.every((x, i, a) => (i === 0 || x >= (a[i - 1] + 1) && x <= (a[i - 1] + 3)))
  )
}
console.log(levels.filter(safe).length)