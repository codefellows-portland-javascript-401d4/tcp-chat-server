'use strict';

const net = require('net');
const ChatRoom = require('./ChatRoom');
const chatRoom = new ChatRoom();

const server = net.createServer(client => {
  client.setEncoding('utf-8');
  
  chatRoom.add(client);
  console.log(chatRoom.clients);

  client.on('data', message => {
    chatRoom.send(client, message);
  });

  client.on('close', () => {
    chatRoom.remove(client);
  });
});

const port = 8080;
server.listen(port, err => {
  if(err) console.log(err);
  console.log('server listening on port ', port);
});
