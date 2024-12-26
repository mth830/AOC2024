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

let dfsArea = (r, c, type, visited) => {
  if (!inbounds(r, c) || ([r, c] in visited) || map[r][c] !== type) {
    return 0;
  }
  visited[[r, c]] = true;
  let sum = 1;
  let directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]

  directions.forEach(([r1, c1]) => {
    let area = dfsArea(r + r1, c + c1, type, visited);
    sum += area;
  });
  return sum;
};

let dfsPerimeter = (r, c, type, visited) => {
  if (!inbounds(r, c) || ([r, c] in visited) || map[r][c] !== type) {
    return 0;
  }
  visited[[r, c]] = true;
  let perimeter = 0;
  let directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]
  directions.forEach(([r1, c1]) => {
    r1 = r + r1;
    c1 = c + c1;
    if (!inbounds(r1, c1) || map[r1][c1] !== type) {
      perimeter++;
      return;
    }
    perimeter += dfsPerimeter(r1, c1, type, visited);
  });
  return perimeter
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
      let area = dfsArea(r, c, type, globalVisit[type]);
      let perimeter = dfsPerimeter(r, c, type, globalVisitP[type]);
      solution += area * perimeter;
    }
  }
}

console.log(solution);