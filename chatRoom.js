var nicknames = require('nicknames');

module.exports = class ChatRoom {
    constructor() {
        this.seed = 1;
        this.clients = [];
    }

    add(client) {
        client.name = 'client ' + (this.seed++);
        this.clients.push(client);
        client.write('Welcome to the chatroom, ' + client.name + '.  If you do not like your username you can change it to a nickname with the following commands: \n "/lady" = change to a female nickname. \n "/gent" = change to a male nickname.  \n "/whocares" = change to any nickname. \n');
    }

    send(sender, message) {
        //send this to all the other clients
        this.clients.forEach(c => {
            // if same as sender, return (exit this particular forEach invocation)
            if(c === sender) return;
            // send the message
            c.write(`${sender.name}: ${message}`);
        });
    }

    rename(client) {
        console.log(this.clients);
        const oldName = client.name;
        const index = this.clients.indexOf(client);
        if (index !== -1) this.clients.splice(index, 1);
        //TODO still working on this part
        client.name = 'steve';
        this.clients.push(client);
        this.clients.forEach(c => {
            c.write(oldName + ' is now ' + client.name + '.');
        });
        console.log(this.clients);
    }

    remove(client) {
        // remove from array:
        const index = this.clients.indexOf(client);
        if (index !== -1) this.clients.splice(index, 1);
    }
};


// module.exports = class ChatRoom {
    // constructor() {
    //     this.clients = []
    // }

    // add(client) {
    //     var nick = nicknames.allRandom();
    //     while (this.clients.indexOf(nick)!==-1){
    //        nick = nicknames.allRandom();
    //     }
    //     this.clients.push(client);
    // }

    // send(sender, message) {
    //     //send this to all the other clients
    //     this.clients.forEach(c => {
    //         // if same as sender, return (exit this particular forEach invocation)
    //         if(c === sender) return;
    //         // send the message
    //         c.write(`${sender.nick}: ${message}`);
    //     });
    // }

    // remove(client) {
    //     // remove from array:
    //     const index = this.clients.indexOf(client);
    //     if (index !== -1) this.clients.splice(index, 1);
    // }