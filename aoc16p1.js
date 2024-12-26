const {
  PriorityQueue,
  MinPriorityQueue,
  MaxPriorityQueue,
} = require('@datastructures-js/priority-queue');
//npm install --save @datastructures-js/priority-queue
// run this command for the priority queue implementation installation
let input = ``
input = `#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`
input=
`###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`
// input=`###############
// #.......#....E#
// #.#.###.#.###.#
// #.....#.#...#.#
// #.###.#####.#.#
// #.#.#.......#.#
// #.#.#####.###.#
// #...........#.#
// ###.#.#####.#.#
// #...#.....#.#.#
// #.#.#.###.#.#.#
// #.....#...#.#.#
// #.###.#.#.#.#.#
// #S..#.....#...#
// ###############`
let map = input.split('\n').map(rowStr => rowStr.split(''));

const calcScore = () => {
  let startPos = [map.length - 2, 1];
  let pq = new MinPriorityQueue(([x, y, score, direction]) => score)
  let result = 0;
  let visited = {};
  const NORTH = 0;
  const EAST = 1;
  const SOUTH = 2;
  const WEST = 3;
  pq.enqueue([...startPos, 0, EAST]);
  //console.log(startPos)
  //console.log([...startPos, 0, EAST])
  let inbounds = (x, y) => x >= 0 && x < map.length && y >= 0 && y < map[0].length;
  while (pq.size()) {
    let [x, y, score, direction] = pq.dequeue();
    console.log([score,map.map(row=>row.join('')).join('\n')]);
    if (!inbounds(x, y)||map[x][y]==="#") continue;
    if (map[x][y] === 'E') {
      result = Math.max(result, score);
      continue;
    }

    if ([x, y] in visited) continue// && visited[[x,y]]<score) continue;
    visited[[x, y]] = score;
    map[x][y]='-';
    let directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]
    directions.forEach(([r1, c1], i) => {
      if (i === direction) {
        pq.enqueue([x + r1, y + c1, score + 1, direction])
      } else if (i === ((direction + 1) % 4)) {

        pq.enqueue([x + r1, y + c1, score + 1000, (direction + 1) % 4])
      } else if (i === ((direction + 3) % 4)) {
        pq.enqueue([x + r1, y + c1, score + 1000, (direction + 3) % 4])
      }
    });
  }
  return result;
};
console.log(calcScore())