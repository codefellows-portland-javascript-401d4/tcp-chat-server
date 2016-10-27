const net = require('net');
const ChatRoom = require('./ChatRoom');
const chatRoom = new ChatRoom();

const server = net.createServer((client) => {
    client.setEncoding('utf-8');

    chatRoom.add(client);
    console.log(client.name + " has connected");

    client.on('data', message => {
        chatRoom.send(client, message);
    });

    client.on('close', () => {
        chatRoom.remove(client);
        console.log(client.name + " has disconnected");
    });
});

module.exports = server;