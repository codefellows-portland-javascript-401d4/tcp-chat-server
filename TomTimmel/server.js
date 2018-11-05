const net = require('net');
const chatApp = require('./chat-module');

const chat = new chatApp();

const server = net.createServer(client =>{
    client.setEncoding('utf-8');
    console.log('Client was connected');
    chat.add(client);

    client.on('data', message =>{
        if(message.startsWith('/nick')){
            chat.rename(client, message)
            console.log(client.nick);
        } else {
        chat.send(client, message)
        console.log(message);
        }
    })
    client.on('close', () => {
        chat.remove(client);
        console.log('Client disconnected');
    })
})

const port = 5476;

server.listen(port, error => {
    if(error){
    console.log('You done got an error', error);
    }
});