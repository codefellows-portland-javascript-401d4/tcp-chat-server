// core node library for tcp server
const net = require('net');
const ChatRoom = require('./ChatRoom');

const chatRoom = new ChatRoom();

const server = net.createServer(client => {
    client.setEncoding('utf-8');

    chatRoom.add(client);
    console.log(`client ${client.name} has connected`);

    client.on('data', message => {
        // do more stuff in here based on message.
        const messageParts = message.split(' ');
        if(messageParts[0] === '/nick') {
            client.nickName = messageParts[1];
            chatRoom.nameChange(client);
            console.log(`${client.name} is using the nickName: ${client.nickName} `);
        } else {
            chatRoom.send(client, message);
        };
    });

    client.on('close', () => {
        chatRoom.remove(client);
        console.log(`client ${client.name} has disconnected`);
    });

});

const port = 59109;
server.listen(port, err => {
    if (err) console.log('ERROR!', err);
    else console.log('server listening on port:', port);
});

