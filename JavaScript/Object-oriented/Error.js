function navigate(map){
    try{
        console.log(`Map found: ${map}`);
        if(!map){
            throw new Error("map is not loaded");
        }
        return "nav_ok";
    }catch(err){
        console.log(err);
        console.log("error is generated")
    }finally{
        console.log("Completed");
    }
}

navigate(false);









//node error.js