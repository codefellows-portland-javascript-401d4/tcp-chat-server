//
const net = require('net');
const assert = require('chai').assert;
const server = require('../lib/tcp-chat-server');

describe('tcp chat server', () => {

    const port = 59109;
    before(done => {
        server.listen(port, done);
    });

    describe('basic functionality tests', () => {

        let client = null;
        before(done => {
            client = net.connect({ port: port }, err => {
                if (err) done(err);
                else done();
            });
        });

        it('send greeting when client connects', done => {
            client.once('data', data => {
                assert.equal(data, 'Welcome');
                done();
            });
        });

        it('client message echoed back', done => {
            const message = 'echo my message';

            client.once('data', data => {
                assert.equal(data, message);
                done();
            });

            client.write(message);
        });

        after(done => {
            // undocumented node feature, client.end takes a callback
            client.end(done);
        });
    });

    describe('Additional client Chat Room functionality', () => {
        // setup clients
        let client2 = null,
            client3 = null,
            client4 = null;

        before(done => {
            client2 = net.connect({ port: port }, err => {
                if (err) done(err);
                else {
                    client2.setEncoding('utf-8');
                    client3 = net.connect({ port: port }, err => {
                        if (err) done(err);
                        else {
                            client3.setEncoding('utf-8');
                            client4 = net.connect({ port: port }, err => {
                                if (err) done(err);
                                else {
                                    client4.setEncoding('utf-8');
                                    // ignore the 'Welcome message sent to all new clients.'
                                    client2.once('data', data => {
                                        client3.once('data', data => {
                                            client4.once('data', data => {});
                                        });
                                    });
                                    done();
                                };
                            });
                        };
                    });
                };
            });
        });

        it('Sharing a client message', done => {
            const message = 'test message';

            client3.once('data', data => {
                assert.equal(data, 'guest-2: ' + message);
                client4.once('data', data => {
                    assert.equal(data, 'guest-2: ' + message);
                    done();
                });
            });

            client2.write(message);
        });


        it('Sending message of a new Client NickName', done => {
            const message = '/nick MyNewName';

            client2.once('data', data => {
                assert.equal(data, 'guest-3 shall henceforth be known as MyNewName\n');
                client4.once('data', data => {
                    assert.equal(data, 'guest-3 shall henceforth be known as MyNewName\n');
                    done();
                });
            });

            client3.write(message);
        });

        

        after(done => {
            client2.end();
            client3.end();
            client4.end(done);
        });

    });

    after(done => {
        server.close(done);
    });

});
