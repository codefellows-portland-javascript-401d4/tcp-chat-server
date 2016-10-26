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

        it('user sees message that was entered', done => {
            const message = 'This was typed.';

            user.on('data', data => {
                if ( data.substr(-15) === message) {
                    console.log('Second listener received: ', data);
                    assert.include(data, message);
                    done();
                }
                
            });
            
            user2.write(message);
            
        });

        after(done => {
            user.end(done);
        });

        after(done => {
            user2.end(done);
        });
    });
});