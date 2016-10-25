const assert = require('chai').assert;
const ChatRoom = require('../lib/ChatRoom')

describe('Testing chat room', () => {
    const chatRoom = new ChatRoom();

    class MockClient {
        write(message) {
            this.received = message;
        }
    }

    const client1 = new MockClient();
    const client2 = new MockClient();

    it('Adds new clients', () => {
        assert.equal(chatRoom.clients.length, 0);
        chatRoom.add(client1);
        // const client = {};
        assert.equal(chatRoom.clients.length, 1);
        assert.equal(chatRoom.clients[0], client1);
        assert.equal(client1.name, 'Client 1');
    });

    it('Broadcast sends to other client', () => {
        chatRoom.add(client2);
        chatRoom.send(client2, 'hello');
        assert.equal(client1.received, 'Client 2: hello');
        assert.isNotOk(client2.received);
    });
});