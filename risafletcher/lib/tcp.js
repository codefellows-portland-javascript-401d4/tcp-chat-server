'use strict';

const net = require('net');
const ChatRoom = require('../chatroom');
const chatRoom = new ChatRoom();

const server = net.createServer(client => {

  chatRoom.add(client);
  client.write('hello');

  client.setEncoding('utf-8');

  client.on('data', message=> {
    chatRoom.send(client, message);
  });

  client.on('close', () => {
    chatRoom.remove(client);
    chatRoom.send(client,'This user has left the chat.');
  });

  client.on('error', error => {
    console.log(error);    
  });
});

const port = 65000;
server.listen(port, err => {
  console.log('server listening on port', port, err);
});

module.exports = server;