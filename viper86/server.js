'use strict';

const net = require('net');
const ChatRoom = require('./chat-room');
const chatRoom = new ChatRoom();

const port = process.env.PORT || 65000;

const server = net.createServer(client => {
    client.setEncoding('utf-8');

    chatRoom.add(client);
    client.write('Welcome! \n');

    client.on('data', msg => {
        chatRoom.send(client, msg);
    });

    client.on('close', () => {
        chatRoom.remove(client);
    });
});

server.listen(port, err => {
    if (err) console.log(`Error: ${err}`);
    console.log(`Server listening on port ${server.address().port}`);
});

module.exports = server;