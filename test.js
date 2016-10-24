const chatModule = require('./chat-module');
const assert = require('chai').assert;

describe('chat-module', () => {

    const chat = new chatModule();

    class MockClient {
        write(message) {
            this.received = message;
        }
    }

    var client1 = new MockClient();
    var client2 = new MockClient();

    it('should add a new member', () => {
        assert.equal(chat.clients.length, 0, 'is not an empty array');
        chat.add(client1);

        assert.equal(chat.clients.length, 1, 'did not add a member');

        assert.equal(chat.clients[0], client1, 'client1 was not added');

        assert.equal(client1.nick, 'client 1', 'client name did not match');
    });

    it('should change a nickname', () => {
        chat.add(client2);
        assert.equal(client2.nick, 'client 2', 'name is not client 2');
        chat.rename(client2, 'radclient');

        assert.equal(chat.clients[1].nick, 'radclient', 'client 2 was not renamed to rad client');
    });

    it('broadcasts to other clients', () => {
        chat.send(client1, 'unicorns are rad');

        assert.include(chat.clients[1].received, 'client 1: unicorns are rad', 'client 1 does not know that unicorns are rad');
        assert.isNotOk(chat.clients[0].received, 'client 1 sees its own message');
    })
});