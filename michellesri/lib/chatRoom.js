module.exports = class ChatRoom {
  constructor(){
    this.clientsInChat = 1;
    this.clients = [];
  }

  add(client){
    client.name = 'guest ' + (this.clientsInChat++);
    this.clients.push(client);
    this.clients.forEach(cli => {
      cli.write(client.name + ' entered the room\n');
    });
  }

  chat(client, message){
    this.clients.forEach(cli => {
      if(cli === client) return;
      cli.write(client.name + ': ' + message);
    });
  }
  leaveChatRoom(client){
    const index = this.clients.indexOf(client);
    if (index !== -1) this.clients.splice(index, 1);
    this.clients.forEach(cli => {
      if(cli === client) return;
      cli.write(`client ${client.name} has left the chat`);
    });
  }
};
