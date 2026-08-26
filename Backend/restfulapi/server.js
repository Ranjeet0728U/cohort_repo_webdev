import app from './src/app.js'
import 'dotenv/config'
import connectDB from './src/common/config/db.js';
import { Router } from 'express';
import router from './src/module/auth/auth.routes.js';

const PORT = process.env.PORT;

//app.use(router);

const start = async() => {
    //connect DB
    await connectDB().then(() =>{
        console.log("Db")
    }).catch((err) =>{
        console.error("error is ");
    });

    

    app.listen(PORT, ()=>{
        console.log(`app is running at ${PORT} in ${process.env.NODE_ENV} mode`)
        console.log(`http://localhost:${PORT}`);
    })
}

start().catch((err) => {
    console.log('this is error',err.massage);
    process.exit(1);
})