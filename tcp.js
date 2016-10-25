// set up core node library for tcp server
const net = require('net');
const cowsay = require('cowsay');

let i = 1;

const server = net.createServer(client => {
  const name = 'client ' + (i++);
  console.log('client', name, 'connected');

  client.setEncoding{'utf-8'};

  client.on('data', data => {
    cowsay('data', (err, cowpie) => {
      client.write(cowpie + '\n');
    });
  });

  client.on('close', () => {
    console.log('client ${name} has disconnected');
  });
});

const port = 65000;
server.listen(port, err => {
  console.log('server listening on port', port, err);
})
