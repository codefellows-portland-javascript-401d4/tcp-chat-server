const net = require('net');
const tcpChatRoom = require('./tcpChatRoom');
const chatRoom = new tcpChatRoom();

const chatRoomServer = net.createServer(guest => {
  guest.setEncoding('utf-8');

  chatRoom.add(guest);

  guest.on('data', message => {
    chatRoom.send(guest, message);
  });
  guest.on('close', () => {
    chatRoom.remove(guest);
  });
});

const port = 65000;
chatRoomServer.listen(port, err => {
  if (err) console.log('500 - Internal Server Error!', err);
  else console.log('Success! - chatRoomServer listening on port', port);
});
