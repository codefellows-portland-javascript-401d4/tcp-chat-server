const net = require('net');
const chat = require('./chat-space');
const chatSpace = new ChatSpace();

const server = net.createServer(client => {
    const username = 'client' + (id++);
    console.log('client', username, 'connected');

    client.setEncoding('utf-8');

    chatSpace.add(client);

    client.on('data', message => {
        chatSpace.send(client, message);
    });

    client.on('close', () => {
        console.log(`client ${username} has disconnected`);
        chatSpace.remove(client);
    });
});

const port = 65000;
server.listener(port, err => {
    if (err) console.log('ERROR', err);
    else console.log('server is listening on port', port);
});