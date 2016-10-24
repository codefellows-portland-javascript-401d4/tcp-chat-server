'use strict';

const net = require('net');

let clientCounter = 1;
const clients = [];

const server = net.createServer(client => {
    clients.push(client);
    const name = `Client ${clientCounter++}`;
    console.log(`${name} connected`);
    client.setEncoding('utf-8');

    client.on('data', msg => {
        clients.forEach(c => {
            if (c === client) return;
            c.write(`${name}: ${msg}`);
        });
    });

    client.on('close', () => {
        console.log(`${name} has disconnected`);
        //TODO remove client from clients array
    });
});

const port = 55555;
server.listen(port, err => {
    if (err) console.log(`Error: ${err}`);
    console.log(`Server listening on port ${port}`);
});
