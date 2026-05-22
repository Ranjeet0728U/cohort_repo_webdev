Array.prototype.mp = function(fn){
    const n = this.length;
    const newArr = [];
    for(let i = 0; i < n; i++){
        newArr.push(fn(this[i]));
    }
    return newArr;
}

arr = [1,2,3,4];

const newArr = arr.mp((ele) => ele % 2);
console.log(newArr);




Array.prototype.filter1 = function(fn){
    const n = this.length;
    const newArr = [];

    for(let i = 0; i < n; i++){
        if(fn(this[i])) newArr.push(this[i])
    }
    return newArr;
}

console.log(arr.filter1( (ele) => ele % 2 != 0));







Array.prototype.forEach1 = function(fn){
    const n =  this.length;
    for(let i = 0; i < n; i++){
        fn(this[i]);
    }
}


arr.forEach1((ele) =>{
    console.log(ele);
});


Array.prototype.reduce1 = function(fn,st){
    let n = this.length;
    for(let i = 0; i < n; i++){
        st = fn(this[i], st);
    }
    return st;
}

const sum = arr.reduce1((ele, acc)=>{
    return ele + acc
},0);

console.log(sum);



const dishitm = [
    {meal: "dal fry", spicy: "mild", qunt : 2, price : 150},
    {meal : "panir tikka", spicy : "high", qunt : 13, price : 100},
    {meal : "chhole bhature", spicy : "high", qunt : 2, price : 50},
    {meal : "samose", spicy : "mild", qunt : 15, price : 10}

]

const dish = {mild : [], high: []};

const object = dishitm.reduce1((ele, acc) =>{
    const str = ele.spicy;
    acc[str].push(ele.meal);
    return acc;
}, dish)

console.log(object);