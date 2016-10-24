const assert = require('chai').assert;
const ChatRoom = require('../ChatRoom');

describe('Chat Room', () => {
  
  //create a new chatroom
  const chatRoom = new ChatRoom();
  
  //constructor for making fake clients for testing
  class MockClient {
    write(message) {
      this.received = message;
    }
  }
  
  //create mock visitor
  const client1 = new MockClient();
  
  //create a second mock visitor
  const client2 = new MockClient();

  it('adds new clients to array', () => {
    //check to make sure it starts out empty
    assert.equal(chatRoom.clients.length, 0);
    //add first client
    chatRoom.add(client1);
    //check that a client has been added to the array
    assert.equal(chatRoom.clients.length, 1);
    //check that the array contains our first client
    assert.equal(chatRoom.clients[0], client1);
    //check that the name of the client matches
    assert.equal(client1.name, 'visitor 1');
  });

  it('sends messages to other visitors', () => {
    //add second client to array
    chatRoom.add(client2);
    //send hardcoded message
    chatRoom.send(client2, 'hello');
    //check that client1 received the message
    assert.equal(client1.received, 'visitor 2: hello');
    //check that sender did not recieve the message
    assert.isNotOk(client2.received);
  });
});
