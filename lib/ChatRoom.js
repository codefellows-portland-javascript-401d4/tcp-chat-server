module.exports = class ChatRoom {
  constructor() {
    this.seed = 1;
    this.clients = [];
  }

  add(client) {
    //array of random names
    const rootNames = ['beet', 'rutabaga', 'turnip', 'carrot', 'celeriac', 'maca', 'jicama', 'parsnip', 'radish', 'salsify', 'ginger', 'cassava'];
    let randNameIndex = Math.floor(Math.random() * (rootNames.length - 1));

    client.name = rootNames[randNameIndex] + '-' + (this.seed++);
    client.write(`Welcome ${client.name}!` + '\n');

    this.clients.push(client); 
    console.log(`client ${client.name} is now connected`);
  }

  send(sender, message) {
    this.clients.forEach(c => {
      //if same as sender don't send message
      if (c === sender) return;
      //send the message
      c.write(`${sender.name}: ${message}`);
    });
  }

  remove(client) {
    //remove from array of clients
    const index = this.clients.indexOf(client);
    if (index !== -1) this.clients.splice(index, 1);
  }

};