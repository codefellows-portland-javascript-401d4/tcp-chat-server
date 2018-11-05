const net = require('net');
const assert = require('chai').assert;
const server = require('../tcpServer'); // eslint-disable-line

describe ('establish connection with tcp chat server', () => {
  const port = 65000;

  describe ('test basic client server functionality', () => {
    let client = null;
    before(done => {
      client = net.connect({port: port}, err => {
        if (err) done(err);
        else {
          client.setEncoding = 'utf-8';
          done();
        }
      });
    });

    it('acknowledges receipt of data from client', done => {
      client.once('data', data => {
        console.log('first listener received', data.toString());
        assert.include(data, 'greetings');
      });
      done();
    });

    it('confirms client disconnected from server', done => {
      client.once('data', data => {
        const message = 'goodbye';
        assert.equal(data, message);
      });
      done();
    });

    after(done => {
      client.end(done);
    });
  });
});
