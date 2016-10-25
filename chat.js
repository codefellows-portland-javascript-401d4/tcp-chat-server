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
        // remove linefeed or return chars from end of string
        message = message.replace(/(\r\n|\n|\r)/,'');
        let newName = message.slice(6, message.length);
        c.write(sender.name + ' chose a new name: ' + newName + '\n');
        sender.name = newName;
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