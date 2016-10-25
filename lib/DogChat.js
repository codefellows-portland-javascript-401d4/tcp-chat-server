module.exports = class DogChat {
    constructor() {
        this.dogCount = 1;
        this.dogClients = [];
    }

    add(client) {
        const username = 'dog ' + (this.dogCount++);
        this.dogClients.push(client);
    }

    send(sender, message) {
        this.dogClients.forEach(c => {
            if(c === sender) return;
            c.write(`${sender.username}: ${message}`);
        });
    }

    remove(client) {
        const dogIndex = this.dogClients.indexOf(client);
        if(index !== 1) this.client.splice(dogIndex, 1);
    }
};