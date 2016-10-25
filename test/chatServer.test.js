const assert = require('chai').assert;
const ChatRoom = require('./chatRoom.js');

describe('chat room', () => {

  const chatRoom = new ChatRoom();

  class DummyClient {
    write(message){
      this.received = message;
    }
  }

  const dummyClient1 = new DummyClient();
  const dummyClient2 = new DummyClient();

  it('clients can join room', () => {
    assert.equal(chatRoom.clients.length, 0);
    chatRoom.add(dummyClient1);
    assert.equal(chatRoom.clients.length, 1);
    assert.equal(chatRoom.clients[0], dummyClient1);
    assert.equal(dummyClient1.name, 'guest 1');
  });

  it('broadcasts messages to all clients in room', () => {
    chatRoom.add(dummyClient2);
    chatRoom.chat(dummyClient2, 'hi');
    assert.equal(dummyClient1.received, 'guest 2: hi');
    //assert.Ok passes when the value inside is truthy
    //assert.isNotOk passes when the value inside is falsey;
    assert.notEqual(dummyClient2.received, 'guest 2: hi');
  });
});
