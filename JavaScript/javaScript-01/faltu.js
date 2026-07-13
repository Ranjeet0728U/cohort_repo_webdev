const promise = new Promise((res,rej) =>{
    setTimeout(() =>{
        res("ranjeet");
    },3000)
})

const num = await promise;
console.log(num);

console.log("Ranjeet")