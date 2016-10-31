'use strict';

const net = require('net')
const DogChat = require('./lib/dogChat');
const dogChat = new DogChat();

const server = net.createServer(client => {
    client.setEncoding('utf-8');

    dogChat.add(client);
    client.write('welcome to dog-chat! \n', client);

    client.on('data', message => {
        dogChat.send(client, message);
    });

    client.on('close', () => {
        dogChat.remove(client);
    });
});

const port = 65000;
server.listen(port, err => {
    if(err) console.log(`ERROR: ${err}`);
    else console.log(`server is listening on port: ${port}`);
});

module.exports = server;