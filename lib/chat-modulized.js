const net = require('net');
const ChatRoom = require('./ChatRoom');
const chatRoom = new ChatRoom();

const server = net.createServer(client => {
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

const port = 65000;
server.listen(port, err => {
    if (err) console.log('ERROR!', err);
    else console.log('server listening on port', port);
})