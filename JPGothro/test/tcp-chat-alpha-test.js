
const assert = require('chai').assert;
const ChatRoom = require('../lib/ChatRoom');

describe('Initial Chat room testing', () => {
    const chatRoom1 = new ChatRoom();
    const chatRoom2 = new ChatRoom();

    class MockClass {
        write(message) {
            this.heard = message;
        };
    };

    const client01 = new MockClass();
    const client02 = new MockClass();
    const client03 = new MockClass();

    it('adding a client', () => {
        assert.equal(chatRoom1.clients.length, 0);
        chatRoom1.add(client01);
        assert.equal(chatRoom1.clients.length, 1);
        assert.equal(chatRoom1.clients[0], client01);
        assert.equal(client01.name, 'guest-1');
    });

    it('removing a client', () => {
        assert.equal(chatRoom1.clients.length, 1);
        chatRoom1.remove(client01);
        assert.equal(chatRoom1.clients.length, 0);
    });

    it('broadcast to existing clients, when new client enters', () => {
        chatRoom2.add(client01);
        chatRoom2.add(client02);
        assert.equal(client01.heard, 'guest-2 has joined the Chat Room.\n');
        assert.equal(client02.heard, undefined);
        chatRoom2.add(client03);
        assert.equal(client01.heard, 'guest-3 has joined the Chat Room.\n');
        assert.equal(client02.heard, 'guest-3 has joined the Chat Room.\n');
        assert.equal(client03.heard, undefined);
    });

    it('broadcast client message to other clients, but not sending client', () => {
        chatRoom2.send(client02, 'hey room!');
        assert.equal(client01.heard, 'guest-2: hey room!');
        assert.equal(client03.heard, 'guest-2: hey room!');
        assert.equal(client02.heard, 'guest-3 has joined the Chat Room.\n');
    });

    it('broadcast client name change to other clients, but not client making change', () => {
        chatRoom2.send(client01, '/nick MyName');
        assert.equal(client01.nickName, 'MyName');
        assert.equal(client02.heard, 'guest-1 shall henceforth be known as MyName\n');
    });

});
