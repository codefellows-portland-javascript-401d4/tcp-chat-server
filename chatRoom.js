var nicknames = require('nicknames');

module.exports = class ChatRoom {
    constructor() {
        this.clients = []
    }

    add(client) {
        client.nick = nicknames.allRandom();
        while (this.clients.indexOf(client.nick)!==-1){
           client.nick = nicknames.allRandom();
        }
        this.clients.push(client);
    }

    send(sender, message) {
        //send this to all the other clients
        this.clients.forEach(c => {
            // if same as sender, return (exit this particular forEach invocation)
            if(c === sender) return;
            // send the message
            c.write(`${sender.nick}: ${message}`);
        });
    }

    remove(client) {
        // remove from array:
        const index = this.clients.indexOf(client);
        if (index !== -1) this.clients.splice(index, 1);
    }

module.exports = ChatRoom;
