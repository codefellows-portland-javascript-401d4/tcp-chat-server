const chai = require('chai');
const assert = chai.assert;
const Chat = require('../chat');

describe('Chat room', () => {

  const chatRoom = new Chat();

  class testClient {
    write(message) {
      this.received = message;
    }
  }

  const chatter1 = new testClient();
  const chatter2 = new testClient();
  const chatter3 = new testClient();

  it('adds clients', () => {
    assert.equal(chatRoom.clients.length, 0);
    chatRoom.add(chatter1);
    assert.equal(chatRoom.clients.length, 1);
    assert.equal(chatRoom.clients[0], chatter1);
  });

  it('assigns a unique random number for each client nickname', () => {
    chatRoom.add(chatter2);
    assert.equal(chatter2.name, 'chatterbox_' + chatRoom.seed);
    console.log('The unique name of chatter2 is', chatter2.name);
    chatRoom.add(chatter3);
    assert.equal(chatter3.name, 'chatterbox_' + chatRoom.seed);
    console.log('The unique name of chatter3 is', chatter3.name);
  });

  it('sends messages to other clients', () => {
    chatRoom.send(chatter2, 'wull hullo thurr');
    assert.equal(chatter1.received, chatter2.name + ': wull hullo thurr');
    assert.isNotOk(chatter2.received);
  });

});
