// It is mostly used with constructor function

// constructor function are normal function
//1. Capital letter [String, Number, Array, Object]
//2. Should be Executed by "new" Operator.

function User(name){
    this.name = name;
    this.isPaid = false;
};

const name1 = new User("Ranjeet");

console.log(name1.name);
name1.isPaid = true;

console.log(name1);






//bun operator.js