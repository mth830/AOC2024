let input = `Register A: 33024962
Register B: 0
Register C: 0
Program: 2,4,1,3,7,5,1,5,0,3,4,2,5,5,3,0`
//did not figure out how to get this combination in a faster way
// input =
//   `Register A: 729
// Register B: 0
// Register C: 0

// Program: 0,1,5,4,3,0`





const list = input.split('\n').map(e => e.split(':'));
const program = input.split('\n').slice(-1)[0].slice(9).split(',');
const [Ainit, Binit, Cinit] = input.split('\n').slice(0, 3).map(line => +line.slice(12));
function debug(initialA) {
  const output = [];
  const registers = {
    A: BigInt(initialA),
    B: BigInt(Binit),
    C: BigInt(Cinit)
  };
  const operands = {
    '0': () => 0n, '1': () => 1n, '2': () => 2n, '3': () => 3n,
    '4': () => BigInt(registers['A']), '5': () => BigInt(registers['B']), '6': () => BigInt(registers['C'])
  };

  const opCodes = {
    0: (combo) => registers['A'] = registers['A'] / 2n ** operands[combo](),
    1: (combo) => registers['B'] = registers['B'] ^ BigInt(combo),
    2: (combo) => registers['B'] = operands[combo]() % 8n,
    3: (combo) => registers['A'] ? instructionPtr = combo - 2 : _,
    4: (combo) => registers['B'] = registers['B'] ^ registers['C'],
    5: (combo) => output.push(operands[combo]() % 8n),
    6: (combo) => registers['B'] = Math.floor(registers['A'] / 2n ** operands[combo]()),
    7: (combo) => registers['C'] = BigInt(registers['A'] / 2n ** operands[combo]())
  };

  let instructionPtr = 0;
  for (instructionPtr = 0; instructionPtr < program.length; instructionPtr += 2) {
    let opCode = +program[instructionPtr];
    let comboOperand = +program[instructionPtr + 1];
    opCodes[opCode](comboOperand);
    if(output.length===1 && output[0]!=='2')return null
    else if(output.length===2 && output[1]!=='4')return null
    else if(output.length===3 && output[2]!=='1')return null
  };
  return output.join(',');
}
function findLowestA() {
  let target = `2,4,1,3,7,5,1,5,0,3,4,2,5,5,3,0`;//16 digits
  //35000000000004n;
  let i =
   35000000000004n
  +180000000000000n;
  let count =80000000000000n;
  while (count--) {
    let res = debug(i);
    if(res)
    console.log(res)//.split(',').length)
    if (res === target) {
      return i;
    }
    i+=1n;
  }
}
console.log(findLowestA())
console.log((12^5^3)%8)
//b = A%8
//b = b^3 === b^011
//c=a/2**b
//a/=2^b
//b=b^5 === b^101
//a/=8
//b=b^c
//print b-restart
//A%8===
//2=b^c^5^3