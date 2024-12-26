let input = ``
input =
  `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`
const [mapText, commandText] = input.split('\n\n');
const map = mapText.split('\n').map(row => row.split(''));
const commands = commandText.split('');

//get initial position
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
    let ending = findNextDot(startRow, startCol, [0, 1]);
    if (ending >= 0) {
      shiftAll(startRow, startCol, startRow, ending, [0, -1]);
    }
  } else if (cmd === '<') {
    let ending = findNextDot(startRow, startCol, [0, -1]);
    if (ending >= 0) {
      shiftAll(startRow, startCol, startRow, ending, [0, 1]);
    }
  } else if (cmd === '^') {
    let ending = findNextDot(startRow, startCol, [-1, 0]);
    if (ending >= 0) {
      shiftAll(startRow, startCol, ending, startCol, [1, 0]);
    }
  } else if (cmd === 'v') {
    let ending = findNextDot(startRow, startCol, [1, 0]);
    if (ending >= 0) {
      shiftAll(startRow, startCol, ending, startCol, [-1, 0]);
    }
  }
}

const findNextDot = (startRow, startCol, [yDiff, xDiff]) => {
  if (xDiff === 0) {
    for (let r = startRow; r >= 0 && r < map.length; r += yDiff) {
      if (map[r][startCol] === '#') return -1;
      else if (map[r][startCol] === '.') return r;
    }
  } else if (yDiff === 0) {
    for (let c = startCol; c >= 0 && c < map[0].length; c += xDiff) {
      if (map[startRow][c] === '#') return -1;
      else if (map[startRow][c] === '.') return c;
    }
  } else {
    throw new Error('Shift Error xDiff/yDiff not defined');
  }
  return -1;

}

//yDiff and xDiff controls direction of looping -1 for shifting down 1 for shifting up
const shiftAll = (startRow, startCol, endRow, endCol, [yDiff, xDiff]) => {
  if (xDiff === 0) {
    for (let r = endRow; r != startRow; r += yDiff) {
      [map[r][startCol], map[r + yDiff][startCol]] =
        [map[r + yDiff][startCol], map[r][startCol]];
    }
    position[0] -= yDiff;
  }
  else if (yDiff === 0) {
    for (let c = endCol; c != startCol; c += xDiff) {
      [map[startRow][c], map[startRow][c + xDiff]] =
        [map[startRow][c + xDiff], map[startRow][c]];
    }
    position[1] -= xDiff;
  } else {
    throw new Error('Shift Error xDiff/yDiff not defined');
  }
}

commands.forEach(cmd => {
  shift(position[0], position[1], cmd);
});

//console.log(map.map(row => row.join(' ')).join('\n'))
let result =
  map.reduce((rowSum, row, r) => {
    return rowSum +
      row.reduce((sum, x, c) => x === 'O' ? sum + getGPSCoordinate(r, c) : sum, 0)
  }, 0);
console.log(result);
