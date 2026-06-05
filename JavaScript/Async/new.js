function prepareOrder(dish){
    return new Promise((res, rej) =>{
        setTimeout(() =>{
            if(!dish){
                rej(new Error("No dish is there"));
                return;
            }
            console.log(`${dish} is prepared`);
            res({dish,status: "prepared"});
        },2000);
    })
}


function pickUpOrder(order){
    return new Promise((res, rej) =>{
        setTimeout(() =>{
            console.log(`${order.dish} is ready`);
            res({...order, status: "PickedUp"});
        },1000);
    })
}
function deliverOrder(order){
    return new Promise((res, rej) =>{
        setTimeout(() =>{
            console.log(`${order.dish} is ready`);
            res({...order, status: "delivered"});
        },1000);
    })
};

prepareOrder("panir tikka")
.then(order => pickUpOrder(order))
.then(order => deliverOrder(order))
.catch();