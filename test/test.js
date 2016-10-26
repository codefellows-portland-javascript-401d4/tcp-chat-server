const net = require('net');
const assert = require('chai').assert;
const server = require('../server');
const ChatRoom = require('../chatRoom');

const chatRoom = new ChatRoom();
const port = 65000;
var client = null;
var client2 = null;

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

        it('creates multiple clients', function(done){
            console.log('clients length is ', chatRoom.clients.length);
            assert(chatRoom.clients.length === 2);
            done();
        });
        
        it('names clients', function(done){
            assert(client.name === 'client 1');
            chatRoom.rename(client, 'Steve');
            done();
        });

        it('greets clients with a message', function(done){
            assert('Welcome to the chatroom, client 1.  If you do not like your username you can change it to a nickname with the following commands: \n "/lady" = change to a female nickname. \n "/gent" = change to a male nickname.  \n "/whocares" = change to any nickname. \n\n' === client.greeting);
            done();
        });

        it('changes client names', function(done){
            assert(client.name === 'Steve');
            chatRoom.send(client, 'fart');
            console.log('farted');
            done();
        });

        it('allows clients to message on another', function(done){
            client.on('data', function(data){
                console.log('data are ', data);
                assert('Test hello' === data);
                chatRoom.remove(client); 
                chatRoom.remove(client2);
                console.log('semifinal clients are ', chatRoom.clients.length);
                done();
            });
            client2.write('Test hello');
        });
    
        // it('removes clients', function(done){
        //     console.log('final clients are ', chatRoom.clients.length);
        //     assert(0 === chatRoom.clients.length);
        //     done();
        // });

    
        // after(done => {
        //     client.once('close', done);
        //     client.end(done);
        // });  

        // after(done => {
        //     server.close(done);
        // });

    });
     done;
});