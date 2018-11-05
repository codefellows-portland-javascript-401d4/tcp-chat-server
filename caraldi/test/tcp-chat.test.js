'use strict';

const assert = require('chai').assert;
const DogChat = require('../lib/DogChat');

describe('chat room', () => {
    const dogChat = new DogChat();

    class MockClient {
        write(message) {
            this.received = message;
        }
    }

    const dogClient1 = new MockClient();
    const dogClient2 = new MockClient();

    it('adds clients and by name and face', () => {
        assert.equal(dogChat.dogClients.length, 0);
        dogChat.add(dogClient1);
        assert.equal(dogChat.dogClients.length, 1);
        assert.equal(dogChat.dogClients[0], dogClient1);
        assert.include(dogChat.dogClients, dogClient1);
    });

    it('broadcasts sent messages to other client', () => {
        dogChat.add(dogClient2);
        dogChat.send(dogClient2, 'ruff');
        assert.isOk(dogClient1.received);
        assert.isNotOk(dogClient2.received);
    });
});