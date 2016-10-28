

const ChatGroup = class ChatGroup {
    constructor() {
        this.clientID = 1;
        this.clients = [];
    }

    create(client) {
        client.name = 'client ' + Math.round(Math.random(this.clientID) * 100);
        this.clients.push(client);
    }

    send(sender, message) {
        this.clients.forEach(c => {
            if(c === sender) return;

            c.write(`${sender.name}: ${message}`);
        });
    }

    remove(client) {
        // const leaving = client;
        // const message = 'bye';
        // this.clients.forEach(c => {
        //     if(c === leaving) return;
        //
        //     c.write(`${leaving.name}: ${message}`);
        // });
        const index = this.clients.indexOf(client);
        // console.log(client.name);
        // const leaving = this.clients.splice(index, 1);
        if (index !== -1) this.clients.splice(index, 1);
        // if (index !== -1) leaving;
        // console.log(leaving.name, 'has left');
        // return leaving;
    }

};


module.exports = ChatGroup;
