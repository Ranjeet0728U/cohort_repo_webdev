function calling(character){
    return `${this.name} is a ${character} person`;
}
function calling2(char1, char2){
    return `${this.name} is not a ${char1} not a ${char2} person`;
}

const name1 = {name: "Ranjeet"};
const name2 = {name : "Manjeet"};

const nameArr = ["good","bad", "lucky"];


console.log(calling.call(name1, "good"));
console.log(calling.call(name2, "bad"));

console.log(calling2.apply(name1, nameArr)); // apply is used where we have to pass the array to the fucntion

console.log(calling.bind(name1,"good")());// bind return a function which need to be execute that's why double() is used to run the fn





















//node call-apply-bind.js