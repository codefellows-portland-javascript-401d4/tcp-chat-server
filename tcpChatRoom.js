module.exports = class tcpChatRoom {
  constructor() {
    this.seed = 1;
    this.guests = [];
  }
  add(guest) {
    guest.name = 'guest ' + (this.seed++);
    this.guests.push(guest);
  }
  send(msgSender, message) {
    this.guests.forEach(guest => {
      if(guest === msgSender) return;
      var randomID = Math.floor(Math.random()*10);
      guest.id = 'guest ' + randomID;
      guest.write(`${msgSender.id}: ${message}`);
    });
  }
  remove(guest) {
    const index = this.guests.indexOf(guest);
    if (index !== -1) this.guests.splice(index, 1);
  }
};
