'use strict';

const net = require('net');
const fs = require('fs');
const assert = require('chai').assert;
const server = require('../lib/tcp');


describe ('does server route messages correctly', function() {

  const port = 65000;
  var client;
  var client2;

  before(done => {
    server.listen(port, done);
  });


  before (done => {
    client = net.connect({port: port}, error => {
      if (error) done(error);
      else {
        client.setEncoding('utf-8');
        client2 = net.connect({port: port}, error => {
          if (error) done(error);
          else {
            client2.setEncoding('utf-8');
            client2.once('data', function() {});
            done();
          }
        });
      }
    });
  });

  it('says hello when client connects', function(done) {
    client.once('data', data => {
      console.log('first listener received', data.toString());
      assert.equal(data, 'hello');
      done();
    });
  });

  it('says the user has left the chat', function(done) {
    client.end();
    client2.once('data', message => {
      console.log('close message', message);
      assert.equal(message, 'User 1: This user has left the chat.');
      done();
    });
  });

  after(done => {
    server.close(done());
  });
});