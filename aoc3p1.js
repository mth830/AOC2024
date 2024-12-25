let input =
  ``;
input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
//needed to format out ${} from string literals
let regex = /mul\(\d{1,3},\d{1,3}\)/g;
let sum = 0;
input.match(regex).map(x => {
  let match = x.match(/\d{1,3}/g);
  sum += +match[0] * +match[1];
});
console.log(sum)