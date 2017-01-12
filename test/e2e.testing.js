const net = require('net');
const assert = require('chai').assert;
const server = require('../tcp-server.js');

const port = 65000;

describe('server is testing', () => {
    before(done => {
        server.listen(port, done);
    });
});



describe('base functionality', () => {
    

    let client1 = null;
    before(done => {
        client1 = net.connect({port: port}, err => {
            if (err) done (err);
            else {
                client1.setEncoding('utf-8');
                done();
            }
        });
    });

    let client2 = null;
    before(done => {
        client2 = net.connect({port: port}, err => {
            if (err) done(err);
            else {
                client2.setEncoding('utf-8');
                client2.once('data', () => {});
                done();
            }
        });
    });

    it('server welcomes client when they connect', (done) => {
        client1.once('data', data => {
            console.log('server message to client:', data.toString());
            assert.equal(data, 'hello new client');
            done();
        });
    });

    it('client message is echoed back', (done) => {
        let echoMessage = 'echo me';

        client1.once('data', msg => {
            // console.log('second listener received', data.toString());
            assert.include(msg, echoMessage);
            done();
        });
        client2.once('data', msg => {
            done('Error' + msg);
        });
        client2.write(echoMessage, 'utf-8');
    });

    after(done => {
        client1.end(done);
    });
});