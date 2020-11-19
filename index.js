const express = require('express');
const app = express();
const http = require('http').createServer(app);
const socketio = require('socket.io')(http);
const path = require('path');
const math = require('mathjs');
const { v4: uuidv4 } = require('uuid');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  genid: (req) => {
    console.log(req.sessionId);
    return uuidv4(); // use UUIDs for session IDs
  },
  store: new FileStore(),
  secret: 'tempsecret',
  resave: false,
  saveUninitialized: true
}));

var sess;
// Create the homepage route at '/'
app.get('/', (req, res) => {
  sess = req.session;
  console.log(sess.id);
  console.log(sess.msg1);
  if (sess.msg1) {
    //res.redirect('/sendmsg');
    res.render('index');
  } else {
    res.render('index');
    //res.sendFile(__dirname + '/index.html');
  }
});

app.post('/postmsg', (req, res) => {
  sess = req.session;
  sess.msg1 = req.body.msg;
  console.log(sess.msg1);
  sess.save();
});

app.get('/sendmsg', function(req,res) {
  console.log('sendmessage?');
  sess = req.session;
  if (sess.msg1) {
    res.render('index');
    //res.sendFile(__dirname + '/index.html');
    
    //res.write('<h1>Hey ' + sess.msg1 + ' </h1>');
  }
});

// Get path to the public folder - used to access style sheet
var publicPath = path.resolve(__dirname, 'public');
// Serve this path with the Express static file middleware
app.use(express.static(publicPath));

socketio.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    if (msg != "") {
      try {
        // I recognize this would be a security risk without processing the input first
        var result = math.evaluate(msg);
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