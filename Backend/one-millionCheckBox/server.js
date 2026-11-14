import express from 'express'
import http from 'http'
import { Server } from 'socket.io';
import path from 'node:path'

const main = (() => {
    const app = express();

    app.use(express.static(path.resolve('./public')));
    const server = http.createServer(app);

    const io = new Server();
    io.attach(server);

    io.on('connection', (socket) => {
        socket.on('box:select', ({index, checked}) => {
            socket.broadcast.emit('server:select',{
                index,
                checked
            });
        })
    })

    server.listen(8000, () => {
        console.log('app is running')
    })
})()


