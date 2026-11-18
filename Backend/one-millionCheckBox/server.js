import http from 'http'
import path from 'node:path'

import 'dotenv/config'
import express from 'express'
import { Server } from 'socket.io';

import { publisher, subscriber, redis } from './redish-connection.js';

const port = process.env.PORT ?? 8080
const map = new Map();

const size = 100000;

const CHECKBOX_STATE_KEY = 'checkbox-state';

const main = async () => {
    const app = express();

    app.use(express.static(path.resolve('./public')));
    const server = http.createServer(app);

    const io = new Server();
    io.attach(server);

    await subscriber.subscribe('internal-server:checkbox:change')
    subscriber.on('message', (channel, message) => {
        if(channel === 'internal-server:checkbox:change'){
            const {index, checked} = JSON.parse(message);
            io.emit('server:check', {index, checked})
        }
    })

    io.on('connection', (socket) => {
        socket.on('client:select', async(data) => {

            const lastOperationTime = map.get(socket.id);

            if(lastOperationTime){
                const timeGap = Date.now() - lastOperationTime

                if(timeGap < 5 * 1000){
                    socket.emit('server:error',{
                        index : data.index,
                        message : 'please wait for 5 sec'
                    })
                }
            }
            map.set(socket.id, Date.now());

            const existingState = await redis.get(CHECKBOX_STATE_KEY)

            if(existingState){
                const remoteData = JSON.parse(existingState);
                remoteData[data.index] = data.checked;
                await redis.set(CHECKBOX_STATE_KEY, JSON.stringify(remoteData));
            }else{
                await redis.set(
                    CHECKBOX_STATE_KEY,
                    JSON.stringify(new Array(size).fill(false))
                )
            }
            await publisher.publish(
                'internal-server:checkbox:change',
                JSON.stringify(data)
            )
        })
    })

    app.get('/api/checkboxes', async(req, res) => {

        const existingState = await redis.get(CHECKBOX_STATE_KEY)
        if(existingState){

            const remoteData = JSON.parse(existingState);
            return res.json({checkbox : remoteData})
        }else {
            return res.json({checkbox : new Array(size).fill(false)});
        }
    })

    server.listen(port, () => {
        console.log(`http://localhost:${port}`)
    })
}

await main();