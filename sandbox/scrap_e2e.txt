const net = require('net');
const assert = require('chai').assert;
const server = require('../lib/tcp_server');
// const ChatGroup = require('../lib/chatGroup');
const port = 3000;

describe('server', () => {

    before(done => {
        server.listen(port, done);
    });
});

describe('base functionality', () => {
    let client = null;

    // let client = null;
    // before(done => {
    //     client = net.connect({ port: port}, err => {
    //         if (err) done (err);
    //         else {
    //             client.setEncoding('utf-8');
    //             done();
    //         }
    //     });
    // });

    // it('trying again', done => {
    //     console.log('trying trying again');
    //     done();
    // });
    it('server welcomes client when they connect'), done => {

        // let client = null;
        // before(done => {
            client = net.connect({ port: port}, err => {
                if (err) done (err);
                else {
                    client.setEncoding('utf-8');
                    // done();
                }
            });
        // });



        client.once('data', data => {
            console.log('we are inside of client.once');
            assert.equal(data, 'welcome new client');
            done();
        });
    });

    after(done => {
        client.end(done);
    });

});
