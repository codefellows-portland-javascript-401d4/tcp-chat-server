const server = require('./server');

const port = process.env.TCPPORT || 65000;

server.listen(port, err => {
    console.log('TCP chat UP on port: ',port, err);
});