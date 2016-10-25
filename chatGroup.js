const net = require('net');


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

    remove(client) {
        const index = this.clients.indexOf(client);
        if (index !== -1) this.clients.splice(index, 1);
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

    client.on('close', client => {
        console.log('A client has disconnected');
        chatGroup.remove(client);
    });

});

const port = 3000;

server.listen(port, err => {
    if (err) console.log('ERROR!', err);
    console.log('server listening on port', port, err);
});

module.exports = ChatGroup;
