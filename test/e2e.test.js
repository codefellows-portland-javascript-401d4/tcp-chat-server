const net = require('net');
const assert = require('chai').assert;
const server = require('../lib/chat-server');
const ChatRoom = require('../lib/ChatRoom');

describe('Chat Room Server', () => {

  //create a new chatroom

  const port = 65000;

  before(done => {
    server.listen(port, done);
  });

  describe('client side functionality', () => {

    //set to null to match reference type(object)
    let client1 = null;
    let client2 = null;
    //establish client connection
    before(done => {
      client1 = net.connect({port: port}, err => {
        if (err) done(err);
        else {
          client1.setEncoding('utf-8');
          done();
        }
      });
    });

    //establish client connection
    before(done => {
      client2 = net.connect({port: port}, err => {
        if (err) done(err);
        else {
          client2.setEncoding('utf-8');
          done();
        }
      });
    });

    it('sends messages to other visitors', (done) => {
      client1.once('data', data => {
        assert.equal(data, 'visitor 2: hello');
        done();
      });
      client2.write("hello");
    });

  });

  after(done => {
    server.close(done());
  });

});
