'use strict';

const net = require('net');
const ChatRoom = require('./ChatRoom');
const chatRoom = new ChatRoom();

const server = net.createServer(client => {
  client.setEncoding('utf-8');

  chatRoom.add(client);

  client.on('data', message => {
    chatRoom.send(client, message);
  });

  client.on('close', () => {
    chatRoom.remove(client);
  });
});


//only neccesary if we actually want to run the chatroom

// const port = 8080;
// server.listen(port, err => {
//   if(err) console.log(err);
//   console.log('server listening on port ', port);
// });

module.exports = server, chatRoom;
