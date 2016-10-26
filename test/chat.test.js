const chai = require('chai');
const assert = chai.assert;
const net = require('net');
const server = require('../index')

describe('chat server', () => {

  const port = 65000;  

  before(done => {
    server.listen(port, done);
  });

  describe('test client functionality', () => {

    let client = null;

    before(done => {
      client = net.connect({port: port}, err => {
        if (err) done(err);
        else {
          client.setEncoding('utf-8');
          done();
          }
      });
    });

    let client1 = null;
    
    before (done => {
      client1 = net.connect({port: port}, err => {
        if (err) done(err);
        else {
          client1.setEncoding('utf-8');
          done();
          }
      });
    });

      it('greets new client', done => {
        client.once('data', data => {
          console.log('first chatter received', data.toString());
          assert.equal(data, 'Velcome to ze chat!\n');
          done();
        });
      });

      it('client message echoed back', done => {

        const message = 'hi there';

        client.once('data', data => {
          let stringData = data.toString();
          console.log('second chatter received', stringData);
          let trimmedName = stringData.split('_'); 
          let digit = trimmedName[1].split(' ');
          let uniqueName = trimmedName[0] + '_' + digit[0] + ' ';
          assert.equal(data, uniqueName + message);
          done();
        });

        client1.write(message);
      });

      after(done => {
        client.end(done);
      });
  });
});