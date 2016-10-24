const net = require('net');
const server = require('../lib/server');
const assert = require('chai').assert;

const port = 65000;

describe('server', () => {
  it('check if server started', (done) => {
    server.runTelnetServer();
    done();
  });
});
