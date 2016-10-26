module.exports = class ChatRoom {

  constructor() {
    this.seed = 1;
    this.clients = [];
  }
  
  //handler that adds client to array of active users
  add(client) {
    client.name = 'visitor ' + (this.seed++);
    this.clients.push(client);
  }
  
  //handler that sends message to all users except sender
  send(sender, message) {
    this.clients.forEach(visitor => {
      if(visitor === sender) return;
      visitor.write(`${sender.name}: ${message}`);
    });
  }
  
  //handler that removes client from array of active users
  remove(client) {
    const index = this.clients.indexOf(client);
    if (index !== -1) this.clients.splice(index, 1);
  } 

};
