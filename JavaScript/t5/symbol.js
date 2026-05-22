// JS specs say

// Object key => string, symbol.....
//Symbol is a primitive unique value  with an optional description.

let baby = Symbol("mai ka ladle");

// symbols are always unique, even the desc is same

console.log(Symbol("ak") === Symbol("ak"));


//Global symbol
// They exist in global symbol registry

let org = Symbol.for("Chaicode");

let company = Symbol.for("Chaicode");

console.log(org === company);


console.log(Symbol.keyFor(org));


//System Symbols
//Symbol.iterator
//Symbol.toPrimitive.









//bun symbol.js