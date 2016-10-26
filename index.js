const net = require('net');
const chat = require('./chat');
const chatRoom = new chat();

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

const port = process.env.port || 65000;
  server.listen(port, err => {
    if (err) console.log('error', err);
    else console.log('server listening on port', port);
  });

module.exports = server;