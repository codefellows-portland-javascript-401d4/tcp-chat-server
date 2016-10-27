const net = require('net');
const tcpChatRoom = require('./tcpChatRoom');
const chatRoom = new tcpChatRoom();

// create tcp server for chat room
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

const port = 65000;
server.listen(port, err => {
  if (err) console.log('ERROR!', err);
  else console.log('server listening on port', port);
});
