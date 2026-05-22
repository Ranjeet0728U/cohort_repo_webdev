let totalStudent = 100;
let marksPercentage = 24.21
let money = 1_00_000;
let notANumber = NaN;
let Infi = Infinity;
let minInfi = -Infinity;

console.log(typeof Infi);
console.log(2/0);

console.log(Number.isNaN(notANumber));


let location = "0x2A4";
console.log("Location in decimal value: ", parseInt(location, 16))

let deciLocation = parseInt("111", 2);
console.log(deciLocation);


console.log()
let division = 5 / 3;
console.log(Math.ceil(division));
console.log(Math.floor(division));
console.log(Math.round(division));

console.log();

const arr = [12,-13, 23, 44];
console.log(Math.min(...arr));
console.log(arr.length);

console.log();

console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3); // return false
console.log(0.1 + 0.1 === 0.2);
console.log(0.1 + 0.7 === 0.8);


let firstNum = "12";
console.log(firstNum + 12); // 1212

function almostEqual(a, b){
    return Math.abs(a - b) < Number.EPSILON;
}

console.log(almostEqual(0.2+ 0.1, 0.3));

