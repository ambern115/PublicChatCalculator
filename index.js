var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');

// maybemaybemaybe
var math = require('mathjs');

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Get path to the public folder - used to access style sheet
var publicPath = path.resolve(__dirname, 'public');
// Serve this path with the Express static file middleware
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    if (msg != "") {
      try {
        // I recognize this would be a security risk without processing the input first
        var result = math.evaluate(msg);
        //io.emit('chat message', msg + ' = ' + result);
        socket.broadcast.emit('chat message', msg + " = " + result);
        socket.emit('users message', msg + " = " + result);
      }
      catch (err) {
        socket.emit('users message', "The input '" + msg + "' cannot be evaluated.");
      }
    }
  });
});

http.listen(PORT, () => {
  console.log('listening on localhost:5000');
});