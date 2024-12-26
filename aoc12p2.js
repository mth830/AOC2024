let input = ``
input =
  `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`
let map = input.split('\n').map(row => row.split(''));

let inbounds = (r1, c1) => (r1 >= 0 && r1 < map.length
  && c1 >= 0 && c1 < map[0].length);

let dfsA = (r, c, type, visited) => {
  if (!inbounds(r, c) || ([r, c] in visited) || map[r][c] !== type) {
    return 0;
  }
  visited[[r, c]] = true;
  let sum = 1;
  let directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  directions.forEach(([r1, c1]) => {
    let area = dfsA(r + r1, c + c1, type, visited);
    sum += area;
  });
  return sum;
};

let dfsS = (r, c, type, visited) => {
  if (!inbounds(r, c) || ([r, c] in visited) || map[r][c] !== type) return 0;
  visited[[r, c]] = true;
  let diags = [[-1, 1], [1, 1], [1, -1], [-1, -1]];
  let diagRightAngles = [[-1, 0], [0, 1], [1, 0], [0, -1]].filter(([r1, c1], i, a) => {
    r1 += r;
    c1 += c;
    let [r2, c2] = a[(i + 1) % 4];
    r2 += r;
    c2 += c;
    let [dr, dc] = diags[i];
    dr += r;
    dc += c;
    if ((inbounds(r1, c1) && map[r1][c1] === type)
      && (inbounds(r2, c2) && map[r2][c2] === type)
      && (!inbounds(dr, dc) || map[dr][dc] !== type)) {
      return true;
    }
    return false
  }).length;
  let rightAngles = [[-1, 0], [0, 1], [1, 0], [0, -1]].filter(([r1, c1], i, a) => {
    r1 += r;
    c1 += c;
    let [r2, c2] = a[(i + 1) % 4];
    r2 += r;
    c2 += c;
    if ((!inbounds(r1, c1) || map[r1][c1] !== type) && (!inbounds(r2, c2) || map[r2][c2] !== type)) {
      return true;

    } return false;
  }).length;
  [[-1, 0], [0, 1], [1, 0], [0, -1]].forEach(([r1, c1]) => {
    r1 = r + r1;
    c1 = c + c1;
    if (!inbounds(r1, c1) || map[r1][c1] !== type) {
      return;
    }
    rightAngles += dfsS(r1, c1, type, visited);
  });
  return diagRightAngles + rightAngles
};
let globalVisit = {}
let globalVisitP = {}

let solution = 0;
for (let r = 0; r < map.length; r++) {
  for (let c = 0; c < map[0].length; c++) {
    let type = map[r][c];
    if (!(type in globalVisit)) globalVisit[type] = {};
    if (!(type in globalVisitP)) globalVisitP[type] = {};
    if (!([r, c] in globalVisit[type])) {
      let area = dfsA(r, c, type, globalVisit[type]);
      let sides = dfsS(r, c, type, globalVisitP[type]);
      solution += area * sides;
    }
  }
}

console.log(solution);