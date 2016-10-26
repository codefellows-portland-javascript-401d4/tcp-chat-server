const net = require('net');
const assert = require('chai').assert;
const server = require('../index');
// const ChatGroup = require('../lib/chatGroup');
// const chatGroup = new ChatGroup;
const port = 3000;


describe('server', () => {

    before(done => {
        server.listen(port, done);
    });
});

describe('base functionality', () => {
    let client = null;
    before(done => {
        client = net.connect({ port: port}, err => {
            if (err) done (err);
            else {
                client.setEncoding('utf-8');
                done();
            }
        });
    });

    it('server welcomes client when they connect', done => {
        client.once('data', data => {
            console.log('server message to client:', data.toString());
            assert.equal(data, 'welcome new client\n');
            done();
        });
    });


    // it('clients broadcast messages to all clients', done => {
    //     client.once('data', message => {
    //         chatGroup.send(client, message);
    //         done();
    //     });
    // });

    after(done => {
        client.end(done);
    });

});
