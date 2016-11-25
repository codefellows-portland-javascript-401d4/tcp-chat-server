const chai = require('chai');
const assert = chai.assert;
const TCPChatRoom = require('../tcpChatRoom');

describe('tcp Chat Room', () => {

  const tcpChatRoom = new TCPChatRoom();

  class testClient {
    write(message) {
      this.received = message;
    }
  }

  const client1 = new testClient();
  const client2 = new testClient();

  it('adds client', () => {
    assert.equal(tcpChatRoom.clients.length, 0);
    tcpChatRoom.add(client1);
    assert.equal(tcpChatRoom.clients.length, 1);
    assert.equal(tcpChatRoom.clients[0], client1);
    assert.equal(client1.name, 'client 1');
  });

  it('broadcasts to other client', () => {
    var randomID = Math.floor(Math.random()*10);  
    tcpChatRoom.add(client2);
    tcpChatRoom.send(client2, 'client ' + randomID + ': greetings');
    assert.include(client1.received, 'client ' + randomID + ': greetings');
    assert.isNotOk(client2.received);
  });

  it('removes client', () => {
    tcpChatRoom.del(client2);
    assert.notInclude('tcpChatRoom', 'client 2', 'client2 has been deleted from tcpChatRoom');

  });

});
