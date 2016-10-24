const assert = require('chai').assert;
const ChatRoom = require('../ChatRoom');

describe('ChatRoom', () => {

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

});