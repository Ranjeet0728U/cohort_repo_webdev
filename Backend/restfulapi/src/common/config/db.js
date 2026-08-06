import dotenv from 'dotenv'
import mongoose from 'mongoose';

dotenv.config({path : '../../../.env'});

async function connectDB (){

    console.log(process.env.MONGODB_URI)
    const dbconnection = await mongoose.connect(process.env.MONGODB_URI);

    console.log(dbconnection.connection.host);
}

connectDB().catch((err) =>{
    console.error("error is ",err);
})
