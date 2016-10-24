const net = require('net');

let count = 1;
const clients = [];

const server = net.createServer(client => {
    const username = 'client' + (id++);
    client.setEncoding('utf-8');

    clients.push(client);

    client.on('data', message => {
        clients.forEach(c => {
            if (c === client) return;
            c.write(`${username}: ${message}`);
        });
    });

    client.on('close', () => {
        const clientIndex = clients.indexOf(client);
        if (clientIndex !== -1) clients.splice(clientIndex, 1);
        console.log(`client ${username} has disconnected`);
    });
});

const port = 65000;
server.listen(port, err => {
    if (err) console.log('ERROR', err);
    console.log('server is listening on port', port);
});