'use strict';

const net = require('net')
const dogs = require('dog-ascii-faces');
const DogChat = require('./lib/DogChat');
const dogChat = new DogChat();

const server = net.createServer(client => {
    client.setEncoding('utf-8');

    dogChat.add(client);
    client.write('Welcome to DogChat', client);

    client.on('data', message => {
        dogChat.send(client, message);
        console.log(dogs());
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