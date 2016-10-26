const net = require('net');
const assert = require('chai').assert;
const server = require('../server');
const ChatRoom = require('../chatRoom');

const chatRoom = new ChatRoom();
const port = 65000;
var client = null;
var client2 = null;
const message = 'Howdy';

describe('chat program', function(done){     
    before(done => {
        server.listen(port, done);
    });

    describe('basic client functionality', () => {
        before(done => {
            client = net.connect({ port: port }, err => {
                if (err) done(err);
                else {
                    console.log('server connected on port', port);
                    client.setEncoding('utf-8');
                    done();
                }
            });
        });

        before(done => {
            client2 = net.connect({ port: port }, err => {
                if (err) done(err);
                else {
                    client2.setEncoding('utf-8');
                    done();
                }
            });
        });



        before(done => {
            chatRoom.add(client);
            chatRoom.add(client2);
            done();
        });

        it('sends a greeting to clients', function(done){
            client.once('data', data => {
                console.log('second listener received', data.toString());
                client2.write(message);
                assert('Welcome to the chatroom, client 1.  If you do not like your username you can change it to a nickname with the following commands: \n "/lady" = change to a female nickname. \n "/gent" = change to a male nickname.  \n "/whocares" = change to any nickname. \n\n' === data);
                done();
            });
        });
    
        it('allows clients to message on another', function(done){
            client.once('data', data => {
                const arr = data.split(' ');
                const words = arr[2].toString();
                console.log('second listener received', data.toString());
                assert.equal(words, message);
                done();
            });
            client2.write(message);
            done;
        });


        // after(done => {
        //     client.once('close', done);
        //     client.end(done);
        // });  

        // after(done => {
        //     server.close(done);
        // });
        done;
    });
});