
// Declare 'ChatGroup' class and attach methods
const ChatGroup = class ChatGroup {
    constructor() {
        this.clientID = 1;
        this.clients = [];
    }

    // 'create' method for creating and naming new clients. Client name is generated as a random number between 1 and 100 (i.e. 'client 53') and client is added to an array ('this.clients').
    create(client) {
        client.name = 'client ' + Math.round(Math.random(this.clientID) * 100);
        this.clients.push(client);
    }

    // 'send' method for ChatGroup clients to message other clients. The client who is sending the message (sender) is excluded from receiving the message.
    send(sender, message) {
        this.clients.forEach(c => {
            if(c === sender) return;

            c.write(`${sender.name}: ${message}`);
        });
    }

    // 'remove' method to remove clients from this.clients array when they quit the ChatGroup
    remove(client) {
        const index = this.clients.indexOf(client);
        if (index !== -1) this.clients.splice(index, 1);
    }

};

module.exports = ChatGroup;
