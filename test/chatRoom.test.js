const assert = require('chai').assert;
const ChatRoom = require('../lib/chatRoom');

describe('Chat Room', () => {
  const chatRoom = new ChatRoom();
  class DummyClient {
    write(message) {
      this.received = message;
    }
  }

  const client1 = new DummyClient();
  const client2 = new DummyClient();


  it('adds clients', done => {
    assert.deepEqual(chatRoom.clients.length, 0);
    chatRoom.add(client1);
    assert.deepEqual(chatRoom.clients.length, 1);
    assert.deepEqual(chatRoom.clients[0], client1);
    done();
  });

  it('alerts clients of new users', done => {
    chatRoom.add(client2);
    assert.deepEqual(client1.received, `${client2.name} has entered the chatroom \n`);
    done();
  });

  it('sends messages to other clients', done => {
    chatRoom.send(client2, 'testing');
    assert.deepEqual(client1.received, `${client2.name}: testing`);
    assert.deepEqual(client2.received, `${client2.name} has entered the chatroom \n`);
    done();
  });

  it('removes clients', done => {
    assert.deepEqual(chatRoom.clients.length, 2);
    chatRoom.remove(client2);
    assert.deepEqual(chatRoom.clients.length, 1);
    assert.equal(client1.received, `${client2.name} has left the chatroom`);
    done();
  });

});
