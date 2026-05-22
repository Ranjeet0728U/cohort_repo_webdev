function car(name, model, color){
    this.name = name;
    this.model = model;
    this.color = color;
}

car.prototype.status = function(){
    return `The name of car: ${this.name} | model is ${this.model} | colour : ${this.color}`;
};

mahindra = new car("scorpio","10-23A", "Black")
tata = new car("ALTO", "11-2A","White")

console.log(`the name of car of mahindra ${mahindra.name}, and the color is ${mahindra.color}`);
console.log(`the name of car of mahindra ${tata.name}, and the color is ${tata.color}`);

console.log(tata.status());



function student(name , id){
    return{
        name,
        id,
        run(){
            return `Name of student: ${name} | id: ${id}`;
        }
    }
}



const st1 = student("Ranjeet", 123);

const st2 = student("Manjeet", 134);

console.log(st1.name);
console.log(st2.name);

console.log(st1.run());
console.log(st2.run());