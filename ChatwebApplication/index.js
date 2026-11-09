import express from 'express'
import http from 'http'
import { Server } from 'socket.io';
import path from 'node:path'


async function  main() {
    const app = express();
    app.use(express.static(path.resolve('./public')));
    const server = http.createServer(app);

    const io = new Server();

    io.attach(server)
    const users = new Map();

    io.on('connection',(socket) => {
        console.log(`a new socket is connected with id: - ${socket.id}`)

        socket.on('user:join', (username) => {

            users.set(socket.id, username);

            console.log(`${username} joined the chat`);
        });

        socket.on('user:message', (data) => {
            const username = users.get(socket.id)

            console.log(`Message from server is ${data}`)

            socket.broadcast.emit('server:data', {
                message :data,
                socketId : username
            })
        })

        socket.on('user:typing', () => {
            const username = users.get(socket.id);

            socket.broadcast.emit('server:typing', username);
        })

        socket.on('user:stop-typing', () => {
            socket.broadcast.emit('server:stop-typing');
        })

    });

    
    server.listen(8080, () => {
        console.log(`http is running at 8080`)
    })
}
main()