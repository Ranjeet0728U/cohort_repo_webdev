import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import authRoute from './module/auth/auth.routes.js'
import ipl_owner from './module/ipl-ms/router/owner.router.js'
import ipl_player from './module/ipl-ms/router/player.router.js'
import ipl_team from './module/ipl-ms/router/team.router.js'

const app = express();
const frontendPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'frontend');

app.use(express.json())
app.use((req, res, next) => {
    console.log("Method:", req.method);
    console.log("URL:", req.url);
    console.log("Content-Type:", req.headers["content-type"]);
    console.log("Parsed body:", req.body);

    next();
});

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


app.use(express.static(frontendPath));

app.use('/api/auth', authRoute);
app.use('/ipl/owner',ipl_owner);
app.use('/ipl/team', ipl_team)
app.use('/ipl/player', ipl_player)

export default app;