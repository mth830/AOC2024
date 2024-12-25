let input = ``
input =
  `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`
let map = input.split('\n').map(x => x.split('').map(Number));
let positions = [];
map.forEach((row, r) => row.forEach((elem, c) => {
  if (!elem) {
    positions.push([r, c]);
  }
}
));

let inbounds = (x, y) => x >= 0 && y >= 0 && x < map.length && y < map[0].length;

const maxScore = (r, c, locations = {}) => {
  if (map[r][c] === 9) {
    if ([r, c] in locations) return 0;
    locations[[r, c]] = true;
    return 1;
  }
  let sum = 0;
  let curr = map[r][c];
  let directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]
  directions.forEach(([r1, c1]) => {
    if (inbounds(r + r1, c + c1) && (map[r + r1][c + c1]) === curr + 1) {
      sum += maxScore(r + r1, c + c1, locations);
    }
  });
  return sum;
};

let sum = 0;
positions.forEach(([r, c]) => sum += maxScore(r, c));
console.log(sum);