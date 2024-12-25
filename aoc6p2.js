let input =
  ``
input =
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
let runTrack = () => {
  outer: for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list[0].length; j++) {
      let cur = list[i][j];
      if (cur === '^') {
        return dfs(i, j);
        break outer;
      }
    }
  }

}
let simulateObstacles = () => {
  let count = 0;
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list[0].length; j++) {
      if (list[i][j] === '.') {
        //change a non-obstacle to an obstacle and backtrack
        list[i][j] = '#';
        if (!runTrack()) count++;
        list[i][j] = '.';
      }
    }
  }
  return count;
}
function dfs(i, j) {
  let dirSet = new Set();

  let directionIndex = 0;
  let inbounds = (x = i, y = j) => x >= 0 && x < list.length && y >= 0 && y < list[0].length;
  while (true) {
    let [a, b] = dirs[directionIndex++ % 4];
    while (inbounds(i + a, j + b) && list[i + a][j + b] !== '#') {
      i += a;
      j += b;
      let key = [i, j, directionIndex % 4].toString();
      //if we have visited the same position going in
      // the same direction we are in a loop
      if (dirSet.has(key)) return false;
      dirSet.add(key);
    }
    if (!inbounds(i + a, j + b)) return 1;
  }

}
console.log(simulateObstacles());