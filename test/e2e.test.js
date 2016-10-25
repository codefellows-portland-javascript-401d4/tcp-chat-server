const net = require('net');
const assert = require('chai').assert;
const server = require('../lib/server');
// const ChatRoom = require('../lib/chatRoom');
// const chatRoom = serverObj.chatRoom;

describe('chat server', () => {
  const port = 8080;
  let client1 = null;
  let client2 = null;
  // const chatRoom = new ChatRoom();

  before(done => {
    server.listen(port, err => {
      if(err) done(err);
      else console.log('server listening on port: ', port);
      done();
    });
  });

  before(done => {
    client1 = net.connect({port: port}, () => {
      client1.setEncoding('utf-8');
      client2 = net.connect({port: port}, () => {
        client2.setEncoding('utf-8');
        done();
      });
    });
  });

  it('alerts clients of new users', done => {
    client2.once('data', data => {
      client2.name = data.match(/(\w+)/g)[0];
      assert.deepEqual(data, `${client2.name} has entered the chatroom \n`);
      done();
    });
  });

  it('sends messages to clients', done => {
    const message = 'test message';
    client2.once('data', data => {
      client1.name = data.match(/(\w+)/g)[0];
      assert.equal(data, `${client1.name}: ${message}`);
      done();
    });
    client1.write(message);
  });

  it('alerts clients when user leaves', done => {
    client2.once('data', data => {
      assert.equal(data, `${client1.name} has left the chatroom`);
      done();
    });
    client1.end();
  });

  after(done => {
    client2.once('close', done);
    client2.end();
  });

  after(done => {
    server.close(() => {
      console.log('server closed on port: ', port);
      done();
    });
  });
});
