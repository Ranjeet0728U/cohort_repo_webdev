function init(){
    const name = "Ranjeet Upadhyay";
    const display = function(){
        console.log(name);
    }
    return display;
}

const check = init();

check();