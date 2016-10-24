const nameGenerator = require('./nameGenerator');

module.exports = class ChatRoom {
  constructor() {
    this.seed = 1;
    this.clients = [];
  }

  add(client) {
    client.name = nameGenerator.randomNameSelector() + (this.seed++);
    this.clients.push(client);
    this.clients.forEach(c => {
      // if(c === client) return;
      c.write(`${client.name} has entered the chatroom \n`);
    });
  }

  send(sender, message) {
    this.clients.forEach(c => {
      if(c === sender) return;
      c.write(`${sender.name}: ${message}`);
    });
  }

  remove(client) {
    const index = this.clients.indexOf(client);
    if (index !== -1) this.clients.splice(index, 1);
    this.clients.forEach(c => {
      c.write(`${client.name} has left the chatroom`);
    });
  }
};
