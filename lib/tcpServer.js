const net = require('net');

//counter to name clients
let i = 1;

//array of random names
const rootNames = ['beet', 'rutabaga', 'turnip', 'carrot', 'celeriac','maca', 'jicama', 'parsnip', 'radish', 'salsify', 'ginger', 'cassava'];

//create the server
const tcpServer = net.createServer((client) => {
  const name = 'client ' + (i++);
  client.setEncoding('utf-8');

  console.log('client', name, 'is now connected');
  client.write(`Welcome ${name}, enjoy your connection!`);

  //client sent data!
  client.on('data', data => {
    client.write(data + '\n'); //this echoes the data the client sent back to them
  });

  //client closes connection
  client.on('close', () => {
    console.log(`client ${name} has disconnected`);
  });
});

const port = 12121;
tcpServer.listen(port, err => {
  if (err) return err;
  let whatErr = 'no errors';
  console.log('server listening on port', port, whatErr);
});