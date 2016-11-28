// const net = require('net');
// const assert = require('chai').assert;
// const server = require('../http-server.js');

// const port = 65000;

// describe('server is testing', () => {
//     before(done => {
//         server.listen(port, done);
//     });
// });

// describe('base functionality', () => {
//     let client = null;
//     before(done => {
//         client = net.connect({ port: port}, err => {
//             if (err) done (err);
//             else {
//                 client.setEncoding('utf-8');
//                 done();
//             }
//         });
//     });

//     it('server welcomes client when they connect', done => {
//         client.once('data', data => {
//             console.log('server message to client:', data.toString());
//             assert.equal(data, 'welcome new client\n');
//             done();
//         });
//     });

//     it('client message is echoed back', done => {
//         const echoMessage = 'echo me';

//         client.once('data', data => {
//             console.log('second listener received', data.toString());
//             assert.equal(data, echoMessage);
//             done();
//         });
//         client.write(echoMessage);
//     })

//     after(done => {
//         client.end(done);
//     });
// });