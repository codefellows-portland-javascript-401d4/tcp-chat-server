const net = require('net');
const ChatRoom = require('./ChatRoom');
const chatRoom = new ChatRoom();

//not a callback, but an event handler
const server = net.createServer(client => {
  client.setEncoding('utf-8');

  //automatically run .add handler
  chatRoom.add(client);
  
  //when client sends message, run .send handler
  client.on('data', message => {
    chatRoom.send(client, message);
  });
  
  //when client socket is closed, run .remove handler
  client.on('close', () => {
    chatRoom.remove(client);
  });

});

module.exports = server;
