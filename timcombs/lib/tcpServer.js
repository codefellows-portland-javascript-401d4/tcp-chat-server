const net = require('net');
const ChatRoom = require('./ChatRoom');
const chatRoom = new ChatRoom();

//create the server
const tcpServer = net.createServer((client) => {
  client.setEncoding('utf-8');

  chatRoom.add(client);

  //client sent data!
  client.on('data', message => {
    chatRoom.send(client, message);
  });

  //client closes connection
  client.on('close', () => {
    console.log(`client ${client.name} has disconnected`);
    chatRoom.send(client, `${client.name} has left the building`);
  });
});

module.exports = tcpServer;