'use strict';

const net = require('net');
const assert = require('chai').assert;
const server = require('../server');

describe('chat server', () => {

    const port = 65000;

    before(done => {
        server.listen(port, done);
    });

    describe('basic chat functionality', () => {

        let client = null;
        before(done => {
            client = net.connect({ port: port }, err => {
                if (err) {
                    done(err);
                } else {
                    client.setEncoding('utf-8');
                    done();
                }
            });
        });

        it('creates users', () => {
            assert.isOk(client);
        });

        it('welcomes users', done=> {
            const msg = 'Welcome! \n';

            client.once('data', data => {
                assert.equal(data, msg);
                done();
            });
        });

        after(done => {
            client.end(done);
        });
    });

});