'use strict';

module.exports = class DogChat {
    constructor() {
        this.dogCount = 1;
        this.dogClients = [];
    }

    add(client) {
        const username = 'dog ' + (this.dogCount++);
        client.name = username;
        this.dogClients.push(client);
    }

    send(sender, message) {
        this.dogClients.forEach(client => {
            if(client === sender) return;
            client.write(`${sender.name}: ${message}`);
        });
    }

    remove(client) {
        const dogIndex = this.dogClients.indexOf(client);
        if(index !== 1) this.client.splice(dogIndex, 1);
    }
};