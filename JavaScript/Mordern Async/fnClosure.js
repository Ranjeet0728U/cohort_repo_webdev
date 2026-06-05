function eternal(guest){
    const guestName = guest;
    let count = 0;
    function zomato(){
        console.log(`Welcome ${guestName} to Zomato`);
    }
    
    function Blinkit(){
        if(count == 1) return;
        console.log(`Welcome ${guestName} to Blinkit`);
        count++;
    }


    // Method 1
    // function run(){
    //     zomato();
    //     Blinkit();
    // }
    // return run;

    // Method 2
    // const arr = [zomato, Blinkit];
    // return arr;

    //Method 3
    return{
        zomato,
        Blinkit
    };
    
}

const Ranjeet = eternal("Ranjeet");
Ranjeet.zomato()
Ranjeet.Blinkit();
Ranjeet.Blinkit();
Ranjeet.Blinkit();
