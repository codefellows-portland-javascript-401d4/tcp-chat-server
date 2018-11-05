const net = require('net');
const assert = require('chai').assert;
const server = require('../echo-server');

describe('echo server', () => {

    const port = 65000;

    before(done => {
        server.listen(port, done);
    });

    describe('basic user interactions', () => {
        let user = null;
        let user2 = null;
        before(done => {
            user = net.connect({port: port}, err => {
                if (err) done (err);
                else {
                    user.setEncoding('utf-8');
                    done();
                }
            });
        });

        beforeEach(done => {
            user2 = net.connect({port: port}, err => {
                if (err) done (err);
                else {
                    user2.setEncoding('utf-8');
                    done();
                }
            });
        });

        it('greets user upon connection', done => {
            user.once('data', data => {
                console.log('First listener received: ', data);
                assert.include(data, 'Welcome');
                done();
            });
        });

        it('tells user when another user has logged on', done => {
            user.once('data', data => {
                console.log('Second listener received: ', data);
                assert.include(data, 'has logged on.');
                done();
            });
        });

        it('user sees message that was  by another user', done => {
            const message = 'This was typed.';

            user.on('data', data => {
                if (data.substr(-15) === message) {
                    console.log('Third listener received: ', data);
                    assert.include(data, message);
                    done();
                }
            });
            user2.write(message);
        });

        it('tells user that another user has logged off', done => {
            user.on('data', data => {
                const logoff = 'has logged off.';
                if (data.substr(-15) === logoff) {
                    console.log('Fourth listener received: ', data);
                    assert.include(data, logoff);
                    done();
                }
            });
            user2.end();
        });

        after(done => {
            user.end(done);
        });
    });
});