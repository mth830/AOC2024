let input = ``
input = `2333133121414131402`;

let currID = 0
let res = input
  .split('')
  .map((x, i) => !(i % 2) ? new Array(+x).fill(currID++) : new Array(+x).fill('.'))
  .flat(Infinity);

let right = res.length - 1;
let left = 0;

let calcNumberSize = (index) => {
  let size = 0;
  let original = res[index];
  while (res[index - size] === original) {
    size++;
  }
  return size;
};

let calcSpaces = (index) => {
  let size = 0;
  while (res[index + size] === '.') {
    size++;
  }
  return size;
}
let swapRange = (left, right, count) => {
  for (let i = 0; i < count; i++) {
    [res[left + i], res[right - i]] =
    [res[right - i], res[left + i]];
  }
}

while (right >= 0) {
  if (res[right] === '.') {
    right--;
  } else {
    let needed = calcNumberSize(right);
    for (let i = 0; i < right; i++) {
      if (res[i] !== '.') continue;
      let spaces = calcSpaces(i);
      if (spaces >= needed) {
        swapRange(i, right, needed);
        break;
      }
    }
    right -= needed;
  }
}

console.log(res.reduce((sum, e, i) => e === '.' ? sum : sum + Number(e) * i, 0));
