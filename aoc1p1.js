let text = ``
text =
  `3   4
4   3
2   5
1   3
3   9
3   3`
let input = text.split('\n').map(x => x.split('   '));
let a = input.map(x => Number(x[0])).sort((a, b) => a - b);
let b = input.map(x => Number(x[1])).sort((a, b) => a - b);
let sum = 0;

a.forEach((x, i) => sum += Math.abs(x - b[i]));
console.log(sum);

