'use strict';


//create ChatRoom object constructor
//adding seed and clients properties
module.exports = class ChatRoom {
  constructor() {
    this.seed = 1;
    this.clients = [];
  }

//exporting 'add' fxn
//set client name to client, number
  add(client) {
    client.name = 'User ' + (this.seed++);
    //push the client to array
    this.clients.push(client);
  }

//exporting 'send' fxn
//if current client and sender match, return nothing
//else, write the name and message to the terminal
  send(sender,message) {
    this.clients.forEach(c => {
      if(c === sender) return;
      c.write(`${sender.name}: ${message}`);
    });
  }
//remove the client
  remove(client) {
    const index = this.clients.indexOf(client);
    if (index !== -1) this.clients.splice(index, 1);
  }
};