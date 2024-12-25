let input = ``
input =
  `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`

function countXMAS(input) {
  let inputList = input.split("\n").map(e => e.split(''));

  function isValid(pos, num) {
    let [i, j] = pos;
    let [a, b] = num;
    if (i + 3 * a < 0 || i + 3 * a >= inputList.length
      || j + 3 * b >= inputList[0].length
      || j + 3 * b < 0) {
      return false;
    }
    if (inputList[i + a][j + b] == 'M'
      && inputList[i + 2 * a][j + 2 * b] == 'A'
      && inputList[i + 3 * a][j + 3 * b] == 'S') {
      return true;
    }
    return false;
  }

  let res = 0;
  for (let i = 0; i < inputList.length; i++) {
    for (let j = 0; j < inputList[0].length; j++) {
      if (inputList[i][j] == 'X') {
        [[1, 0], [-1, 0], [0, -1], [0, 1], [1, -1], [1, 1], [-1, 1], [-1, -1]]
          .forEach(([a, b]) => {
            if (isValid([i, j], [a, b])) res++;
          });
      }
    }
  }
  return res;
}

console.log(countXMAS(input))
