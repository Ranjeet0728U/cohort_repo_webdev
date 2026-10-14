import app from './src/app.js'
import 'dotenv/config'
import connectDB from './src/common/config/db.js';


const PORT = process.env.PORT;

//app.use(router);

const start = async () => {
    try {
        await connectDB();
        console.log("Database connected successfully");

        app.listen(PORT, () => {
            console.log(`App is running at ${PORT} in ${process.env.NODE_ENV} mode`);
            console.log(`http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server:", err.message);
        process.exit(1);
    }
};

start();
