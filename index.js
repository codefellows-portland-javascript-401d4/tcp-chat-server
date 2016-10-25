const net = require('net');
// const nicknames = require('nicknames');
const ChatRoom = require('./ChatRoom');

const chatRoom = new ChatRoom();

const server = net.createServer(client => {
    client.setEncoding('utf-8');

    chatRoom.add(client);

    client.on('data', message => {
        var ladypatt = /^\/lady/g;
        var gentpatt = /^\/gent/g;
        var patt = /^\/whocares/g;
        if (ladypatt.test(message)){
            chatRoom.rename(client);
        }
        else if (gentpatt.test(message)){
            chatRoom.rename(client);
        }
        else if (patt.test(message)){
            chatRoom.rename(client);
        }
        else{
            chatRoom.send(client, message);
        }
    });

    client.on('close', () => {
        chatRoom.remove(client);
    });
});

const port = 65000;
server.listen(port, err => {
    if (err) console.log('ERROR!', err);
    else console.log('server listening on port', port);
})


// const port = 65000;
// var client = null;

// server.listen(port, function(){
//     client = net.connect({port : port}), err=>{
//         if (err) console.log(err);
//         else
//             client.setEncoding = 'utf-8';
//     };
// });



// const clients = [];

// const server = net.createServer(client => {
//     const name =  nicknames.allRandom();
//     client.setEncoding('utf-8');

//     clients.push(client);

//     client.on('data', message => {
//         //send this to all the other clients
//         clients.forEach(c => {
//             // if same as sender, return (exit this particular forEach invocation)
//             if(c === client) return;
//             // otherwise send the message
//             c.write(`${name}: ${message}`);
//         });
//     });

//     client.on('close', () => {
//         // remove from array:
//         const index = clients.indexOf(client);
//         if (index !== -1) clients.splice(index, 1);
//         console.log(`client ${name} has disconnected`);
//     });
// });

// const port = 65000;
// server.listen(port, err => {
//     if (err) console.log('ERROR!', err);
//     else console.log('server listening on port', port);
// });

