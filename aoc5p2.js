let input = ``

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
97,13,75,29,47`

function printQueue(input) {
  let firstPart = input.split('\n\n')[0].split('\n').map(e => e.split('|'));

  let before = {};
  for (const [a, b] of firstPart) {
    if (!(b in before)) before[b] = [];
    if (!(a in before)) before[a] = [];
    before[b].push(a);
  }

  let secondPart = input.split('\n\n')[1];
  let lists = secondPart.split('\n').map(x => x.split(','))
  const isValid = (list) => list.every((curr, i, a) => {
    return a.every((prev, j) => j >= i || before[curr].includes(prev))
  });
  const filtered = lists.filter(e => !isValid(e));
  const sorted = filtered.map(list => list.sort((prev, curr) => {
    return (before[curr].includes(prev) ? 1 : -1)
  }));
  return sorted.reduce((sum, list) => Number(list[Math.floor(list.length / 2)]) + sum, 0)
}

console.log(printQueue(input));