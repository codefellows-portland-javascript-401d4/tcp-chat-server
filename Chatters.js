var generateName = require('sillyname');

module.exports = class Chatter {
  constructor() {
    this.seed = 1;
    this.clients = [];
  }

  add(client) {
    client.name = 'client ' + (this.seed++);
    client.nickname = generateName();
    this.clients.push(client);
  }

  send(sender, message) {
    this.clients.forEach(c => {
      if(c === sender) return;
      c.write(`${sender.nickname}: ${message}`);
    });
  }

  remove(client) {
        // remove from array:
    const index = this.clients.indexOf(client);
    if (index !== -1) this.clients.splice(index, 1);
  }
};