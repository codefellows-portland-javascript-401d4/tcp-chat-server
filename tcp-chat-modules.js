const net = require('net');
const chat = require('./chat-space');
const chatSpace = new ChatSpace();

const server = net.createServer(client => {
    client.setEncoding('utf-8');

    chatSpace.add(client);

    client.on('data', message => {
        chatSpace.send(client, message);
    });

    client.on('close', () => {
        chatSpace.remove(client);
    });
});

const port = 65000;
server.listener(port, err => {
    if (err) console.log('ERROR', err);
    else console.log('server is listening on port', port);
});