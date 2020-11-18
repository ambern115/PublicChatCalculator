const { listenerCount } = require('process');

var app = require('express')();
var http = require('http').createServer(app);
const path = require('path');
const PORT = process.env.PORT || 3000;

express()
  .get('/', (req, res) => res.render('<h1>Hellow world</h1>'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
  
// app.get('/', (req, res) => {
//   res.send('<h1>Hellow world</h1>');
// });

// http.listen(3000, () => {
//   console.log('listening on localhost:3000');
// });