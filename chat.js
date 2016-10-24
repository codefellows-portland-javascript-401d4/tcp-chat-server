module.exports = class ChatRoom {
  constructor() {
    this.clients = [];
  }

  add(client) {
    this.seed = Math.floor(Math.random() * 5000) + 1;
    client.name = 'chatterbox_' + (this.seed); 
    this.clients.push(client);
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
  }

};