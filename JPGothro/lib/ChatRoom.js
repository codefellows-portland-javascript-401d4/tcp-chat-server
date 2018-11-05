
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
            c.write(`${sender.name} shall henceforth be known as ${sender.nickName}` + '\n');
        });
    }

    send(sender, message) {
        // check the message and take specific action if nickname being added.
        const messageParts = message.replace(/\r/, '').replace(/\n/, '').split(' ');
        if(messageParts[0] === '/nick') {
            sender.nickName = messageParts[1];
            this.nameChange(sender);
        } else {
            this.clients.forEach(c => {
                if(c === sender) return;
                if (sender.nickName) {
                    c.write(`${sender.nickName}: ${message}`);
                } else {
                    c.write(`${sender.name}: ${message}`);
                };
            });
        }
    }

    remove(client) {
        const index = this.clients.indexOf(client);
        if(index !== -1) this.clients.splice(index, 1);
        this.clients.forEach(c => {
            c.write(client.name + ' has left the Chat Room.');
        });
    }
};
