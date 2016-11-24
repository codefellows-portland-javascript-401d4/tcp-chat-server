const assert = require('chai').assert;
const Chatter = require('../Chatters');
const net = require('net');
const server = require('../lib/echo-server');

describe('Chatters Unit Testing', () => {

  const chatter = new Chatter();

  class Client {
    write(message) {
      this.received = message;
    }
	}

  const client1 = new Client();
  const client2 = new Client();

  it('adds clients', () => {
    assert.equal(chatter.clients.length, 0);
    chatter.add(client1);
    assert.equal(chatter.clients.length, 1);
    assert.equal(chatter.clients[0], client1);
    assert.equal(client1.name, 'client 1');
  });

  it('sends to other client', () => {
    chatter.add(client2);
    chatter.send(client2, 'hello');
    assert.equal(client1.received, client2.nickname + ': hello');
    assert.isNotOk(client2.received);
  });
});

describe('E2E echo server', () => {

  const port = 65000;

  before(done => {
    server.listen(port, done);
  });

    /* combined server and client setup with increased nesting */
    // before(done => {
    //     server.listen(port, () => {
    //         client = net.connect({ port: port });
    //         client.setEncoding = 'utf-8';
    //         done();
    //     })
    // });

  describe('basic client functionality', () => {

    let client = null;
    before(done => {
      client = net.connect({ port: port }, err => {
        if (err) done(err);
        else {
          client.setEncoding('utf-8');
          done();
        }
      });
    });

    it('says hello when client connects', done => {
      client.once('data', data => {
        console.log('first listener received', data.toString());
        assert.equal(data, 'hello');
        done();
      });
    });

    it('client message echoed back', done => {
      const message = 'echo me';

      client.once('data', data => {
        console.log('second listener received', data.toString());
        assert.equal(data, message);
        done();
      });

      client.write(message);
    });

    // after(done => {
    //         // undocumented node feature, client.end takes a callback
    //   client.end(done);
    // });
  });

  describe('some other client functionality', () => {
        // setup client

        // write tests...
  });

  // after(done => {
  //   server.close(done);
  // });
    
});