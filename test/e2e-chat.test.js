const assert = require('chai').assert;
const net =require('net');
const server = require('../lib/chat-server');

describe('echo server', () => {
    const port = 55555;
    let client1 = null;
    let client2 = null;
    let message = 'Hello PEOPLE!'
    
    before(done => {
        server.listen(port, done);
    });



    describe('chat tests', () => {

        before(done => {
            client1 = net.connect({ port: port }, err => {
                if (err) done(err)
                else {
                    client1.setEncoding('utf-8');
                };
            });
            client2 = net.connect({ port: port }, err => {
                if (err) done(err)
                else {
                    client2.setEncoding('utf-8');
                    done();
                };
            });
        });

        it('greets on connection', done => {
            client1.once('data', message => {
                console.log(message);
                assert.equal(message.substring(0, 5), 'Hello');
                done();
            })
        })

        it('messages are sent', done => {
            client2.once('data', mess => {
                if (mess.substring(mess.length - 12) === message)
                    assert.isNotOk(data);
                    done();
            })
            client2.write(message);
        });

        after(done => {
            client1.end();
            client2.end(done);
        })
    
    });
    
    after(done => {
        server.close(done);
    });


});