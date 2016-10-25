const assert = require('chai').assert;
const ChatRoom = require('../lib/ChatRoom');
// const ChatClient = require('../lib/ChatClient');
const server = require('../lib/ChatServer');
const net = require('net');

describe('ChatRoom unit tests', () => {

  const chatRoom = new ChatRoom();

  class MockClient {
    constructor() { }
    write(msg) { this.received = msg; }
  }
  const client1 = new MockClient();
  const client2 = new MockClient();

  it ('assigns a new client a default name', () => {
    chatRoom.addClient(client1);
    assert.equal(client1.name, 'Client 1');
  });

  it ('sends messages to other clients but not the sender', () => {
    let test_msg = 'Hello';
    chatRoom.addClient(client2);
    chatRoom.send(client1, test_msg);
    assert.equal(client2.received, `${client1.name}: ${test_msg}`);
    assert.isNotOk(client1.received);
  });

  it ('can broadcast messages to all clients', () => {
    let bcast_msg = 'This is a broadcast.';
    chatRoom.broadcast(bcast_msg);
    assert.equal(client1.received, `Broadcast: ${bcast_msg}\n`);
    assert.equal(client2.received, `Broadcast: ${bcast_msg}\n`);
  });

});

describe ('ChatRoom end-to-end', () => {
  const port = 65001;

  before (done => {
    server.listen(port, done);
  });

  describe ('ChatServer', () => {

    let client1 = null;
    let client2 = null;

    before (done => {
      client1 = net.connect({port: port}, (err) => {
        if (err) done(err);
        else {
          client1.setEncoding('utf-8');
          done();
        }
      });
    });

    it ('replies when a client joins the chat', (done) => {
      client1.once('data', data => {
        // console.log('client1 received ', data);
        assert.equal(data, 'Broadcast: Client 1 joined the chat...\n');
        done();
      });
      // let client1 = new ChatClient();
      // client1.connect('localhost', 65001, (err) => {
      //   if (err) done(err);
      //   assert.equal(client1.received === `Broadcast: ${client1.name} joined the chat...`);
      // });
    });

    it ('replies and broadcasts when a 2nd client joins the chat', (done) => {
      client1.once('data', data => {
        assert.equal(data, 'Broadcast: Client 2 joined the chat...\n');
      });
      client2 = net.connect({port: port}, (err) => {
        if (err) done(err);
        else {
          client2.setEncoding('utf-8');
          client2.once('data', data => {
            assert.equal(data, 'Broadcast: Client 2 joined the chat...\n');
            done();
          });
        }
      });
    });

    it ('sends messages to all clients except the sender', (done) => {
      client2.once('data', data => {
        assert.equal(data, 'Client 1: Hi, Client 2!\n');
        done();
      });
      client1.write('Hi, Client 2!\n');
    });

    it ('broadcasts message when a client leaves the chat', (done) => {
      client1.once('data', (data) => {
        assert.equal(data, 'Broadcast: Client 2 left the chat...\n');
        done();
      });
      client2.once('close', (err) => {
        if (err) done(err);
      });
      client2.end();
    });

    after (done => {
      client1.end(done);
    });

  });

  after (done => {
    server.close(done);
  });

});