module.exports = class ChatRoom {
    constructor() {
        this.clientId = 1;
        this.clients = [];
    }

    create(client) {
        client.name = 'Client ' + (this.clientId++);
        this.clients.forEach(client => {
            client.write(client.name + 'entered the chatroom');
        });
        this.clients.push(client);
    }

    send(sender, message) {
        this.clients.forEach(client => {
            if(client === sender) return;
            // c.write(`${sender.name}: ${message}`);
            client.write(sender.name + ': ' + message);
        });
    }

        remove(client) {
        const index = this.clients.indexOf(client);
        if (index !== -1) this.clients.splice(index, 1);
    }
};