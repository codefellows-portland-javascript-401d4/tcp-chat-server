// core node library for tcp server
const net = require('net');
const ChatRoom = require('./ChatRoom');
const port = process.env.PORT || 59109;

const chatRoom = new ChatRoom();

const server = net.createServer(client => {
    client.setEncoding('utf-8');

    chatRoom.add(client);
    console.log(`client ${client.name} has connected`);

    client.on('data', message => {
        // do more stuff in here based on message.
        // const messageParts = message.replace(/\r/, '').replace(/\n/, '').split(' ');
        // const messageParts = message.replace(/\n/, '').split(' ');
        // if(messageParts[0] === '/nick') {
        //     client.nickName = messageParts[1];
        //     chatRoom.nameChange(client);
        //     console.log(`${client.name} is using the nickName: ${client.nickName} `);
        // } else {
        //     chatRoom.send(client, message);
        // };
        chatRoom.send(client, message);
        console.log(`client ${client.name} sent message`);
    });

    client.on('close', () => {
        chatRoom.remove(client);
        console.log(`client ${client.name} has disconnected`);
    });

});

server.listen(port, err => {
    if (err) console.log('ERROR!', err);
    else console.log('server listening on port:', port);
});

