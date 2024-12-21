let input =
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
let memo = new Array(map.length).fill([]).map(e => new Array(map[0].length).fill(0))
console.log(memo)

let p1 = 0;
let count2
while (p1 < map[0].length) {
  let cur = map[0][p1];
  let count = 1;
  for (let i = 1; i < map.length; i++) {
    if (cur == map[i][p1]) {
      memo[i][p1];
      count++;
    }
    }
}


// console.log(
// }

