const net = require('net');

const ChatGroup = require('./chatGroup');
const chatGroup = new ChatGroup();

const tcp_server = net.createServer(client => {
    
    client.setEncoding('utf-8');

    chatGroup.create(client);

    // server writes welcome message to new client
    client.write('welcome new client\n');

    // new client is logged on server
    console.log(client.name, 'connected!');

    // 'send' method is invoked on client socket 'data' event (i.e. writing a message)
    client.once('data', message => {
        chatGroup.send(client, message);
    });

    // 'remove' method is invoked on client socket 'end' event (i.e. client quits ChatGroup). Event is logged on server
    client.once('end', client => {
        console.log('A client has disconnected');
        chatGroup.remove(client);
    });

    // error handler, currently only logs error
    client.once('error', (err) => {
        console.log(err);
    });

});

module.exports = tcp_server;
