var app = require('express')();
var http = require('http').createServer(app);
const path = require('path');
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

http.listen(PORT, () => {
  console.log('listening on localhost:3000');
});