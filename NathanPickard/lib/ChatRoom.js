const ChatRoom = class ChatRoom {

    constructor() {
        this.clientId = 1;
        this.clients = [];
    }

    add(client) {
        client.name = 'Client ' + (this.clientId++);
        this.clients.forEach(client => {
            client.write(client.name + 'entered the chatroom');
        });
        this.clients.push(client);
    }

    send(sender, message) {
        this.clients.forEach(client => {
            if(client === sender) return;
            // send the message
            // c.write(`${sender.name}: ${message}`);
            client.write(sender.name + ': ' + message);
        });
    }

        remove(client) {
        const index = this.clients.indexOf(client);
        if (index !== -1) this.clients.splice(index, 1);
    }
};

module.exports = ChatRoom;