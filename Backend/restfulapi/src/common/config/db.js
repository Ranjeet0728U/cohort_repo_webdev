import dotenv from 'dotenv'
import mongoose  from 'mongoose'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const envPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../.env');
dotenv.config({ path: envPath });

async function connectDB() {
    console.log("Connectng to db")

    const dbConnection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(process.env.MONGODB_URI);
    console.log(dbConnection.connection.name);
}

export default connectDB;       