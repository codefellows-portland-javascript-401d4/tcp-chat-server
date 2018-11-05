

module.exports = class ChatApp {
    constructor(){
        this.id = 1;
        this.clients = [];
    }

    add(client) {
        client.nick = 'client ' + (this.id++);
        this.clients.push(client);
    }

    send(sender, message) {
        this.clients.forEach(client => {
            if(client !== sender){
                let timeStamp = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
                client.write(`${timeStamp} ${sender.nick}: ${message}`);
            }
        });
    }

    remove(client) {
        let index = this.clients.indexOf(client);
        if (index !== -1) this.clients.splice(index, 1);
    }

    rename(client, nickname){
        if(nickname){
            nickname = nickname.replace('/nick ', '');
            client.nick = nickname;
        }
    }
};