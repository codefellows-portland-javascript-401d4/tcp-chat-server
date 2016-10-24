const net = require('net');


const port = 65000;
server.listen(port, err => {
    if (err) console.log('ERROR!', err);
    else console.log('server listening on port', port);
})

module.exports = server;