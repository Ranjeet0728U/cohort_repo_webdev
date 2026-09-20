import express from 'express'
import authRoutes from './module/auth/auth.router.js'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended : true }))

app.get('/', (req, res) => {
    res.send("Hi this is Ranjeet")
} )

app.use('/api/auth', authRoutes);

export default app;