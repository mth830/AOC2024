let input =
  ``;

input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`

//needed to format out ${} from string literals
let sum = 0;
let enabled = true;
for (let i = 0; i < input.length; i++) {
  if (input[i] === 'd' && input.slice(i, i + 4) === "do()") {
    enabled = true;
    i += 3;
  } else if (input[i] === 'd' && input.slice(i, i + 7) === "don't()") {
    enabled = false
    i += 6;
  } else if (input[i] === 'm' && input.slice(i, i + 4) === "mul(") {
    i += 4
    let j = i;
    let num1 = 0;
    let num2 = 0;
    while (!isNaN(input[j])) {
      num1 *= 10;
      num1 += Number(input[j]);
      j++;
    }
    if (input[j] !== ",") continue;
    j++
    while (!isNaN(input[j])) {
      num2 *= 10;
      num2 += Number(input[j])
      j++;
    }
    if (input[j] !== ")") continue;
    if (!isNaN(num1) && !isNaN(num2)&&enabled) {
      sum += num1 * num2;
    }
    i = j - 1;
  }
};
console.log(sum)