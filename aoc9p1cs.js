let input= ``
 input =`2333133121414131402`;

let list = input.split('')
let currID=0

let res = [];
for(let i = 0 ; i < list.length;i++){
  let curr = +list[i];
  if(i%2===0){
    while(curr--)res.push(currID)
      currID++;
  }else{
    while(curr--)res.push('.')
  }
}

let right = res.length - 1;
let left = 0;

let res2=res;
while(left<right){
  if(res2[right]==='.')right--;
  else if (res2[left]!=='.')left++;
  else{
    [res2[right],res2[left]]=[res2[left],res2[right]]
    right--;
    left++;
  }
}


console.log(res2.reduce((sum,e,i) =>e==='.'?sum: sum+ Number(e)*i,0))
