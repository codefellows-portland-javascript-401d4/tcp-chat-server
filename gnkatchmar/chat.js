const net = require('net');
const Chatter = require('./Chatters');
const chatter = new Chatter();

const server = net.createServer(client => {
  client.setEncoding('utf-8');

  chatter.add(client);
  console.log(client.name, 'has connected');

  client.on('data', message => {
    chatter.send(client, message);
  });

  client.on('close', () => {
    chatter.remove(client);
    console.log(client.name, 'has disconnected');
  });
});

const port = 65000;
server.listen(port, err => {
  if (err) console.log('ERROR!', err);
  else console.log('server listening on port', port);
});