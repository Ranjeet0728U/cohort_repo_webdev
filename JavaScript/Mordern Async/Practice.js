// const arr = [];
// arr.push("Ranjeet");
// arr.length = 10;
// arr.push("Manjeet");
// console.log(arr);
// arr.length = 13;
// console.log(arr);
// arr['1'] = "Rupesh";
// console.log(arr);

// function add(...arg){
//     let sum = 0;
//     for(let num of arg){
//         sum += num;
//     }
//     return sum;
// }

// const number = [1,2,3,4,5,6];
// console.log(add(...number));
// const arr2 = ["Mango", "Banana", "Lichi","Pomogranate"];
// arr2[10] = ["BlackBerry"];
// console.log(arr2);

const arr = [1,2,3,4,5,7,8];

const arr2 = arr.slice().copyWithin(1,3,6);
console.log(arr);
console.log(arr2);

const arr3 = [...arr].slice().copyWithin(1,2,4);
console.log(arr3);