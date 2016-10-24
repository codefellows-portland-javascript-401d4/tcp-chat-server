const net = require('net');
// const chat = require('./chat_group');


const ChatGroup = class ChatGroup {
    constructor() {
        this.clientID = 1;
        this.clients = [];
    }

    create(client) {
        client.name = 'client ' + Math.round(Math.random(this.clientID) * 100);
        this.clients.push(client);
    }

    send(sender, message) {
        this.clients.forEach(c => {
            if(c === sender) return;

            c.write(`${sender.name}: ${message}`);
        });
    }


};



const chatGroup = new ChatGroup();

const server = net.createServer(client => {
    client.setEncoding('utf-8');
    chatGroup.create(client);
    console.log(client.name, 'connected!');

    client.on('data', message => {
        chatGroup.send(client, message);
    });


});

const port = 3000;

server.listen(port, err => {
    if (err) console.log('ERROR!', err);
    console.log('server listening on port', port, err);
});
