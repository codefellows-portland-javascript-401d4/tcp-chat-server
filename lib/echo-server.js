const net = require('net');

const server = net.createServer(client => {
  client.write('hello');

  client.on('data', message => {
    client.write(message);
  });
});

module.exports = server;