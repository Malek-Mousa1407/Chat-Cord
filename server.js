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

io.on('connection', () =>{
    console.log('New WS connection...');
});

const PORT = 5000 || process.env.PORT;
server.listen(PORT,() => 
    console.log(`Server is running on http://localhost:${PORT}`)
);