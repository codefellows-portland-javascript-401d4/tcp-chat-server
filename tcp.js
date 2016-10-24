const net = require('net');
let id = 1;

const server = net.createServer(client => {
    const username = 'client' + (id++);
    console.log('client', username, 'connected');

    client.setEncoding('utf-8');
    
    
    client.on('data', message => {
        // insert stylized package here?

        // significance of '\n'?
        client.write(`hello, ${username}!` + '\n');
    });

    client.on('close', () => {
        console.log(`client ${username} has disconnected`);
    });
});

// where do we get 65000?
const port = 65000;
server.listen(port, err => {
    console.log('server is listening on port', port, err);
});