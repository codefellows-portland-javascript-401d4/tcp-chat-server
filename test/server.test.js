// process of testing will start up a real server
// create real clients. similar to dummy clients.
// make request to tcp server.

//tcp is the connection and sending and receiving data
// http is about the website site: GET, POST, PUT, DELETE

const net = require('net');
const assert = require('chai').assert;
const server = require('../lib/server');

describe('my tcp server', () => {
  const port = 65000;

  before(done => {
    //starts the server
    server.listen(port, done);
  });

  describe('client connection to server and utf-8', () => {
    let client = null; //sets up variable
    before(done => {
      //net.connect takes an object which is the port and calls the server for this client.
      client = net.connect({port:port}, err => { //creates a client connection to the server
        if(err) done(err);
        else{
          client.setEncoding('utf-8');
          done();
        }
      });
    });
    before(done => {
      guest2 = net.connect({port:port}, err => {
        if(err) done(err);
        else{
          guest2.setEncoding('utf-8');
          done();
        }
      });
    });

    //when the client enters the chat, we want them to receive a hello
    it('says entering message to client when client enters chat', done => {
      client.once('data', data => { //data the client received which should be hello
        assert.equal(data, 'guest 1 entered the room\n');
        done();
      });
    });
    let guest2 = null;
    //test to see if client message is sent back to them
    it('guest2 sees the entering room message', done => {
      guest2.once('data', data => { //when the client received data which should be the message
        assert.equal(data, 'guest 2 entered the room\n');
        done();
      });
    });
    it('client2 sees client1 message', done => {
      const message2 = 'hi i am guest 1';
      client.write(message2);
      guest2.once('data', data => {
        assert.equal(data, 'guest 1: ' + message2);
        done();
      });
    });

    after(done => {
      client.end(done); //when the tests are done, the client leaves the room
    });
    after(done => {
      guest2.end(done);
    });

  });
  after(done => {
    server.close(done);
  });
});
