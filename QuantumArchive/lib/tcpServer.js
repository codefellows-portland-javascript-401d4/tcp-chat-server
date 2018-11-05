const net = require('net');
const ChatRoom = require('./Chatroom');
const chatRoom = new ChatRoom();

const server = net.createServer(client => {
    client.setEncoding('utf-8');
    var messageParsed = '';
    var newNick = '';

    chatRoom.add(client);

    //chatRoom.whoshere();

    client.on('data', message => {
        chatRoom.send(client, message);
        messageParsed = message.split(' ');
        if (messageParsed[0] === '/nick' && 1 < messageParsed.length) {
            newNick = messageParsed[1].replace('\r\n','');
            chatRoom.changeName(client, newNick);
        };
        console.log(`${client.name}: ${message}`);
    });

    client.on('close', () => {
        chatRoom.disconnectMessage(client);
        chatRoom.remove(client);
        console.log(`${client.name} has disconnected`);
    });
});

module.exports = server;