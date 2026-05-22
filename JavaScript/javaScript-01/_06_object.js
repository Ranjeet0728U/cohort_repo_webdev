const obj = {
    "name" : "Ranjeet",
    "RollNo": "2401320100279",
    "college": "GNIOT"
}

const key = Object.keys(obj);
const val = Object.values(obj);
const entry = Object.entries(obj);

console.log(key);
console.log(val);
console.log(entry);

for(const [keys,value] of Object.entries(obj)){
    console.log(value);
}

const naming = {"name": "Manjeet"};

Object.defineProperty(naming,"class",{
    value: "2D",
    writable: false,
    enumerable: true,
    configurable: false
});
// naming.class = "2E"
console.log();
for(const [keys,value] of Object.entries(naming)){
    console.log(`${keys}: - ${value}`);
}

console.log(Object.getOwnPropertyDescriptor(naming, "name"));
// {
//     value: 'Manjeet',
//     writable: true,
//     enumerable: true,
//     configurable: true
//   }

const clg = {
    clgName: "GNIOT",
    clgCode : 132,
    clgDire : "Dr.Dhiraj",
    NumOfStudent : 12000
}

// Object.seal(clg);
Object.freeze(clg); // Like as reading mode

clg.NumOfStudent = 130000;
console.log(clg.NumOfStudent);



















// node _06_object.js