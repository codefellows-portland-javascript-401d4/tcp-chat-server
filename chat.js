const net = require("net");
var generateName = require("sillyname");

let i = 1;
const clients = [];

const server = net.createServer(client => {
  const name = "client " + (i++);
 	const nickname = generateName();
  client.setEncoding("utf-8");
  console.log(`${nickname} (${name}) has connected`);

  clients.push(client);
  // console.log(clients);

  client.on("data", message => {
    //first of three lines of Windows/Telnet workarounds as it is set to single character input
    client.message += message;
    clients.forEach(c => {
      if(c === client) return; //return to .forEach "loop"
      //second workaround
      if (message.indexOf("\r\n") !== -1) {
        c.write(nickname + ": " + client.message);
      //third workaround
        client.message = "";
      }
    });
  });

  client.on("close", () => {
    const index = clients.indexOf(client);
    if (index !== -1) clients.splice(index, 1);
    console.log(`${nickname} (${name}) has disconnected`);
  });
});

const port = 65000;
server.listen(port, err => {
  if (err) console.log("ERROR!", err);
  else console.log("server listening on port", port);
});