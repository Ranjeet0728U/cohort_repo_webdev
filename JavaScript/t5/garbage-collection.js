// Reachability 
// Object are retained in memory while they are reachable

let tem = {
    email : "gibberish@xyz.com",
    valid : "5 min",
}

console.log(tem);

const movie = {
    title : "Ghosted",
    release : 2023,
    production : "Apple tv",
};

function coStar( actor, actress){
    actor.coStar = actress.name;
    actress.coStar = actor.name;

    return {
        leading : actor,
        supporting : actress,
    };
}


movie.cast = coStar(
    {name: "chris Evans", sallary : 10_00_000},
    {name: "ana de Armas", sallary : 20_00_000},
)

console.log(movie);

// console.log(movie.cast.coStar);


//node garbage-collection.js