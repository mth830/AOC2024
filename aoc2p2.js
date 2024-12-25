let input =
  ``
input =
  `7 6 4 2 1
1  2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`

let levels = input.split('\n').map(x => x.split(' ').map(Number));
let increasing = (i, j = 1, arr) => (i - j) < 0 || (arr[i] >= (arr[i - j] + 1) && arr[i] <= (arr[i - j] + 3));
let decreasing = (i, j = 1, arr) => (i - j) < 0 || (arr[i] <= (arr[i - j] - 1) && arr[i] >= (arr[i - j] - 3));
let safe = (arr) => {
  let checkValidity = (cmp) => {
    for (let skipIndex = 0; skipIndex < arr.length; skipIndex++) {
      let valid = true;
      for (let j = 0; j < arr.length; j++) {
        if (j === skipIndex) {
          continue;
        }
        if (j === skipIndex + 1) {
          if (cmp(j, 2, arr)) {
            continue;
          } else {
            valid = false;
            break;
          }
        } else if (!cmp(j, 1, arr)) {
          valid = false;
          break;
        }
      }
      if (valid) return true;
    }
    return false;
  }
  return checkValidity(increasing) || checkValidity(decreasing);
}

console.log(levels.filter(safe))
console.log(levels.filter(safe).length)//290