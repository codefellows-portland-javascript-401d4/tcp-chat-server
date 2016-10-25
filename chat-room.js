'use strict';

// this module should handle adding/removing clients, as well as sending messages


module.exports = class ChatRoom {

    constructor() {
        this.users = ['Sonic', 'Mario', 'Kirby', 'Pacman', 'Charizard', 'Link', 'Samus'];
        this.nameCounter = 1;
        this.clientCounter = 1;
        this.clients = [];
        this.currentUsers = [];
    }

    add(client) {
        const randomName = this.users[Math.floor(Math.random() * this.users.length)];
        if (this.currentUsers.indexOf(randomName) !== -1) {
            client.name = `${randomName}(${this.nameCounter++})`;
        } else {
            client.name = randomName;
        };
        this.currentUsers.push(client.name);
        this.clients.push(client);
        client.write(`Welcome ${client.name}! \n`);
        this.clients.forEach(c => {
            if (c === client) return;
            c.write(`${client.name} has joined! \n`)
        });
        console.log(`${client.name} has connected!`);
        console.log(this.currentUsers);
    }

    remove(client) {
        const index = this.clients.indexOf(client);
        if (index !== -1) {
            this.clients.splice(index, 1);
            this.currentUsers.splice(index, 1);
        }
        this.clients.forEach(c => {
            if (c === client) {
                // c.write(`Goodbye ${client.name}! \n`);
                return;
            }
            c.write(`${client.name} has disconnected! \n`)
        });
        console.log(`${client.name} has disconnected!`);
        console.log(this.currentUsers);

    }

    send(client, msg) {
        this.clients.forEach(c => {
            if (c === client) {
                c.write(`You: ${msg}`);
                return;
            }
            c.write(`${client.name}: ${msg}`);
        });
    }
};