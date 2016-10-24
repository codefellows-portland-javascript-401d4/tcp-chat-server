'use strict';

// this module should handle adding/removing clients, as well as sending messages

module.exports = class ChatRoom {
    constructor() {
        this.clientCounter = 1;
        this.clients = [];
    }

    add(client) {
        client.name = `client ${this.clientCounter++}`;
        this.clients.push(client);
        console.log(`${client.name} has connected!`);
    }

    remove(client) {
        const index = this.clients.indexOf(client);
        if (index !== -1) this.clients.splice(index, 1);
        console.log(`${client.name} has disconnected!`);
    }

    send(client, msg) {
        this.clients.forEach(c => {
            if (c === client) return;
            c.write(`${client.name}: ${msg}`);
        });
    }
};