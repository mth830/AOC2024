let input =
``
 input =
  `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
75,50,13`

function printQueue(input) {
  let firstPart = input.split('\n\n')[0].split('\n').map(e => e.split('|'));
  let res = 0;

  let after = {};
  for (const [a, b] of firstPart) {
    if (!(a in after)) after[a] = [];
    if (!(b in after)) after[b] = [];
    after[a].push(Number(b));
  }
  let before = {};
  for (const [a, b] of firstPart) {
    if (!(b in before)) before[b] = [];
    if (!(a in before)) before[a] = [];
    before[b].push(a);
  }
  let sorted = [];
  let vistited = {};

 let secondPart = input.split('\n\n')[1];
  let lists = secondPart.split('\n').map(x => x.split(','))
  let filtered = [];
  let freedom = {}
  outer: for (let list of lists) {
    for (let i = 1; i < list.length; i++) {
      let curr = list[i];
      if(!(curr in before)&&!(curr in after)){
        freedom[curr]=true;
        continue;
      }
      for (let j = 0; j < i; j++) {
        let inner = list[j];
        if(!(inner in freedom)&& !(before[curr].includes(inner))){
          continue outer;
        }
      }
    }
    filtered.push(list);
  }
  console.log(freedom)
  return filtered.reduce((sum, list) => Number(list[Math.floor(list.length / 2)]) + sum, 0)
}

console.log(printQueue(input));//9566 high