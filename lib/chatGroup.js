// const net = require('net');


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
        // const leaving = client;
        // const message = 'bye';
        // this.clients.forEach(c => {
        //     if(c === leaving) return;
        //
        //     c.write(`${leaving.name}: ${message}`);
        // });
        const index = this.clients.indexOf(client);
        // console.log(client.name);
        // const leaving = this.clients.splice(index, 1);
        if (index !== -1) this.clients.splice(index, 1);
        // if (index !== -1) leaving;
        // console.log(leaving.name, 'has left');
        // return leaving;
    }

};

// const chatGroup = new ChatGroup();
//
// const server = net.createServer(client => {
//     client.setEncoding('utf-8');
//     chatGroup.create(client);
//     console.log(client.name, 'connected!');
//
//     client.on('data', message => {
//         chatGroup.send(client, message);
//     });
//
//     client.on('close', client => {
//         console.log('A client has disconnected');
//         chatGroup.remove(client);
//     });
//
// });
//
// const port = 3000;
//
// server.listen(port, err => {
//     if (err) console.log('ERROR!', err);
//     console.log('server listening on port', port, err);
// });

module.exports = ChatGroup;
