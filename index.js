const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if ('OPTIONS' === req.method) {
    //respond with 200
    res.send(200);
  }
  else {
    //move on
    next();
  }
});

let users = [];
io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  io.emit('my broadcast', `server: Hi, Angular`);
  socket.on('disconnect', () => {
    console.log('user disconnected');
    users.push(socket.id);
  });
  socket.on('my message', (msg) => {
    let index = users.indexOf(socket.id)
    console.log("disconnect", socket.id, index)
    console.log("users", users);
    users.splice(index,1);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});