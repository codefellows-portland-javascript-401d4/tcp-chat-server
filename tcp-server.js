const server = require('./lib/tcp-chat-server');
const port = process.env.PORT || 59109;

server.listen(port, err => {
    if (err) console.log('ERROR!', err);
    else console.log('server listening on port:', port);
});
