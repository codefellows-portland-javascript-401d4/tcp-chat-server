"use strict";

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
    clients.forEach(c => {
      if(c === client) return; //return to .forEach "loop"
      
        c.write(nickname + ": " + client.message);
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