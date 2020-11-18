const { listenerCount } = require('process');

var app = require('express')();
var http = require('http').createServer(app);

app.get('/', (req, res) => {
  res.send('<h1>Hellow world</h1>');
});

http.listen(3000, () => {
  console.log('listening on localhost:3000');
});