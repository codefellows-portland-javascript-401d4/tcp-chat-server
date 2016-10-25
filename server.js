'use strict';

const net = require('net');
const ChatRoom = require('./chat-room');
const chatRoom = new ChatRoom();

const server = net.createServer(client => {
    client.setEncoding('utf-8');

    chatRoom.add(client);

    client.on('data', msg => {
        chatRoom.send(client, msg);
    });

    client.on('close', () => {
        chatRoom.remove(client);
    });
});

const port = 55555;
server.listen(port, err => {
    if (err) console.log(`Error: ${err}`);
    console.log(`Server listening on port ${port}`);
});
