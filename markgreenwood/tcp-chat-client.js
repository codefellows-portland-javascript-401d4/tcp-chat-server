const net = require('net');
const readline = require('readline');

let port = process.argv[3];
let host = process.argv[2];

const rl = readline.createInterface( { input: process.stdin, output: process.stdout } );

let client = net.connect(port, host, () => {

  console.log(`Connected on port ${port}...`);

  client.setEncoding('utf-8');

  client.on('data', (data) => {
    console.log(data);
  });

  rl.on('close', () => {
    client.end();
  });

  rl.on('line', (msg) => {
    if (msg === '/quit') {
      rl.close();
    }
    else {
      client.write(msg);
    }
  });
});