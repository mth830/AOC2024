let input = ``
input =
  `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`

let robots = input.split('\n').map(row => {
  let [point, vel] = row.split(' ');
  point = point.slice(2).split(',').reverse().map(x => Number(x));
  vel = vel.slice(2).split(',').reverse().map(x => Number(x));
  return [point, vel];
});

const ARENA_WIDTH = 101;
const ARENA_HEIGHT = 103;
const STEPS = 100;

const arena = new Array(ARENA_HEIGHT)
  .fill()
  .map(row => new Array(ARENA_WIDTH).fill('.'));

const locations = {};
const quadrants = [[0, 0,], [0, 0]];

const mod = (a, b) => a - (Math.floor(a / b) * b);

for (const robot of robots) {
  const [[row, col], [rowVelocity, colVelocity]] = robot;
  const latestRow = mod((row + rowVelocity * STEPS), ARENA_HEIGHT);
  const latestCol = mod((col + colVelocity * STEPS), ARENA_WIDTH);
  locations[[latestRow, latestCol]] = true;
  if (latestRow !== Math.floor(ARENA_HEIGHT / 2)
    && latestCol !== Math.floor(ARENA_WIDTH / 2)) {
    const rowQuadrant = Math.floor(latestRow / (ARENA_HEIGHT / 2));
    const colQuadrant = Math.floor(latestCol / (ARENA_WIDTH / 2))
    quadrants[rowQuadrant][colQuadrant]++;
  }
};

const printArena = () => {
  for (let r = 0; r < ARENA_HEIGHT; r++) {
    for (let c = 0; c < ARENA_WIDTH; c++) {
      if ([r, c] in locations) { arena[r][c] = 'X'; }
    }
  }
  return arena.map(row => row.join('')).join('\n');
};

let result = quadrants
  .reduce((prod, row) => prod * row.reduce((prod1, val) => prod1 * val, 1), 1)
console.log(result)

