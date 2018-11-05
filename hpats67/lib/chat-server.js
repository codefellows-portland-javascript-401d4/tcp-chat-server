const net = require('net');
const chat = require('../lib/chat');

const newChat = new chat();

const server = net.createServer(socket => {
    socket.setEncoding('utf-8');

    newChat.add(socket);

    socket.once('data', message => {
        newChat.send(socket,message);
        let parsed = message.split(' ');
        if (parsed[0] === '/newName') {
            newName = parsed[1].replace('\r\n','');
            newChat.changeName(socket, newName);
            console.log(socket.name);
        }
    });

    socket.once('close', () => {
        newChat.leaveChat(socket);
        console.log(`${socket.name} has disconnected`);
    });
});

module.exports = server;