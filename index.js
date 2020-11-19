var app = require('express')();
var express = require('express');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const PORT = process.env.PORT || 5000;
var path = require('path');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Get the path to the `public` folder.
// __dirname is the folder that `app.js` is in.
var publicPath = path.resolve(__dirname, 'style.css');

// Serve this path with the Express static file middleware.
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

http.listen(PORT, () => {
  console.log('listening on localhost:3000');
});