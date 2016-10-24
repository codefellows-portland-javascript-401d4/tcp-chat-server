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
      // Allow user to change name by starting message with /nick
      if (message.startsWith('/nick ')) {
        let newName = message.slice(6, message.length -2);
        console.log(message.length);
        console.log(newName);
        sender.name = newName;
        c.write('You chose a new name: ' + sender.name + '\n');
      } else {
        if(c === sender) return;
        c.write(`${sender.name}: ${message}`);
      }
    });
  }

  remove(client) {
    const index = this.clients.indexOf(client);
    if (index !== -1) this.clients.splice(index, 1);
  }
  
};