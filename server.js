const express = require('express');
require('dotenv').config();
const http = require('http');
const path = require('path');
const socketio = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketio(server);


// Set static folder
app.use(express.static(path.join(__dirname,'public')));

// Runs when client connects
io.on('connection', socket =>{
    // Welcome current user
    socket.emit('message','Welcome To Chat Cord!');
    
    // Broadcast when a user connects
    socket.broadcast.emit('message', 'A user has joined the chat');

    // Runs when client disconnects
    socket.on('disconnect', () =>{
        io.emit('message', 'A user has left the chat')
    });

    // Listen for chat message
    socket.on('chatMessage', msg => {
        io.emit('message',msg)
    });
});

const PORT = 5000 || process.env.PORT;
server.listen(PORT,() => 
    console.log(`Server is running on http://localhost:${PORT}`)
);