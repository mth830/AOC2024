let input = `Register A: 33024962
Register B: 0
Register C: 0

Program: 2,4,1,3,7,5,1,5,0,3,4,2,5,5,3,0`
// input =
//   `Register A: 729
// Register B: 0
// Register C: 0

// Program: 0,1,5,4,3,0`





function debug() {
  const list = input.split('\n').map(e => e.split(':'));
  const program = input.split('\n').slice(-1)[0].slice(9).split(',');
  const [Ainit, Binit, Cinit] = input.split('\n').slice(0, 3).map(line => +line.slice(12));
  const output = [];
  const registers = {
    A: Ainit,
    B: Binit,
    C: Cinit
  };
  const operands = {
    '0': () => 0, '1': () => 1, '2': () => 2, '3': () => 3,
    '4': () => registers['A'], '5': () => registers['B'], '6': () => registers['C']
  };

  const opCodes = {
    0: (combo) => registers['A'] = Math.floor(registers['A'] / 2 ** operands[combo]()),
    1: (combo) => registers['B'] = registers['B'] ^ combo,
    2: (combo) => registers['B'] = operands[combo]() % 8,
    3: (combo) => registers['A'] ? instructionPtr = combo - 2 : _,
    4: (combo) => registers['B'] = registers['B'] ^ registers['C'],
    5: (combo) => output.push(operands[combo]() % 8),
    6: (combo) => registers['B'] = Math.floor(registers['A'] / 2 ** operands[combo]()),
    7: (combo) => registers['C'] = Math.floor(registers['A'] / 2 ** operands[combo]())
  };

  let instructionPtr = 0;
  for (instructionPtr = 0; instructionPtr < program.length; instructionPtr += 2) {
    let opCode = +program[instructionPtr];
    let comboOperand = +program[instructionPtr + 1];
    opCodes[opCode](comboOperand);
  };
  return output.join(',');
}
console.log(debug())