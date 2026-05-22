function thisis(){
    console.log(this);
    console.log("hi");
    return this;
}


console.log(thisis());
console.log("HI this is 2")
console.log(this)

