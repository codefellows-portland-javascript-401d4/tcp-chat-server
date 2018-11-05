const assert = require('chai').assert;
const ChatRoom = require('../chatRoom');
const server = require('../tcpChat');
const net = require('net');

describe('E2E test for a tcp chat client', () => {
  const port = 65000;
  let client1 = null;
  let client2 = null;
  let message = 'heyyy guys';

  before(done => {
    server.listen(port, done);
  });

  before(done => {
    client1 = net.connect({port: port}, err => {
      if (err) done(err);
      else {
        client1.setEncoding('utf8');
        done();
      }
    });
  });

  it('Should display instruction to new client', done => {
    client1.once('data', data => {
      assert.equal(data.split('name\n')[0] + 'name\n', 'Use these commands:\n/newName <name> will change name to one of your choosing \n/newRandom will generate a random name\n');
      done();
    });
  });

  it('Should display <client> has connected to all clients', done => {
    client1.once('data', data => {
      assert.equal(data.substring(data.indexOf(' ') + 1), 'has connected\n');
      done();
    });
    client2 = net.connect({port: port}, err => {
      if (err) done(err);
      else {
        client2.setEncoding('utf8');
      }
    });
  });

  it('Should display messages from one client to the others', done => {
    client1.on('data', data => {
      if (data.substring(data.length - 10) === message) {
        assert.isNotOk(data);
        done();
      }
    });
    client2.on('data', data => {
      if (data.substring(data.length - 10) === message) {
        assert.equal(data.substring(data.length - 10), message);
        console.log('client2 gets', data.substring(data.length - 10));
        done();
      }
    });
    client1.write(message);
  });

  after(done => {
    client1.end();
    client2.end();
    server.close(done);
  });

});


// describe('Unit testing for a tcp chat client that tracks new connections, broadcasts messages, and allows name changes', () => {

//   const chatRoom = new ChatRoom();

//   class MockClient {
//     write(message) {
//       this.received = message;
//     }
//   }
//   const client1 = new MockClient();
//   const client2 = new MockClient();

//   it('should add clients', () => {
//     assert.equal(chatRoom.clients.length, 0);
//     chatRoom.add(client1);
//     assert.equal(chatRoom.clients.length, 1);
//     assert.equal(chatRoom.clients[0], client1);
//   });

//   it('should broadcast messages to other clients', () => {
//     chatRoom.add(client2);
//     chatRoom.send(client2, 'hello people');
//     assert.equal(client1.received.substring(client1.received.indexOf(': ') + 2), 'hello people');
//   });

//   it('should accept a new name from input', () => {
//     chatRoom.changeNick(client1, '/newName Roger the clown');
//     assert.equal(client1.nick, 'Roger the clown');
//   });



// });