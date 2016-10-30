'use strict';
const dogs = require('dog-ascii-faces');

module.exports = class DogChat {
    constructor() {
        this.dogCount = 1;
        this.dogClients = [];
        this.dogFace = dogs();
    }

    add(client) {
        const username = 'Dog ' + (this.dogCount++) + ' ' + (this.dogFace);
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