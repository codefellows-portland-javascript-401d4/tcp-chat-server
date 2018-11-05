const net = require('net');
const assert = require('chai').assert;
const server = require('../index');
const port = 3000;


describe('server', () => {

    before(done => {
        server.listen(port, done);
    });
});

describe('base functionality', () => {
    let client = null;

    before(done => {
        client = net.connect({ port: port}, err => {
            if (err) done (err);
            else {
                client.setEncoding('utf-8');
                done();
            }
        });
    });

    it('Server welcomes client when they connect', done => {
        client.once('data', data => {
            console.log('server message to client:', data.toString());
            assert.equal(data, 'welcome new client\n');
            done();
        });
    });

    after(done => {
        client.end(done);
    });

});
