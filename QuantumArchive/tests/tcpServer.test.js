const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const fs = require('fs');
const ChatRoom = require('../lib/Chatroom');
const server = require('../lib/tcpServer');
const net = require('net');

describe('Tests run on TCP chat server to check E2E performance', done => {
    
    const port = 65000;
    let clientOne = null;
    let clientTwo = null;
    
    //initiates the server to begin listening to port 65000
    before(done => {
        server.listen(port, done);
    });

    //connect clientOne to the server
    before(done => {
        clientOne = net.connect({port: port}, err => {
            if (err) done(err);
            else {
                clientOne.setEncoding('utf-8');
                done();
            };
        });
    });

    //connect clientTwo to the server
    before(done => {
        clientTwo = net.connect({port: port}, err => {
            if (err) done(err);
            else {
                clientTwo.setEncoding('utf-8');
                done();
            };
        });
    });

    describe('tests some basic messaging of the chatroom across the server', done => {
        it('clientOne send messages to the chatroom', done => {
            let messageOne = 'hello';
            let messageTwo = 'yo!';
            clientTwo.once('data', data => {
                assert.equal(data, 'client 1: hello');
                clientTwo.write(messageTwo);
            });
            clientOne.once('data', data => {
                assert.equal(data, 'client 2: yo!');
                done();
            });
            clientOne.write(messageOne);
        });

        //closures :)
        function dataListener (data, cb) {
            var index = 0;
            let messageTwo = 'I\'m Doko now!';
            return function(data) {
                if (index === 0) {
                    assert.equal(data, 'client 1: /nick Doko');
                    index += 1;
                    clientOne.write(messageTwo);
                } else {
                    assert.equal(data, 'client 1 changed name to Doko\nDoko: I\'m Doko now!');
                    clientTwo.removeAllListeners('data');
                    cb(); 
                };
            };
        };

        it('clientOne changes there name to Doko and sends a message', done => {
            let messageOne = '/nick Doko';
            let data = '';
            clientTwo.on('data', dataListener(data, done));
            clientOne.write(messageOne);
        });

        it('Checks that the server sends a message when Doko disconnects', done => {
            clientTwo.once('data', data => {
                assert.equal(data, 'Doko has disconnected');
                done();
            });
            clientOne.end();
        });

        after(done => {
            clientTwo.on('close', done);
            clientTwo.end();
        });
    });

    //closes server and frees up port
    after(done => {
        server.close(done);
    });
});