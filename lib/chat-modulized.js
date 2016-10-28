const net = require('net');
const ChatRoom = require('./ChatRoom');
const chatRoom = new ChatRoom();

const server = net.createServer((client) => {
    client.setEncoding('utf-8');

    chatRoom.create(client);
    client.write('hello new client')
    console.log(client.name + " has connected");


    client.on('data', message => {
        chatRoom.send(client, message);
    });

    client.on('close', client => {
        chatRoom.remove(client);
        console.log(client.name + " has disconnected");
    });

    client.on('error', (err) => {
        console.log(err);
    })
});

module.exports = server;