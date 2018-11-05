// const assert = require('chai').assert;
// const chat = require('../lib/chat');

// describe('Chatroom testing', () => {

//     const newChat = new chat();

//     class MockClient {
//         write(message){
//             this.received = message;
//         };
//     };
//     const client1 = new MockClient();
//     const client2 = new MockClient();

//     it('add or remove a client', () => {
//         assert.equal(newChat.clients.length, 0);
//         newChat.add(client1);
//         assert.equal(newChat.clients.length, 1);
//         assert.equal(newChat.clients[0], client1);
//         newChat.leaveChat(client1);
//         assert.equal(newChat.clients.length, 0);
//     });

//     it('messages are sent', () => {
//         newChat.add(client2);
//         newChat.send(client1, 'hello world');
//         console.log(client2.received)
//         assert.equal(client2.received, 'Guest 1: hello world')
//     });


// });