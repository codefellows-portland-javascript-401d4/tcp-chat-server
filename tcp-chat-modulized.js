const net = require('net');

let i = 1;
const clients = [];

const server = net.createServer(client => {
  const name = 'client ' + (i++);
  client.setEncoding('utf-8');

  clients.push(client);

  //"client" is a duplex stream
  client.on('data', message =>{
      //send to other clients
    clients.forEach(c => {
    //if same as sender
    if(c !== client) return;
    //otherwise send to others
      c.write(name + ' ' + message);
  });
});

  client.on('close', () => {
    console.log(`Client ${name} has disconnected`);
  });

const port = 65000;
server.listen(port, err => {
  console.log('server listening on port', port, err);
});