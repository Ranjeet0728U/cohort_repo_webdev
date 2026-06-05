
const promises = new Promise((res, rej) =>{
    setTimeout(() =>{
        res("Ranjeet's Code");
    }, 2000);
});

// async function calling(){
//     const check = await promises;
//     console.log(promises);
// }

promises.then((data) =>{
    return data.toUpperCase();
}
).then(console.log);


const check = await promises;
console.log(check)









//node promise.js