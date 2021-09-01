const express = require('express');
require('dotenv').config();
const app = express();
const path = require('path');

// Set static folder
app.use(express.static(path.join(__dirname,'public')));



const PORT = 5000 || process.env.PORT;
app.listen(PORT,() => 
    console.log(`Server is running on http://localhost:${PORT}`)
);