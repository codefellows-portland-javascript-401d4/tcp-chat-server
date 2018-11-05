module.exports = class Chatroom {
    constructor() {
        this.seed = 1;
        this.clients = [];
    }
    add(client) {
        client.name = 'client ' + (this.seed++);
        this.clients.push(client);
    }
    send(sender, message) {
        this.clients.forEach(c => {
            if(c === sender) return;
            c.write(`${sender.name}: ${message}`);
        });
    }
    disconnectMessage(client) {
        this.clients.forEach(c => {
            if (c === client) return;
            c.write(`${client.name} has disconnected`);
        });
    }
    remove(client) {
        const index = this.clients.indexOf(client);
        if (index !== -1) this.clients.splice(index, 1);
    }
    whoshere() {
        this.clients.forEach(c => {
            c.write(`${c.name}` + '\n');
        });
    }
    changeName(client, newName) {
        var oldName = client.name;
        client.name = newName;
        this.clients.forEach(c => {
            c.write(`${oldName} changed name to ${client.name}\n`);
        });
    }
};