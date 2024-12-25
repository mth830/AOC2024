let input =
  `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`

const list = input.split('\n').map(e => e.split(''));
let dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
let visitedLocations = new Set();
outer:for (let i = 0; i < list.length; i++) {
  for (let j = 0; j < list[0].length; j++) {
    let cur = list[i][j];
    if (cur == '^') {
      dfs(i, j);
      break outer;
    }
  }
}

function dfs(i, j) {
  let directionIndex = 0;
  let inbounds = (x = i, y = j) => {
    return x >= 0 && x < list.length && y >= 0 && y < list[0].length;
  };
  while (true) {
    let [a, b] = dirs[directionIndex++ % 4];
    while (inbounds(i + a, j + b) && list[i + a][j + b] !== '#') {
      i += a;
      j += b;
      if (!inbounds()) return;
      visitedLocations.add([i, j].toString());
      list[i][j] = 'X';
    }
    if (!inbounds(i + a, j + b)) return;
  }
}
console.log(visitedLocations.size)