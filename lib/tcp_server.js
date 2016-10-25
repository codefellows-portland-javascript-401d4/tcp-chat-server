const net = require('net');
const ChatGroup = require('./chatGroup');
const chatGroup = new ChatGroup();

const tcp_server = net.createServer(client => {
    client.setEncoding('utf-8');
    chatGroup.create(client);
    client.write('welcome new client');
    console.log(client.name, 'connected!');

    client.on('data', message => {

        chatGroup.send(client, message);
    });

    client.on('close', client => {
        console.log('A client has disconnected');
        chatGroup.remove(client);
    });

    client.on('error', (err) => {
        console.log(err);
    });

});

// const port = 3000;
//
// server.listen(port, err => {
//     if (err) console.log('ERROR!', err);
//     console.log('server listening on port', port, err);
// });

module.exports = tcp_server;
