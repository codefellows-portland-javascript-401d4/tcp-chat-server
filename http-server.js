const server = require('./lib/chat-modulized');
const port = 65000;

server.listen(port, err => {
    if (err) console.log('ERROR!', err);
        console.log('server listening on port', port);
});