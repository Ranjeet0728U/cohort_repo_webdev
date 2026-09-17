import { Pool } from "pg";

const pool = new Pool({
    host: "localhost",
    port: 5433,
    user: "postgres",
    password: "postgres",
    database: "ticketbooking",
});


const connectDB = async() => {

    pool.query('SELECT NOW()')
        .then((result) => {
            console.log('Postgress connected');
        })
        .catch((error) => {
            console.log('Error ')
            console.error('Error : ',error)
    })
}

export default connectDB;

