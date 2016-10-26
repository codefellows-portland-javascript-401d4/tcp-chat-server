moduule.exports = class chatRoom {
    constructor(){
        this.clientsInChat = 1;
        this.clients = [];
    }

    add(client){
        client.name = 'User' + (this.clientsInChat++);
        this.clients.push(client);
        this.clients.forEach(user => {
            user.write(client.name + " entered the room\n");
        });
    }

    chat(client, message){
        this.clients.forEach(cli => {
            if(cli === client) return;
            cli.write(client.name + ': '+ message);
        });
    }
    leaveChatRoom(client){
        const index = this.client.indexOf(client);
        if (index !== -1) this.clients.splice(index, 1);
        this.clients.forEach(cli => {
            if (cli == client) return;
            cli.write('User: '+client.name+' has left the room');
        })
        
    }
};