const generate = require('project-name-generator');
const net = require('net');

module.exports = class ChatRoom {

  constructor() {
    this.clients = [];
  }

nick() {
  return generate({alliterative: true}).dashed;
}

  add(client) {
    client.nick = this.nick();
    this.clients.push(client);
    console.log(`${client.nick} has connected`);
  }

  send(sender, message) {
    this.clients.forEach(c => {
      if(c === sender) return;
      c.write(`${sender.nick}: ${message}`);
    });
  }

  remove(client) {
    const index = this.clients.indexOf(client);
    if (index !== -1) this.clients.splice(index, 1);
    console.log(`${client.nick} has disconnected`);
  }

  changeNick(client, message) {
    let oldNick = client.nick;
    let newNick = message.split(' ')[1];
    client.nick = newNick;
    this.clients.forEach(c => {
      c.write(`${oldNick} has changed their name to ${client.nick}`);
    });
  }

  changeNickRandom(client) {
    let oldNick = client.nick;
    client.nick = this.nick;
    this.clients.forEach(c => {
      c.write(`${oldNick} has changed their name to ${client.nick}`);
    });
  }

};