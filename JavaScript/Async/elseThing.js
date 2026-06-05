
function BoilWater(ms){
    console.log("Boiling water");
    return new Promise((res,rej) =>{
        if(typeof ms != "number" && ms < 0){
            rej( new error("Not a Number"));
        }

        setTimeout(() =>{
            res("Water has boiled")
        },ms);


    });
}


function addTeaLeaves(){
    return Promise.resolve("Tea leaf added")
}


function addSugar(Spoon){
    return `the ${Spoon} spoon sugar added`;
}

function addMilk(ms){
    return new Promise((res) =>{
        setTimeout(()=>{
            res("Milk Added ")
        },ms);
    });
}

function filterTea(ms){
    return new Promise((res) =>{
        setTimeout(() =>{
            res("Tea Filtered");
        });
    })
}
BoilWater(1000)
.then((msg) =>{
    console.log(msg);
    return addTeaLeaves();
})
.then((msg) =>{
    console.log(msg);
    return addSugar(2);
}).then((msg) =>{
    console.log(msg);
    return addMilk(2000);
}).then((msg) =>{
    console.log(msg);
    return filterTea(1200);
})
.then(console.log);