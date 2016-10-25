
module.exports = class ChatRoom {
    constructor() {
        this.seed = 1;
        this.clients = [];
    }

    add(client) {
        client.name = 'guest-' + (this.seed++);
        this.clients.forEach(c => {
            c.write(client.name + ' has joined the Chat Room.\n');
        });
        this.clients.push(client);
    }

    nameChange(sender) {
        this.clients.forEach(c => {
            if (c === sender) return;
            c.write(`${sender.name} shall henceforth be known as ${sender.nickName}`);
        });
    }

    send(sender, message) {
        this.clients.forEach(c => {
            if(c === sender) return;
            if (sender.nickName) {
                c.write(`${sender.nickName}: ${message}`);
            } else {
                c.write(`${sender.name}: ${message}`);
            };
        });
    }

    remove(client) {
        const index = this.clients.indexOf(client);
        if(index !== -1) this.clients.splice(index, 1);
        this.clients.forEach(c => {
            c.write(client.name + ' has left the Chat Room.');
        });
    }
};
