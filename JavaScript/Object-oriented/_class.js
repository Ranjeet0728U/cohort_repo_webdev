class student{
    constructor(name, rollNo, college){
        this.name = name;
        this.rollNo = rollNo;
        this.college = college;
    }

    introduce(){
        return `Name: ${this.name} | Roll No : ${this.rollNo} | College Name: ${this.college}`;
    }
}

const Rnj = new student("Ranjeet Upadhaya", 2401320100279, "GNIOT")
const Mnj = new student("Manjeet Upadhaya", 2401320100276, "GNIOT")

console.log(Rnj);
// console.log(Object.getOwnPropertyDescriptor(Rnj));

console.log(Rnj.introduce());

const fn = Rnj.introduce;
console.log(fn === Rnj.introduce);
console.log(typeof student);
console.log(typeof Rnj);





class Majdoor{
    constructor(name, skill){
        this.name = name;
        this.skill = [...skill];
        this.hp = 100;

        this.intr = () =>  `The majdoor name is ${this.name}. He is good at ${this.skill}.`;
    }
}

const rms = new Majdoor("Abhinav", ["kudal", "hathoda"]);

const fn2 = rms.intr;
console.log(fn2());


//node _class.js