const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// File imports
const routes = require('./routes');
const db = require('../db');

// Express Initialization
const port = process.env.PORT || 3001;
const app = express();

// Socket.io Initialization
const http = require('http').Server(app);
const io = require('socket.io')(http);
const socketPort = 3000;
// http.listen(socketPort, () => {
//   console.log('Listening on Port: ', socketPort);
// })

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('new-message', function(msg){
    console.log('message: ', msg);
    io.emit('receive-message', msg);
  })
});


// Middlewares
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

// Routes
app.use(express.static(path.resolve(__dirname, '../client/public')));
app.use('/api', routes);
app.get('/', function(req, res){
  res.sendFile(__dirname + '../client/public/index.html');
})
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/public/index.html'));
})

// Server Initialization
db.fridge.sync()
  .then(() => {
    db.messageInfo.sync();
    db.fridgeItems.sync()
      .then(() => {
        app.listen(port, () => {
          console.log('Listening on Port: ', port);
        });
        // Socket Server Initialization
        http.listen(socketPort, () => {
          console.log('Listening on Port: ', socketPort);
        });
      })
      .catch(err => {
        console.log('Error syncing FridgeItems table: ', err);
      });
  })
  .catch(err => {
    console.log('Error syncing Users table: ', err);
  });