const server = require('./lib/tcpServer');

const port = 65000;
server.listen(port, err => {
    if (err) console.log('Error! ', err);
    else console.log('Listening to port ', port);
});