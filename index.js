var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');

// maybemaybemaybe
var math = require('mathjs');

const PORT = process.env.PORT || 5000;

// __dirname is the folder that index.js is in
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Get path to the public folder - used to access style sheet
var publicPath = path.resolve(__dirname, 'public');
// Serve this path with the Express static file middleware
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', math.evaluate(msg));
  });
});

http.listen(PORT, () => {
  console.log('listening on localhost:3000');
});