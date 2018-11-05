// core node library for tcp server
const net = require('net');
const ChatRoom = require('./ChatRoom');
const chatRoom = new ChatRoom();

const server = net.createServer(client => {
    client.setEncoding('utf-8');

    chatRoom.add(client);
    client.write('Welcome\n');
    console.log(`client ${client.name} has connected`);

    client.on('data', message => {
        chatRoom.send(client, message);
        console.log(`client ${client.name} sent message`);
    });

    client.on('close', () => {
        chatRoom.remove(client);
        console.log(`client ${client.name} has disconnected`);
    });

    client.on('end', () => {
        chatRoom.remove(client);
        console.log(`client ${client.name} has disconnected`);
    });

});

module.exports = server;
