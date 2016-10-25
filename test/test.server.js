const assert = require('chai').assert;
const net = require('net');
const server = require('../server').server;
const chat = require('../server').chat;

describe('chat-module', () => {

  const port = 65000;
  let client = null;

  before(done => {
    server.listen(port, () => {
      client = net.connect({port: port});
      client.setEncoding = 'utf-8';
      client2 = net.connect({port: port});
      client2.setEncoding = 'utf-8';
      done();
    });
  });

  it('says Hello when a client connects', done => {
    client.once('data', data => {
      assert.equal(data, 'Hello');
      done();
    });
  });

  it('adds a user to the users array', done => {
    assert.equal(chat.clients.length, 2);
    done();
  });

});