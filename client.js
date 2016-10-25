const net = require('net');
const nicknames = require('nicknames');

const chat = {};

chat.clients = [];

chat.server = net.createServer(client => {
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
        const index = chat.clients.indexOf(client);
        if (index !== -1) chat.clients.splice(index, 1);
        console.log(`client ${name} has disconnected`);
    });
});

chat.port = 65000;
chat.server.listen(chat.port, err => {
    if (err) console.log('ERROR!', err);
    else console.log('server listening on port', chat.port);
});

module.exports = chat;