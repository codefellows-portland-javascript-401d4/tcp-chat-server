module.exports = class ChatRoom {
    constructor() {
        this.seed = 1;
        this.clients = [];
    }

    add(client) {
        client.name = 'client ' + (this.seed++);
        this.clients.push(client);
        client.greeting = 'Welcome to the chatroom, ' + client.name + '.  If you do not like your username you can change it to a nickname with the following commands: \n "/lady" = change to a female nickname. \n "/gent" = change to a male nickname.  \n "/whocares" = change to any nickname. \n\n';
        client.write(client.greeting);
    }

    send(sender, message) {
        this.clients.forEach(c => {
            if(c === sender) return;
            c.write(`${sender.name}: ${message}`);
        });
    }

    rename(client, newName) {
        const oldName = client.name;
        const index = this.clients.indexOf(client);
        if (index !== -1) this.clients.splice(index, 1);
        client.name = newName;
        this.clients.push(client);
        this.clients.forEach(c => {
            c.write(oldName + ' is now ' + client.name + '. \n');
        });
    }

    remove(client) {
        // remove from array:
        this.clients.forEach(c => {
            c.write(client.name + ' has left the chatroom.\n');
        });
        const index = this.clients.indexOf(client);
        if (index !== -1) this.clients.splice(index, 1);
    }
};

