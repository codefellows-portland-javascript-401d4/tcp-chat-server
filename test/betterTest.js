const net = require('net');
const assert = require('chai').assert;
const chai = require('chai')
const chaiHttp = require('chai-http');
const server = require('../server');

const port = 65000;
var client = null;

describe('chat program', function(done){
    before(done, function(){
        server.listen(port, function(){
            client = net.connect({port : port}), err=>{
                if (err) done (err);
                else
                    client.setEncoding = 'utf-8';
                done();
            };
        });
    });

    it('creates clients', function(done){
        console.log('in first test');
        console.log('client = ', client);
        assert(client != null);
        done();
    });

     it('assigns client names', function(done){
        console.log('in second test');
    //     console.log('client name = ', client);
    //     assert(client != null);
    //     done();
    // });




    after(done => {
        client.once('close', done);
        client.end(done);
    });  

    after(done => {
        server.close(done);
    });

});