// chat app logic
// 1. add clients and announce
// 2. broadcast messages to chat room clients
// 3. track clients leaving and announce

module.exports = class tcpChatRoom {
  constructor() {
    this.seed = 1;
    this.clients = [];
  }
  add(client) {
    client.id = 'chatter ' + (this.seed++);
    client.write(`${client.id}`);
    this.clients.push(client);
  }
  send(sender, message) {
    this.clients.forEach(client => {
      // if client is same as sender, then exit this forEach
      // to prevent sender from receiving their own message
      if(client === sender) return;
      // otherwise, send message to other clients in chat room
      // randomize client ID before sending message
      var randomID = Math.floor((Math.random()*10)+1);
      sender.id = 'chatter ' + randomID;
      client.write(`${sender.id}: ${message}`);
    });
  }
  remove(client) {
    const index = this.clients.indexOf(client);
    if (index !== -1) this.clients.splice(index, 1);
  }
};
