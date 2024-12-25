let input =
  ``
input =`2333133121414131402`;

let currID = 0
let res = input
  .split('')
  .map((x, i) => !(i % 2) ? new Array(+x).fill(currID++) : new Array(+x).fill('.'))
  .flat(Infinity);

let right = res.length - 1;
let left = 0;

while (left < right) {
  if (res[right] === '.') right--;
  else if (res[left] !== '.') left++;
  else {
    [res[right], res[left]] = [res[left], res[right]]
    right--;
    left++;
  }
}
console.log(res.reduce((sum, e, i) => e === '.' ? sum : sum + Number(e) * i, 0));
