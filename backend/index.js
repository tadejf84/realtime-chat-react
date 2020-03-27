const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

// Define PORT
const PORT = process.env.PORT || 5000;

// Start express app
const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('We have a new connection');

    socket.on('join', ({ name, room }, callback) => {

        // Add user to users arr
        const { error, user } = addUser({ id: socket.id, name, room });

        // If any error, return
        if(error) return callback(error);

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the ${user.room}` })

        // User joins room
        socket.join(user.room);
    });

    socket.on('disconnect', () => console.log('user has left!'));
});

app.use(router);

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));