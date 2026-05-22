// const nums = [1,2,3,4,5,6];
// const res = nums.map((e) => {
//     e*=2;
//     e+=2;
//     return e;
// })
//internally it can be written as


// let map =(nums)=>{
//     const res = [];
//     for(let i = 0; i<nums.length; i++){
//         res.push(nums[i] * 2);
//     }
//     return res;
// }
const nums = [1,2,3,4,5,6];
const result = map((e) => e *3);
console.log(result);

function map(fn){
    const res = [];
    for(let i = 0; i<nums.length; i++){
        const currEle = nums[i];
        const num = fn(currEle);
        res.push(num);
    }
    return res;
}
const res = map(nums);
console.log(res);