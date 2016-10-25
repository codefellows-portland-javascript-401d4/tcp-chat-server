module.exports = class ChatSpace {
    constructor() {
        this.count = 1;
        this.clients = [];
    }

    add(client) {
        const username = 'client' + (this.count++);
        this.clients.push(client);
    }

    send(sender, message) {
        this.clients.forEach(c => {
            if (c === sender) return;
            c.write(`${sender.username}: ${message}`);
        });
    }

    remove(client) {
        const clientIndex = this.clients.indexOf(client);
        if (clientIndex !== 1) this.client.splice(clientIndex, 1);
    }
};