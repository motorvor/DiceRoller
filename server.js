

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 5000;
const app = express();
const server = app.listen(PORT, () => {
  console.log(`Listening on ${ PORT }`);
})
const io = socketIO(server);

let rooms = {};

app.get('/', (req, res) => res.send('Hello World!'));

io.on('connection', function(socket) {
  socket.on('joinRoom', (player) => {
    console.log(player);
    console.log('player joined');
    socket.join(player.room);
    socket.nickname = player.name;
    socket.room = player.room;
    if (!rooms[player.room]) rooms[player.room] = [];
    rooms[player.room].push(player);
    console.log(rooms[player.room])
    io.sockets.in(player.room).emit('getPlayers', rooms[player.room]);
  });

  socket.on('msg', (data) => {
    io.in(socket.room).emit('reply', { from: socket.nickname, msg: data })
  });

  socket.on('sendStatus', (data) => {
    io.in(socket.room).emit('receiveStatus', { from: socket.nickname, msg: { status: data.status, dice: data.dice } })
  });

  socket.on('diceVectors', (data) => {
    socket.to(socket.room).emit('getVectors', data);
  });

  socket.on('disconnect', () => {
    if (rooms[socket.room]) {
      let index = rooms[socket.room].indexOf(rooms[socket.room].find((player) => player.name === socket.nickname));
      if (index > -1) {
        rooms[socket.room].splice(index, 1);
        if (rooms[socket.room].length == 0) delete rooms[socket.room];
        socket.leave(socket.room);
      }
    }
  })
});

function findPlayer(name, room) {
  let player = rooms[room].find(player => player.name === name)
}