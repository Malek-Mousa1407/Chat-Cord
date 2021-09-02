const express = require('express');
require('dotenv').config();
const http = require('http');
const path = require('path');
const socketio = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketio(server);
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser} = require('./utils/users');

// Set static folder
app.use(express.static(path.join(__dirname,'public')));

const botName = 'ChatCord Bot';

// Runs when client connects
io.on('connection', socket =>{

    socket.on('joinRoom',({username,room}) => {
    
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    // Welcome current user
    socket.emit('message',formatMessage(botName,'Welcome To Chat Cord!'));
    
    // Broadcast when a user connects
    socket.broadcast.to(user.room).emit('message',formatMessage(botName,`${user.username} has joined the chat`));
    });

    // Listen for chat message
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username,msg))
    });
    
    // Runs when client disconnects
    socket.on('disconnect', () =>{
        io.emit('message',formatMessage(botName,'A user has left the chat'));
    });
});

const PORT = 5000 || process.env.PORT;
server.listen(PORT,() => 
    console.log(`Server is running on http://localhost:${PORT}`)
);