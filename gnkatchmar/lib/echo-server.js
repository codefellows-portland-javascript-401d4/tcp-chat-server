const net = require('net');
// The net module provides you with an asynchronous network wrapper. It contains functions for creating both servers and clients (called streams). 

const server = net.createServer(client => {
  client.write('hello');

  client.on('data', message => {
    client.write(message);
    client.end();
  });
  client.on('end', () => {
    client.write('disconnected from server');
  });
});

module.exports = server;