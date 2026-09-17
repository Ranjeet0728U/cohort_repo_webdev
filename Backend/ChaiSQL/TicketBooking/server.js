import connectDB from './src/common/config/db.js'
import app from './src/app.js'
import 'dotenv/config'

const PORT = process.env.PORT | 8000

const start = async() => {
    await connectDB()

    app.listen(PORT, () => {
        console.log(`App is running at http://localhost:${PORT}`)
    })
}


start()
    .catch((error) => {
        console.error('App does not start');
    })