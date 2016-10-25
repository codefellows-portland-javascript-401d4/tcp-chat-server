const net = require('net');
const ChatRoom = require('./ChatRoom');

const chatRoom = new ChatRoom();

module.exports = net.createServer(client => {
  client.setEncoding('utf-8');
  chatRoom.addClient(client);
  // console.log(`${client.name} joined the chat...`);
  chatRoom.broadcast(`${client.name} joined the chat...`);
  
  client.on('data', message => {
    let re = /\/nick\s+/;
    if (re.test(message)) {
      let newName = message.replace(re, '').trim();
      let bcastNameChange = `${client.name} changing name to ${newName}`;
      chatRoom.broadcast(bcastNameChange);
      // console.log(bcastNameChange);
      client.name = newName;
    }
    else {
      // send this to all the other clients
      chatRoom.send(client, message);
    }
  });

  client.on('close', () => {
    let name = client.name;
    chatRoom.removeClient(client);
    // console.log(`${name} left the chat...`);
    chatRoom.broadcast(`${name} left the chat...`);
  });
});