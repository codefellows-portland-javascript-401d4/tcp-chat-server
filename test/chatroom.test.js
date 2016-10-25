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
})