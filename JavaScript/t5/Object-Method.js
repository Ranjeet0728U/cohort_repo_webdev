const dogesh = {
    name : "Husky",
    dance : function (){
        console.log("Ichu Ichu Song");
    },
    bark() {
        console.log("Dog is barking");
    },
}

// dogesh.dance = function viralDance(){
//     console.log("Ichu Ichu Song");
// };

console.log(dogesh);

dogesh.dance();
dogesh.bark();



let student = {
    name : "Ranjeet Upadhyay",
    semester: "4th",
    intro(){
        return(`Hi this is ${this.name} studied in ${this.semester} of GNIOT college`);
    },
}

let Ranjeet = {...student};
let Intro = Ranjeet.intro;
console.log(Ranjeet.intro());

const obj = function(){
    console.log(`my name is ${this.name} and i am studied in semester ${this.semester}`);
};

obj.call(student);












//node object-method.js