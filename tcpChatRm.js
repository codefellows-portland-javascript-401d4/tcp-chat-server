// chat app logic
module.exports = class tcpChatRm {
  constructor() {
    this.seed = 1;
    this.clients = [];
  }
  add(client) {
    client.name = 'client '+(this.seed++);
    this.clients.push(client);
  }
  send(sender, msg) {
    this.clients.forEach(client => {
      // if client same as sender, then exit this forEach
      if(client === sender) return;
      // if client is not same as sender, then send msg
      client.write(`${sender.name}: ${Howdy}`);
    });
  }
  remove(client) {
    const index = this.clients.indexOf(client);
    if (index !== -1) this.clients.splice(index, 1);
  }
};
