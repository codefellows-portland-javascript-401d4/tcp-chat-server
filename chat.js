module.exports = class ChatRoom {
  constructor() {
    this.clients = [];
  }

  add(client) {
    client.write('Velcome to ze chat!\n');
    this.seed = Math.floor(Math.random() * 5000) + 1;
    this.clients.push(client);
    client.name = 'chatterbox_' + (this.seed); 
  }

  send(sender, message) {
    let output = `${sender.name}: ${message}`;
      // Allow user to change name by starting message with /nick
      if (message.startsWith('/nick ')) {
        // remove linefeed or return chars from end of string
        message = message.trim();
        let newName = message.slice(6, message.length);
        output = sender.name + ' chose a new name: ' + newName + '\n';
        sender.name = newName;
        sender.write(output);
      }
      this.clients.forEach(c => {
        if(c === sender) return;
        c.write(output);
    });
  }

  remove(client) {
    const index = this.clients.indexOf(client);
    if (index !== -1) this.clients.splice(index, 1);
  }
  
};