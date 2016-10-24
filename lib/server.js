const net = require('net');

let clientsInChat = 1;
const clients = [];

const server = net.createServer(client => {
  // gives default name (including number) to new clients
  const name = 'client ' + (clientsInChat++);
  clients.forEach(cli => {
    cli.write(name + ' entered the room\n');
  });

  client.setEncoding('utf-8');
  clients.push(client);

  client.on('data', message => {
    clients.forEach(cli => {
      //if same as sender, break out and don't write message to them
      if(client === cli) return;
      cli.write(name + ' ' + message);
    });
  });

  client.on('close', () => {
    console.log(`client ${name} has left the chat`);
  });
});


module.exports = server;
