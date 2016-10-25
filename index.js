const server = require('./lib/tcp_server');

const port = 3000;

server.listen(port, err => {
    if (err) console.log('ERROR!', err);
    console.log('server listening on port', port, err);
});
