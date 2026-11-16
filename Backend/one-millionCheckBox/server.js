import http from 'http'
import path from 'node:path'

import express from 'express'
import { Server } from 'socket.io';

const port = Number(process.env.PORT) ?? 8080

const size = 100000;

const checkBoxArr = {
    arr : new Array(size).fill(false)
}

const main = (() => {
    const app = express();

    app.use(express.static(path.resolve('./public')));
    const server = http.createServer(app);

    const io = new Server();
    io.attach(server);

    io.on('connection', (socket) => {
        socket.on('client:select', (data) => {
            const {index, checked} = data;
            checkBoxArr.arr[index] = checked;
            socket.broadcast.emit('server:check', data)
        })
    })

    app.get('/api/checkboxes', (req, res) => res.send(checkBoxArr))

    server.listen(port, () => {
        console.log('app is running', port)
    })
})

main();




