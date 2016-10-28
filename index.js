const server = require('./lib/chat-server')
const port = process.env.PORT || 55555;

server.listen(port, err => {
    if (err) console.log('error!', err);
    else console.log('Server listening on port: ', server.address().port);
});