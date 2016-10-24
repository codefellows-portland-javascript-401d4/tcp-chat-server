const net = require('net');

const clients = [];

const server = net.createServer(client => {
    const name =  nicknames.allRandom();
    client.setEncoding('utf-8');

    clients.push(client);

    client.on('data', message => {
        //send this to all the other clients
        clients.forEach(c => {
            // if same as sender, return (exit this particular forEach invocation)
            if(c === client) return;
            // otherwise send the message
            c.write(`${name}: ${message}`);
        });
    });

    client.on('close', () => {
        // remove from array:
        const index = clients.indexOf(client);
        if (index !== -1) clients.splice(index, 1);
        console.log(`client ${name} has disconnected`);
    });
});

const port = 65000;
server.listen(port, err => {
    if (err) console.log('ERROR!', err);
    else console.log('server listening on port', port);
})