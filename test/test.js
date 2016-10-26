const net = require('net');
const assert = require('chai').assert;
const server = require('../lib/chat-server');
const ChatRoom = require('../lib/ChatRoom');

describe('Chat Room Handlers', () => {
  
  //create a new chatroom
  const mockChatRoom = new ChatRoom();
  
  //constructor for making fake clients for testing
  class MockClient {
    write(message) {
      this.received = message;
    }
  }
  
  //create mock visitor
  const mockClient1 = new MockClient();
  
  //create a second mock visitor
  const mockClient2 = new MockClient();

  it('adds new clients to array', () => {
    //check to make sure it starts out empty
    assert.equal(mockChatRoom.clients.length, 0);
    //add first client
    mockChatRoom.add(mockClient1);
    //check that a client has been added to the array
    assert.equal(mockChatRoom.clients.length, 1);
    //check that the array contains our first client
    assert.equal(mockChatRoom.clients[0], mockClient1);
    //check that the name of the client matches
    assert.equal(mockClient1.name, 'visitor 1');
  });

  it('sends messages to other visitors', () => {
    //add second client to array
    mockChatRoom.add(mockClient2);
    //send hardcoded message
    mockChatRoom.send(mockClient2, 'hello');
    //check that client1 received the message
    assert.equal(mockClient1.received, 'visitor 2: hello');
    //check that sender did not recieve the message
    assert.isNotOk(mockClient2.received);
  });
});


