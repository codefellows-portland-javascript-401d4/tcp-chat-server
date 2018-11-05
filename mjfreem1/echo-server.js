const net = require('net');
const strippedDownAIM = require('./aim');
const aim = new strippedDownAIM();

const server = net.createServer(user => {
    user.setEncoding('utf-8');

    aim.add(user);
   
    user.on('data', message => {
        aim.send(user, message);
    });

    user.on('close', () => {
        aim.remove(user);
    });
});

module.exports = server;