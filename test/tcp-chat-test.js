const chai = require('chai');
const assert = chai.assert;
const TCPChatRoom = require('../tcpChatRoom');

describe('tcp Chat Room', () => {

  const tcpChatRoom = new TCPChatRoom();

  class testGuest {
    write(message) {
      this.received = message;
    }
  }

  const guest1 = new testGuest();
  const guest2 = new testGuest();

  it('adds chat room guest', () => {
    assert.equal(tcpChatRoom.guests.length, 0);
    tcpChatRoom.add(guest1);
    assert.equal(tcpChatRoom.guests.length, 1);
    assert.equal(tcpChatRoom.guests[0], guest1);
    assert.equal(guest1.name, 'guest 1');
  });

  it('broadcasts to other chat room guests', () => {
    var randomID = Math.floor(Math.random()*10);
    tcpChatRoom.add(guest2);
    tcpChatRoom.send(guest2, 'guest ' + randomID + ': greetings');
    assert.include(guest1.received, 'guest ' + randomID + ': greetings');
    assert.isNotOk(guest2.received);
  });

  it('removes chat room guest', () => {
    tcpChatRoom.remove(guest2);
    assert.notInclude('tcpChatRoom', 'guest 2', 'guest2 has been deleted from tcpChatRoom');

  });

});
