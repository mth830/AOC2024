let input = ``
input = `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########

<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`

const [mapText, commandText] = input.split('\n\n');
let map = mapText.split('\n').map(row => row.split(''));
const commands = commandText.split('');
map = mapText.split('\n').map(row => row.replace(/./g, x => {
  if (x === '#') return '##';
  else if (x === 'O') return '[]';
  else if (x === '.') return '..'
  else if (x === '@') return '@.'
}).split(''));

//find starting position
let position = [0, 0];
outer: for (let r = 0; r < map.length; r++) {
  for (let c = 0; c < map[0].length; c++) {
    if (map[r][c] === '@') {
      position = [r, c];
      break outer;
    }
  }
}

const getGPSCoordinate = (i, j) => i * 100 + j;


const shift = (startRow, startCol, cmd) => {
  if (cmd === '>') {
    let ending = -1;
    for (let c = startCol; c < map[0].length; c++) {
      if (map[startRow][c] === '.') {
        ending = c - 1;
        break;
      } else if (map[startRow][c] === '#') {
        break;
      }
    }
    if (ending >= 0) {

      for (let c = ending; c >= startCol; c--) {
        [map[startRow][c], map[startRow][c + 1]] = [map[startRow][c + 1], map[startRow][c]]
      }
      position[1]++;
    }
  } else if (cmd === '<') {
    let ending = -1;
    for (let c = startCol; c >= 0; c--) {
      if (map[startRow][c] === '.') {
        ending = c;
        break;
      } else if (map[startRow][c] === '#') {
        break;
      }
    }
    if (ending >= 0) {
      for (let c = ending + 1; c <= startCol; c++) {
        [map[startRow][c], map[startRow][c - 1]] = [map[startRow][c - 1], map[startRow][c]]
      }
      position[1]--;
    }
  } else if (cmd === '^') {
    if (canShift(position[0], position[1], 1)) {
      shiftVertically(position[0], position[1], 1)
      position[0]--;
    }
  } else if (cmd === 'v') {
    if (canShift(position[0], position[1], -1)) {
      shiftVertically(position[0], position[1], -1)
      position[0]++;
    }
  }
}
//determine if it's safe to move in vertically
// dir is +1 for up -1 for down
const canShift = (i, j, dir = 1, visited = {}) => {
  if (i < 0 || i >= map.length || j < 0 || j >= map[0].length) throw new Error("out of bounds");
  visited[[i, j]] = true;
  if (map[i][j] === '.') return true;
  else if (map[i][j] === '#') return false;
  else if ("[]@".includes(map[i][j])) {
    if (map[i - dir][j] === '[') return canShift(i - dir, j, dir, visited) && canShift(i - dir, j + 1, dir, visited)
    else if (map[i - dir][j] === ']') return canShift(i - dir, j, dir, visited) && canShift(i - dir, j - 1, dir, visited)
    else return canShift(i - dir, j, dir, visited)
  }
  return false;
}
const shiftVertically = (i, j, dir, visited = {}) => {
  if (i < 0 || i >= map.length || j < 0 || j >= map[0].length) throw new Error("out of bounds");
  if ([i, j] in visited) return;
  visited[[i, j]] = true;
  if (map[i][j] === '.') return;
  else if (map[i][j] === '[') {
    shiftVertically(i - dir, j, dir, visited);
    [map[i - dir][j], map[i][j]] = [map[i][j], map[i - dir][j]];
    shiftVertically(i, j + 1, dir, visited);
  } else if (map[i][j] === ']') {
    shiftVertically(i - dir, j, dir, visited);
    [map[i - dir][j], map[i][j]] = [map[i][j], map[i - dir][j]];
    shiftVertically(i, j - 1, dir, visited);
  } else if (map[i][j] === '@') {
    shiftVertically(i - dir, j, dir, visited);
    [map[i - dir][j], map[i][j]] = [map[i][j], map[i - dir][j]];
  }

}
commands.forEach(cmd => {
  shift(position[0], position[1], cmd);
});
//console.log(map.map(row=>row.join('')).join('\n'))
let result = map.reduce((rowSum, row, r) => rowSum + row.reduce((sum, x, c) => x === '[' ? sum + getGPSCoordinate(r, c) : sum, 0), 0);
console.log(result);