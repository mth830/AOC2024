let input = ``
input = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`


const lists = input.split('\n').map(e => e.split(':'))
  .map(([total, nums]) => [+total, nums.split(' ').map(Number)]);


  function dfs(i, arr, target, curr = 0) {
    if (curr === target && i === arr.length) return true;
    if (curr > target || i >= arr.length) return false;
    if (dfs(i + 1, arr, target, curr + arr[i])) return true;
    return dfs(i + 1, arr, target, curr * arr[i])
  }

  let filtered = lists.filter(([total, list]) => dfs(1, list, total, list[0]));
  console.log(filtered.reduce((sum, [total, list]) => sum + total, 0));