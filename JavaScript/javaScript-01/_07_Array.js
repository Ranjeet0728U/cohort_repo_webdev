const name = ["Ranjeet", "Manjeet", "Ruchi", "Nidhi", "Vishal", "Monu"];

const empty = [];


const threeEmpty = Array(3);
console.log(threeEmpty)

const twoInitiallizer = Array(1,2);
console.log(twoInitiallizer);



const createArray = Array.of(3);
console.log(createArray)


const studName = "Ranjeet Upadhyay GNIOT";
const nameArray = Array.from(studName);
console.log(nameArray)


const alpha = ['a','b','c','d'];
alpha.length = 2;
console.log(`The length of the ${alpha} is ${alpha.length}`)


nameArray.shift();
console.log(nameArray);

nameArray.unshift("R")
console.log(nameArray)

const arr = [1,2,3,4,5];
const mapping = arr.map((ele) => ele*2);
console.log(mapping);


const filtering = arr.filter((ele) => ele % 2 == 0);
console.log(filtering);

arr.forEach((ele) =>{
    console.log(ele);
});


const total = arr.reduce((sum, ele)=>{
    let summation = sum + ele;
    return summation;
},0)
console.log(total);


arr.splice(1,2,1,3,4);
console.log(arr);

arr.splice(1,0,6,87);
console.log(arr);



const arr1 = [2,3,4,[1,2,3,4],[65,234,64,[1,23,45]],54,21];
const arr2 = arr1.flat(Infinity);
console.log(arr2);





// Node _07_array.js