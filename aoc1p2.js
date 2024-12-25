let text =
  `3   4
4   3
2   5
1   3
3   9
3   3`

let processedArray = text.split('\n').map(e => e.split("   "));
let map1 = new Map();

processedArray.forEach(([a, b]) => map1.set(b, (map1.get(b) || 0) + 1))
let sum = processedArray.reduce((sum, [a, b]) => sum + a * (map1.get(a) || 0), 0)
console.log(sum)
