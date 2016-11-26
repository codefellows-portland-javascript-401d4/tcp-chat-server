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
<<<<<<< HEAD
    // client.id = 'chatter ' + (this.seed++);
    // assign random ID nickname between 1 ~ 9 for client
    // var randomID = Math.floor(Math.random()*10);
    // client.id = 'chatter ' + randomID;
    // client.write(`welcome to the discussion, ${client.id}`);
    client.write('welcome to the discussion');
=======
    client.name = 'client ' + (this.seed++);
>>>>>>> 435b33bc4c15a790a75b2b523755431a09be1147
    this.clients.push(client);
  }

  send(sender, message) {
    this.clients.forEach(client => {
      // if client is same as sender, then exit this forEach to prevent sender from receiving their own message
      if(client === sender) return;
<<<<<<< HEAD
      // otherwise, send message to other clients in chat room
      // client.write(`${sender.id}: ${message}`);
      client.write(message);
=======
      // otherwise, randomize client ID and send message to other clients in chat room
      var randomID = Math.floor(Math.random()*10);
      client.id = 'client ' + randomID;
      client.write(`${sender.id}: ${message}`);
>>>>>>> 435b33bc4c15a790a75b2b523755431a09be1147
    });
  }
  remove(client) {
    // remove client from array
    const index = this.clients.indexOf(client);
    if (index !== -1) this.clients.splice(index, 1);
  }
};
