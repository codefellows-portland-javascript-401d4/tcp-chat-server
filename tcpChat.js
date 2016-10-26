const net = require('net');
const ChatRoom = require('./chatRoom');
const chatRoom = new ChatRoom();

const server = net.createServer(client => {
  client.setEncoding('utf-8');

  chatRoom.add(client);

  client.on('data', message => {
    if(message.substring(0,8) === '/newName'){
      chatRoom.changeNick(client, message);
    } else if (message.substring(0,10) === '/newRandom'){
      chatRoom.changeNickRandom(client, message);
    } else {
      chatRoom.send(client, message);
    }
  });
  
  client.on('close', () => {
    chatRoom.remove(client);
  });

});

module.exports = server;