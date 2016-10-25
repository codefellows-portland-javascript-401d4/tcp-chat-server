const ChatRoom = require('../lib/ChatRoom');
const assert = require('chai').assert;

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

describe('server functions', () => {
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