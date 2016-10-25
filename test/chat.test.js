'use strict';

var assert = require('chai').assert;
var ChatRoom = require('../chat-room');

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

    it('says hello with name when client connects', done => {
        
    });
});