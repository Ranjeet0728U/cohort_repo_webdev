import app from './src/app.js'
import 'dotenv/config'

const PORT = process.env.PORT;

const start = async() => {
    //connect DB

    app.listen(PORT, ()=>{
        console.log(`app is running at ${PORT} in ${process.env.NODE_ENV} mode`)
    })
}

start().catch((err) => {
    console.log(err.massage);
    process.exit(1);
})