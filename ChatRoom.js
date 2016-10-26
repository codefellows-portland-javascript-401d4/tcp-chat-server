// Requirements
// 1. add clients and announce
// 2. broadcast messages
// 3. track clients leaving and announce

module.exports = class ChatRoom {
  constructor() {
    this.id = 1;
    this.clients = [];
  }

  addClient(client) {
    client.name = 'Client ' + (this.id++);
    this.clients.push(client);
  }

  send(sender, msg) {
    this.clients.forEach( c => {
      if (c === sender) return;
      c.write(`${sender.name}: ${msg}`);
    });
  }

  broadcast(msg) {
    this.clients.forEach( c => {
      c.write(`Broadcast: ${msg}\n`);
    });
  }

  removeClient(client) {
    const index = this.clients.indexOf(client);
    if (index !== -1) this.clients.splice(index, 1);
  }
};