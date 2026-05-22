console.log("Hi brother")
let fn2 = (num) =>{
    return 12;
}

let fn3 = (num => num*3);

let fn =  (anotherfn)=>{
    return 40 + anotherfn(12);
}

console.log(`The sum is ${fn(fn3)}`);