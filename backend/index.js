const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const router = require('./router');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

// Define PORT
const PORT = process.env.PORT || 5000;

// Start express app
const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {

    // Event join - user joins the chat room
    socket.on('join', ({ name, room }, callback) => {

        // Add user to users arr
        const { error, user } = addUser({ id: socket.id, name, room });

        // If any error, return
        if(error) return callback(error);

        // Message the user after joining the room
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });

        // Notify (broadcast) all other users in that room
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

        // User joins room
        socket.join(user.room);

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) } );

        callback();
    });

    // SendMessage event - user sends a message
    socket.on('sendMessage', (message, callback) => {

        // Get user by socket id
        // Every user has their own socket
        const user = getUser(socket.id);

        // Send message to front end
        io.to(user.room).emit('message', { user: user.name, text: message });

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) } );

        callback();
    });

    // Listen for the disconnect even
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
    
        if(user) {
          io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
        }
    });
});

app.use(router);
app.use(cors());

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));