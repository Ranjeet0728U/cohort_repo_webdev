// const promise = new Promise((res, req) =>{
//     res("Ranjeet");
//     // req(new Error("this is new error"));
// });

// promise
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err.massage))

const check  = function(name,arr){
    let n = arr.length;
    for(let i = 0; i < n; i++){
        if(arr[i] == name) return true;
    }
    return false;
}

const naming = "Ranjeet";
const nums = ["Manjeet", "Alok", "Manish", "Pranjal", "Ranjeet"];

const promise = new Promise((res, reg) =>{
    if(check(naming, nums)){
        res(naming);
    }else{
        reg(new Error(naming));
    }
});

promise
    .then((data) =>{
        console.log(`${data} is a good student.`)
    })
    .catch((err) =>{
        console.log(`${err.message} is not found`)
    })
    

function print1(name){
    console.log(name);
    return name
}
function print2(name){
    console.log(name);
    return name
}
function print3(name){
    console.log(name);
    return name
}
function print4(name){
    console.log(name);
    return name
}
function print5(name){
    console.log(name);
    return name
}

const promise2 = new Promise((res, reg) =>{
    res("Ranjeet");
})

promise2
    .then((data) => print1(data))
    .then((data) => print2(data + " upadhyay  "))
    .then((data) =>{
        print3(data + "is a good boy")
    })