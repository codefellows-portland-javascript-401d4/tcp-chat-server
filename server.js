const net = require('net');
const ChatRoom = require('./chatRoom');
var nicknames = require('nicknames');

const chatRoom = new ChatRoom();

const server = net.createServer(client => {
    client.setEncoding('utf-8');

    chatRoom.add(client);

    client.on('data', message => {
        var ladypatt = /^\/lady/g;
        var gentpatt = /^\/gent/g;
        var patt = /^\/whocares/g;

        if (ladypatt.test(message)){
            const newName = nicknames.femaleRandom();
            chatRoom.rename(client, newName);
        }
        else if (gentpatt.test(message)){
            const newName = nicknames.maleRandom();
            chatRoom.rename(client, newName);
        }
        else if (patt.test(message)){
            const newName = nicknames.allRandom();
            chatRoom.rename(client, newName);
        }
        else{
            chatRoom.send(client, message);
        }
    });

    client.on('close', () => {
        chatRoom.remove(client);
    });
});

module.exports = server;