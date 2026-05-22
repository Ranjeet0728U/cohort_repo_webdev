let gemini = new Object();
let claude = {};

let gpt = {
    company : "OpenAI",
    version : 5.3,
    releaseYear : 2025,
};

gpt.type = "Large Language model";
console.log(gpt);

gpt.type = "LLM";


delete(gpt.type);
console.log(gpt);


const sonet = {
    company : "anthropic",
    version : 4.5,
    "released on" : 2026,
    1 : 12,
};

console.log(sonet);



//squre bracket notation.
console.log(sonet["released on"]);
console.log(sonet[1]);


//expression value as prop name

const  input = "company";
console.log(sonet[input]);



//property value shorthand
function getLaptop(name, price) {
    console.log("yu hu");
    return {
        brand : "Apple",
        name,
        price,
    };
}


let myMac = getLaptop("M4 AIR",99_999);
console.log(myMac);

// search a property

console.log(myMac.ram === undefined);
console.log("ram" in myMac); // keys in object


//looping Object for.. in
console.log();
for(key in myMac){
    console.log(`${key} : ${myMac[key]}`);
}


let artist = {
    name : "Asha bhoshale",
    song : "aaja piya tohe pyar du",
}

let art = artist;
art.deathDate = "13 apr 2026";
console.log(artist === art);

/*
{
  name: 'Asha bhoshale',
  song: 'aaja piya tohe pyar du',
  deathDate: '13 apr 2026'
}
P
*/

let art2 = structuredClone(artist);
console.log(art2 === artist);

//Object.assign(dest, ...source);

const ar3 = {};

const student = {
    name : "Ranjeet Upadhyay",
    class : "2D",
    course : {
        year : 2024,
        class : "D",
        section : "2D",
    }
}

let clone = Object.assign({}, student);
console.log(clone);

clone.course.year = 2028;

console.log(student);


















// node 1-object.js