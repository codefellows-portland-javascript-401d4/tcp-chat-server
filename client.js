const net = require('net');
const nicknames = require('nicknames');

const client = {};

client.clients = [];

c.server = net.createServer(client => {
    const name =  nicknames.allRandom();
    client.setEncoding('utf-8');

    chat.clients.push(client);

    client.on('data', message => {
        //send this to all the other clients
        chat.clients.forEach(c => {
            // if same as sender, return (exit this particular forEach invocation)
            if(c === client) return;
            // otherwise send the message
            c.write(`${name}: ${message}`);
        });
    });

    client.on('close', () => {
        // remove from array:
        const index = client.clients.indexOf(client);
        if (index !== -1) client.clients.splice(index, 1);
        console.log(`client ${name} has disconnected`);
    });
});

client.port = 65000;
client.server.listen(client.port, err => {
    if (err) console.log('ERROR!', err);
    else console.log('server listening on port', client.port);
});

module.exports = client;