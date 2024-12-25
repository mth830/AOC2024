let input = ``
input =
  `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`



const map = input.split('\n').map(e => e.split(''))

let points = {};
let inbounds = (r, c) => r >= 0 && c >= 0 && r < map.length && c < map[0].length;

map.forEach((row, r) => row.map((col, c) => {
  let letter = map[r][c];
  if (letter === '.') return;
  if (!(letter in points)) points[letter] = [];
  points[letter].push([r, c]);
}));
let antiNodeSet = new Set()

for (const [type, pointList] of Object.entries(points)) {
  for (let i = 0; i < pointList.length; i++) {
    let [x, y] = pointList[i];
    for (let j = 0; j < pointList.length; j++) {
      if (i === j) continue;
      let [x1, y1] = pointList[j];
      let [diffX, diffY] = [x1 - x, y1 - y];
      let antinode = [x + diffX * 2, y + diffY * 2];
      let antinode2 = [x - diffX, y - diffY];
      if (inbounds(...antinode))
        antiNodeSet.add(antinode.toString())
      if (inbounds(...antinode2))
        antiNodeSet.add(antinode2.toString())
    }
  }
}
console.log(antiNodeSet.size)

