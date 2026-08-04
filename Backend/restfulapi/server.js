import app from './src/app.js'
import "dotenv/config"

const PORT = process.env.PORT || 5000;

const start = async () =>{
    //connect db

    app.listen(PORT, () =>{
        console.log(`http://localhost:${PORT}`)
    })
}

start().catch((err) =>{
    console.log("failed to start the server", err);
    process.exit(1);
})