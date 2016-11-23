const assert = require('chai').assert;
const Chatter = require('../Chatters');

describe('Chatters', () => {

  const chatter = new Chatter();

  class Client {
    write(message) {
      this.received = message;
    }
	}

  const client1 = new Client();
  const client2 = new Client();

  it('adds clients', () => {
    assert.equal(chatter.clients.length, 0);
    chatter.add(client1);
    assert.equal(chatter.clients.length, 1);
    assert.equal(chatter.clients[0], client1);
    assert.equal(client1.name, 'client 1');
  });

  it('sends to other client', () => {
    chatter.add(client2);
    chatter.send(client2, 'hello');
    assert.equal(client1.received, client2.nickname + ': hello');
    assert.isNotOk(client2.received);
  });
});