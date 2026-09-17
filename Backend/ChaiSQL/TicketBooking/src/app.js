import express from 'express'

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hi this is Ranjeet")
} )

export default app;