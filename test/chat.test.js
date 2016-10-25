const assert = require('chai').assert;
const chat = require('./chat-space');

describe('Chat room', () => {
    const chatSpace = new ChatSpace();

    class MockClient {
        write(message) {
            this.received = message;
        }
    }

    const client1 = new MockClient();
    const client2 = new MockClient();

    it('adds clients', () => {
        assert.equal(chatRoom.clients.length, 0);
        chatSpace.add(client1);
        assert.equal(chatRoom.clients.length, 1);
        assert.equal(chatRoom.clients[0], client1);
        assert.equal(client1.name, 'client 1');
    });

    it('broadcasts messages sent to other clients', () => {
        chatSpace.add(client2);
        chatRoom.send(client2, 'hello');
        assert.equal(client1.received, 'client 2: hello');
        assert.isNotOk(client2.received);
    });
});
    