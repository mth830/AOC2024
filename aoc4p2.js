let input = ``
input =
  `.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.`

function countXMAS(input) {
  let inputList = input.split("\n").map(e => e.split(''));

  function isValid(pos, num) {
    let [i, j] = pos;
    let [a, b] = num;
    if (i + a < 0 || i - a >= inputList.length
      || j + b >= inputList[0].length || j - b < 0) {
      return false;
    }
    if (i - a < 0 || i + a >= inputList.length
      || j - b >= inputList[0].length || j + b < 0) {
      return false;
    }
    let count = 0;
    if (inputList[i - a][j - b] == 'M' && inputList[i - a][j + b] == 'M' &&
      inputList[i + a][j - b] == 'S' && inputList[i + a][j + b] == 'S') count++
    if (inputList[i - a][j - b] == 'M' && inputList[i + a][j - b] == 'M' &&
      inputList[i + a][j + b] == 'S' && inputList[i - a][j + b] == 'S') count++;
    return count
  }
  let res = 0;
  for (let i = 0; i < inputList.length; i++) {
    for (let j = 0; j < inputList[0].length; j++) {
      if (inputList[i][j] == 'A') {
        [[1, 1], [-1, -1]].forEach(([a, b]) => {
          res += isValid([i, j], [a, b]);
        })
      }
    }
  }
  return res;
}

console.log(countXMAS(input));