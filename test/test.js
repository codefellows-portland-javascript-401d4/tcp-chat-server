const net = require('net');
const nicknames = require('nicknames');
const assert = require('assert');


describe('chat program', function(done){
    it('creates clients', function(done){
    const clients = [];

    const server = net.createServer(client => {
        const name =  nicknames.allRandom();
        client.setEncoding('utf-8');
        clients.push(client);

    const port = 65000;
    server.listen(port, err => {
        if (err) console.log('ERROR!', err);
        else console.log('server listening on port', port);
    });
      

        done();
        console.log('in first test');
        console.log('clients length', clients.length);
        assert(clients.length === 1);
        done();
        });
    });
});