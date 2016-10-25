const net = require('net');
const tcpChatRm = require('./tcpChatRm');
const chatRm = new tcpChatRm();

// create new tcp server for chat room
const server = net.createServer(client => {
  client.setEncoding('utf-8');

  chatRm.add(client);

  client.on('data', msg => {
    chatRm.send(client, msg);
  });

  client.on('close', () => {
    chatRm.remove(client);
  });
});

const port = 65000;
server.listen(port, err => {
  if (err) console.log('ERROR!', err);
  else console.log('server listening on port', port);
})
