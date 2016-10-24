module.exports = class ChatGroup {
    constructor() {
        this.clientID = 1;
        this.clients = [];
    }

    create(client) {
        client.name = 'client ' + Math.round(Math.random(this.clientID) * 100);
        this.clients.push(client);
    }


};
