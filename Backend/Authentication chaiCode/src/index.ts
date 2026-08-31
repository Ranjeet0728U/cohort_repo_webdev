import express from 'express'

import type{Express} from 'express'
import { authRouter } from './app/auth/routers.js'

export function createApplication() : Express {
    const app = express()

    app.use(express.json())

    app.get('/',(req,res) => {
        res.send('<b> hi this is Ranjeet</b>')
    })
    return app;
}