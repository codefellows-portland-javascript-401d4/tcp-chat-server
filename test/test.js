const assert = require('chai').assert;

const ChatGroup = require('../chatGroup');

describe('chat', () => {

    const chatGroup = new ChatGroup();

    class testClient {
        write(received) {
            this.received = received;
        }
    }

    const clientA = new testClient();
    const clientB = new testClient();

    it('creates a new client', () => {
        assert.equal(chatGroup.clients.length, 0);
        chatGroup.create(clientA);
        assert.equal(chatGroup.clients.length, 1);
        assert.equal(chatGroup.clients[0], clientA);
    });

    it('sends message to all clients', () => {
        chatGroup.create(clientB);
        chatGroup.send(clientB, 'hello');
        assert.isNotOk(clientB.received);
        assert.isOk(clientA.received);
        assert.equal(clientA.received, `${clientB.name}: hello`);
    });




});
