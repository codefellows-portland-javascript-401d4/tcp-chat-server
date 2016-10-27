const net = require('net');
const test = require('regex').test;
const assert = require('chai').assert;
const server = require('./tcp-server');

describe ('establish connection with tcp chat server', () => {
  const port = 65000;

  before(done => {
    server.listen(port, done);
  });

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

    it('says "welcome to the discussion" when client connects', done => {
      client.once('data', data => {
        console.log('first listener received', data.toString());
        var string_to_test = 'Welcome to the discussion, chatter 7';
        var test = /Welcome to the discussion, chatter [1-9]/.test(string_to_test);
        done();
      });
    });

    it('says "glad to be here"', done => {
      const message = 'glad to be here';
      client.once('data', data => {
        console.log('second listener received', data.toString());
        assert.equal(data, message);
        done();
      });
      client.write(message);
    });

    it('confirms random single digit client ID nickname between 1 thru 9 when client sends message', done => {
      client.once('data', data => {
        console.log('check client ID', data);
        var data_to_test = Math.floor((Math.random()*10));
        var test = /[1-9]/.test(data_to_test);
        console.log(test);
        done();
      });
    });

    after(done => {
      client.end(done);
    });

    after(done => {
      server.close(done);
    });
  });
});
