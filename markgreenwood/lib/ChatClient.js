const net = require('net');

class ChatClient {
  constructor() {
    this.name = '';
    this.received = '';
    this.socket = new net.Socket();
    this.socket.setEncoding('utf-8');
  }

  connect(host, port, cb) {
    let self = this;
    self.socket.connect(port, host, (err) => {
      console.log(`Connected to ${host}:${port}`);
      self.socket.on('data', (data) => {
        self.received = data;
        console.log('Rec\'d from server: ', data);
      });
      cb(err);
    });
  }

  write(msg) {
    this.socket.write(msg);
  }
}

module.exports = ChatClient;