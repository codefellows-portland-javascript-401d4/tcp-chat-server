'use strict';
const dogs = require('dog-ascii-faces');
const dogNames = require('dog-names');

class DogChat {
    constructor() {
        this.dogClients = [];
    }

    // Functionality to catch if more than one of same name/face
    add(client) {
        const dogName = dogNames.allRandom();
        const dogFace = dogs();
        const user = dogName + ' ' + dogFace;
        client.name = user;
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
        if(dogIndex !== 1) this.dogClients.splice(dogIndex, 1);
    }
};

module.exports = DogChat;