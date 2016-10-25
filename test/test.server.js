const assert = require('chai').assert;
const net = require('net');
const server = require('../server').server;
const chat = require('../server').chat;

/* TO USE THIS TEST, UNCOMMENT SERVER LINE 10 */

  describe('chat-module', () => {

  const port = 65000;
  let client = null;

  before(done => {
    server.listen(port, () => {
      client1 = net.connect({port: port});
      client1.setEncoding = 'utf-8';
      client2 = net.connect({port: port});
      client2.setEncoding = 'utf-8';
      done();
    });
  });


  it('says Hello when a client connects', done => {
    client1.once('data', data => {
      assert.equal(data, 'Hello');
    });
    client2.once('data', data => {
      assert.equal(data, 'Hello');
      done();
    });
  });

  it('adds a user to the users array', done => {
    assert.equal(chat.clients.length, 2);
    done();
  });

  after(done => {
    client1.end();
    client2.end(done);
  });

  after(done => {
    server.close(done);
  })
});

describe('chat-module broadcasting', () => {

  const port = 65000;
  let client1, client2 = null;
  const message = 'Unicorns are rad animals';

  before(done => {
    server.listen(port, () => {
      client1 = net.connect({port: port});
      client1.setEncoding = 'utf-8';
      client2 = net.connect({port: port});
      client2.setEncoding = 'utf-8';
      done();
    });
  });

  it('broadcasts messages to other users and not myself', done => {
    client1.write(message);

    client2.on('data', data => {
      if (data == 'Hello') {
        return;
      }
      assert.include(data.toString(), message);
      done();
    });
  });

  after(done => {
    client1.end();
    client2.end();
    server.close();
    done();
  });
});