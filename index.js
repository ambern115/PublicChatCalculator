var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

http.listen(PORT, () => {
  console.log('listening on localhost:3000');
});