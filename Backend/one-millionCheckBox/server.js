import http from 'http'
import path from 'node:path'

import 'dotenv/config'
import express from 'express'
import { Server } from 'socket.io';

import { publisher, subscriber } from './redish-connection.js';

const port = process.env.PORT ?? 8080

const size = 100000;

const checkBoxArr = {
    arr : new Array(size).fill(false)
}

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
            checkBoxArr.arr[index] = checked;
            io.emit('server:check', {index, checked})
        }
    })

    io.on('connection', (socket) => {
        socket.on('client:select', async(data) => {

            await publisher.publish(
                'internal-server:checkbox:change',
                JSON.stringify(data)
            )
        })
    })

    app.get('/api/checkboxes', (req, res) => res.send(checkBoxArr))

    server.listen(port, () => {
        console.log('app is running', port)
    })
}

await main();