module.exports = class ChatRoom {
    constructor() {
        this.id = 1;
        this.clients = [];
    }

    add(client) {
        client.name = 'Client ' + (this.id++);
        this.clients.forEach(c => {
            c.write(client.name + 'entered the chatroom');
        });
        this.clients.push(client);
    }

    send(sender, message) {
        this.clients.forEach(c => {
            if(c === sender) return;
            // send the message
            // c.write(`${sender.name}: ${message}`);
            c.write(sender.name + ': ' + message);
        });
    }

        remove(client) {
        const index = this.clients.indexOf(client);
        if (index !== -1) this.clients.splice(index, 1);
    }
};