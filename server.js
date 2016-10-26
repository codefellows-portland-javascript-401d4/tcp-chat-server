const net = require('net');


const server = net.createServer(client => {

    client.setEncoding('utf-8');
    chatRoom.add('client');
    client.on('data', message => {
        chatRoom.chat(client, message);
    });
    client.on('close', () => {
        chatRoom.leaveChatRoom(client);
    });
});

module.exports = server;