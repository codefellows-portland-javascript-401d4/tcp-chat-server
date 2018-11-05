const tcpServer = require('../lib/tcpServer');
const ChatRoom = require('../lib/ChatRoom');
const net = require('net');
const assert = require('chai').assert;


describe('unit testing tcp server functions', () => {
  const chatRoom = new ChatRoom();

  //mock client construction to test functionality
  class MockClient {
    write(message) {
      this.received = message;
    }
  }
  const client1 = new MockClient();
  const client2 = new MockClient();
  const client3 = new MockClient();

  it('adds clients', () => {
    assert.equal(chatRoom.clients.length, 0);
    chatRoom.add(client1);
    chatRoom.add(client2);
    assert.equal(chatRoom.clients.length, 2);
    //checks to see that objects assigned to same place in memory
    assert.equal(chatRoom.clients[0], client1);
  });

  it('broadcast sends to other clients', () => {
    chatRoom.add(client3);
    chatRoom.send(client3, 'howdy!');
    assert.equal(client1.received, `${client3.name}: howdy!`);
    assert.notEqual(client3.received, `${client3.name}: howdy!`);
  });

  it('removes clients when disconnected', () => {
    chatRoom.remove(client2);
    assert.equal(chatRoom.clients.length, 2);
    assert.notEqual(chatRoom.clients[1], client2);
  });
});

describe('E2E testing tcp server functions', () => {
  const port = 12121;
  
  before(done => {
    tcpServer.listen(port, done);
  });
  
  let client1 = null;
  before(done => {
    client1 = net.connect({port: port}, err => {
      if (err) done(err);
      else {
        client1.setEncoding('utf-8');
        done();
      }
    });
  });

  let client2 = null;
  before(done => {
    client2 = net.connect({port: port}, err => {
      if (err) done(err);
      else {
        client2.setEncoding('utf-8');
        //clears the welcome msg "buffer"
        client2.once('data', () => {});
        done();
      }
    });
  });

  it('welcomes clients to room', (done) => {
    client1.once('data', welcome => {
      assert.isOk(/^Welcome/.test(welcome.toString()));

      let sliceWelcome = welcome.toString().slice(8);
      assert.isOk(/./.test(sliceWelcome));
      done();
    });
  });

  it('broadcast sends to other clients', (done) => {
    let testMsg = 'blahty blah blah';

    client1.once('data', msg => {
      assert.include(msg, testMsg);
      done();
    });
    client2.once('data', msg => {
      done('ERROR: client2 should not receive msg: ' + msg);
    });
    client2.write(testMsg, 'utf-8');
  });

  after(done => {
    client1.end(done);
  });
});