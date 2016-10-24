const assert = require('chai').assert;
const ChatRoom = require('../chatRoom');

describe('A tcp chat client that tracks new connections, broadcasts messages, and allows name changes', () => {

  const chatRoom = new ChatRoom();

  class MockClient {
    write(message) {
      this.received = message;
    }
  }
  const client1 = new MockClient();
  const client2 = new MockClient();

  it('should add clients', () => {
    assert.equal(chatRoom.clients.length, 0);
    chatRoom.add(client1);
    assert.equal(chatRoom.clients.length, 1);
    assert.equal(chatRoom.clients[0], client1);
  });

  it('should broadcast messages to other clients', () => {
    chatRoom.add(client2);
    chatRoom.send(client2, 'hello people');
    assert.equal(client1.received.substring(client1.received.indexOf(': ') + 2), 'hello people');
  });

  it('should accept a new name from input', () => {
    chatRoom.changeNick(client1, '/newName Roger the clown');
    assert.equal(client1.nick, 'Roger the clown');
  });



});