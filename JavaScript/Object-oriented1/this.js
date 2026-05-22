const actor = {
    name: "Ranveer singh",
    movie: "Dhurandhar",

    Introduce(){
        console.log(`${this.name} work on the movie ${this.movie}.`);
    },
}

actor.Introduce();


const movieCasting = {
    director:"Sanjay leela bhanshali",
    movie : ["bajirav", "Padmavat"],

    Introducing(){
        console.log(`${this.director} is outside`);
        function intro(){
            console.log(this.director);
        }
        intro();
    }
}
movieCasting.Introducing();
