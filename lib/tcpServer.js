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
  });
});

const port = 12121;
tcpServer.listen(port, err => {
  if (err) console.log('ERROR!', err);
  console.log('server listening on port', port);
});