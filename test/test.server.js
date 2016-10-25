const assert = require('chai').assert;
const net = require('net');
const server = require('../server');
const chatModule = require('../chat-module');

describe('chat-module', () => {

  const port = 65000;

  before(done => {
    server.listen(port, done);
  });

  it('does something when a client connects', done => {
    
    
    
  });
  

});