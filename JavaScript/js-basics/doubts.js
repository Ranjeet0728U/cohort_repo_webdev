// const username = {
//   phone: "iphone",
//   age: {
//     a: 40,
//     b: {
      
//     }
//   }
// }

// const mycopy = username
// const copyName = { ...username }


// copyName.age.a = 5

// class Debutant{
//   constructor(name){
//     this.name = name;
//     this.walkOut = ()=> `${this.name} walk out to bat for the first time`;
//   }

  
// }

// const pl1 = new Debutant("MS Dhoni");

// const returning = pl1.walkOut();
// console.log(returning);

// let a = 2;
// let b = 4;

// let c = `${a}`;
// console.log(typeof c);

// console.log(`${a} + ${b}`);


const allCheck = Promise.all([
    Promise.resolve("Chai"),
    Promise.resolve("Code"),
    Promise.reject("Error"),
]);
allCheck.then(console.log)
.catch(err=>{
    console.log(err);
})

const allPromise = Promise.allSettled([
    Promise.resolve("Chai"),
    Promise.resolve("Code"),
    Promise.reject("Error"),
]);
allPromise.then(console.log)
.catch(console.log)