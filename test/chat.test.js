'use strict';

const assert = require('chai').assert;
const ChatRoom = require('../chat-room');

describe('chat room', () => {

    const chatRoom = new ChatRoom();

    class MockClient {
        write(msg) {
            this.received = msg;
        }
    }

    const client1 = new MockClient();
    const client2 = new MockClient();

    it('adds clients', () => {
        assert.equal(chatRoom.clients.length, 0);
        chatRoom.add(client1);
        assert.equal(chatRoom.clients.length, 1);
        assert.equal(chatRoom.clients[0], client1);
        assert.include(chatRoom.users, client1.name);
    });

    it('broadcasts message to other clients', () => {
        chatRoom.add(client2);
        chatRoom.send(client2, 'hello world');
        assert.isOk(client1.received);
        assert.isNotOk(client2.received);
    });

    it('removes clients', () => {
        chatRoom.remove(client1);
        chatRoom.remove(client2);
        assert.notInclude(chatRoom.currentUsers, client1.name);
        assert.notInclude(chatRoom.currentUsers, client2.name);
    });
});