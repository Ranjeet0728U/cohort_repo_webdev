const firstName = "Ranjeet";
const lastName = "Upadhyay";

const fullName = `${firstName} ${lastName}`
console.log("FullName : ", fullName)

let vill = "tugalpur";
vill[0] = "A"; // It does not generate any error does not do any thing so it is an silent error;
console.log(vill);

let vill0_5 = vill.slice(0,5);
console.log(vill0_5);

let massage = "Hi, this is Ranjeet's Code. Don't touch it. Especially Rishabh";

console.log(massage.toLowerCase());
console.log("Length of the massage: ",massage.length);
console.log(massage.at(-2))
console.log(massage.charAt(5));
console.log(massage[5]);


console.log(massage.indexOf("Ranjeet"));

const word = massage.split(" ");

console.log(word);
console.log(Array.isArray(word));

let sentence = word.join(" ")
console.log(sentence)

const missionNum = "312";
console.log(missionNum.padStart(7,0)); // to make the digit as long you want.

console.log(void "Ranjeet");

let naem = {firstName: "Ranjeet", lastName: "Upadhyay"}
console.log(naem);
naem = null
console.log(naem)