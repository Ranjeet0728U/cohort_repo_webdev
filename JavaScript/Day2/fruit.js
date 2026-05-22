const fruits = ['apple', 'Banana','mango','pomogranate'];

// let printIt =(val)=>{
//     console.log(val);
// }
// fruits.forEach(printIt);

// fruits.forEach((element)=>console.log(element));
let PrintIt = (num)=>console.log(`the value is: - ${num}`);
let forEach = (arr) =>{
    for(let i = 0; i<arr.length;i++){
        PrintIt(arr[i]);
    }
}
forEach(fruits)