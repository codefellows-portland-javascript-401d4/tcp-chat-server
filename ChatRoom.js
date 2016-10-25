module.export = class ChatRoom {
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
            // send the message
            c.write(`${sender.name}: ${message}`);
        });
    }

        remove(client) {
        // remove from array:
        const index = this.clients.indexOf(client);
        if (index !== -1) this.clients.splice(index, 1);
    }
};