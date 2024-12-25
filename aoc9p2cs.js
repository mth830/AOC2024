let input = ``
input = `2333133121414131402`;

let list = input.split('')
let currID = 0

let res = [];
for (let i = 0; i < list.length; i++) {
  let curr = +list[i];
  if (i % 2 === 0) {
    while (curr--) res.push(currID)
    currID++;
  } else {
    while (curr--) res.push('.')
  }
}

let left = 0;
let right = res.length - 1;
let res2 = res;
let prev = 0

while ( right >=0) {
  let sizeR = calR();
  let startingIndex = 0
  let sizeL = calL(left,startingIndex)
  while (sizeL < sizeR && startingIndex < right) {
    sizeL = calL (left,startingIndex);
    startingIndex++;
  }
  if (sizeL >= sizeR) {
    for (let count = sizeR; count > 0; count--) {
      res2[left] = res2[right];
      res2[right] = '.'
      left++;
      right--;
    }
  }
  right--;
}
console.log(res2.join(''))

function calL (left,startingIndex) {
  let size2 = 0;
  while (res2[startingIndex+left] == '.') {
    left++;
    size2++;
  };
  return size2
}

function calR () {
  let size2 = 0;
  while (res2[right] == '.') {
    right--;
  };
  let pointer2 = right;
  let ref = res2[right];
  while (res2[pointer2] === ref) {
    pointer2--;
    size2++;
  }
  return size2
}
console.log(res2.reduce((sum, e, i) => e === '.' ? sum : sum + Number(e) * i, 0))
