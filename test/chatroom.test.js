const assert = require('chai').assert;
const ChatRoom = require('../lib/ChatRoom')

describe('Testing chat room', () => {
    const chatRoom = new ChatRoom();

    class MockClient {
        write(message) {
            this.received = message;
        }
    }

    const testClient1 = new MockClient();
    const testClient2 = new MockClient();

    it('Adds new clients', () => {
        assert.equal(chatRoom.clients.length, 0);
        chatRoom.create(testClient1);
        // const client = {};
        assert.equal(chatRoom.clients.length, 1);
        assert.equal(chatRoom.clients[0], testClient1);
        assert.equal(testClient1.name, 'Client 1');
    });

    it('Broadcast sends to other client', () => {
        chatRoom.create(testClient2);
        chatRoom.send(testClient2, 'howdy');
        assert.equal(testClient1.received, 'Client 2: howdy');
        assert.isNotOk(testClient2.received);
    });
});