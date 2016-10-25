const assert = require('chai').assert;
const chatRoom = require('../DogChat');

describe('chat room', () => {
    const dogChat = new DogChat();

    class MockClient {
        write(message) {
            this.received = message;
        }
    }

    const dogClient1 = new MockClient();
    const dogClient2 = new MockClient();

    it('adds clients', () => {
        assert.equal(dogChat.dogClients.length, 0);
        dogChat.add(dogClient1);
        assert.equal(dogChat.dogClients.length, 1);
        assert.equal(dogChat.dogClients[0], dogClient1);
        assert.equal(dogClient1.username, 'dog 1');
    });

    it('broadcasts sent messages to other client', () => {
        dogChat.add(dogClient2);
        dogChat.send(dogClient2, 'ruff');
        assert.equal(dogClient1.received, 'dog 2: ruff');
        assert.isNotOk(dogClient2.received);
    });
});