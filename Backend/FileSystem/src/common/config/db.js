import 'dotenv/config'
import mongoose  from 'mongoose'



async function connectDB() {
    console.log("Connectng to db")

    const dbConnection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(process.env.MONGODB_URI);
    console.log(dbConnection.connection.name);
}

export default connectDB;       