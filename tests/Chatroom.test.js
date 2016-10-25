const chai = require('chai');
const assert = chai.assert;
const fs = require('fs');
const ChatRoom = require('../lib/Chatroom'); 
const server = require('../server');

class mockUser {
    write(text) {
        this.received = text;
    }
};

const userOne = new mockUser;
const userTwo = new mockUser;
const chatRoom = new ChatRoom;

describe('Unit tests Chat Room module', () => {
    it('checks to see if we can add new users', () => {
        chatRoom.add(userOne);
        assert.equal('client 1', chatRoom.clients[0].name, 'same first user in client');
        chatRoom.add(userTwo);
        var clientNames = chatRoom.clients.map(function(user) {
            return user.name;
        });
        assert.sameMembers(['client 1', 'client 2'], clientNames, 'same members in both arrays');
    });

    it('checks to see that clients will receive message', () => {
        chatRoom.send(userTwo, 'hello');
        assert.equal(userOne.received, 'client 2: hello');
        assert.isNotOk(userTwo.received);
    });

    it('checks that you calling that a client may change name', () => {
        chatRoom.changeName(userOne, 'Doko');
        assert.equal(userOne.name, 'Doko');
        assert.equal(userOne.received, 'client 1 changed name to Doko\n');
    });

    it('checks to make sure we can remove a user when supplying a name', () => {
        chatRoom.remove(userOne);
        assert.equal(chatRoom.clients[0].name, 'client 2');
    });
});