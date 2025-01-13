const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db');
const http = require('http');
const socketServer = require('./socketServer'); 

const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const chatsController = require('./controllers/chatsController');

const app = express();
const server = http.createServer(app); // create server HTTP
const PORT = 3000;

connectDB();
socketServer.initializeSocket(server); //initialize Socket.IO 

app.use(cors());

app.use(express.json());

app.use('/user', userController);
app.use('/chats', chatsController);
app.use('/', authController);

app.listen(PORT, () => {
  console.log(`app is listening at http://localhost:${PORT}`);
})