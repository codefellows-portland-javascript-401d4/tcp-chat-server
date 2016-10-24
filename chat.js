// Use the Node.js net module to create a chat server

// You can connect clients using telnet command:

// https://procurity.wordpress.com/2013/07/15/beginners-guide-to-telnet-basics/
// Manage connected clients when they "register" (on server connection and socket close)

// Clients should be given a randomly generated nickname used to identify who typed a message in the chat

// e.g. guest-43: hello everyone
// When a client sends a message (on socket data) it should be "broadcast" to all other clients, except for the client who sent the message.

// While you can write this assignment in a single module, is there a way to better split the functionality between the TCP server and the chat app logic? (There is no "one right way" to design this assignment, you should spend some time trying different possibilities)

// Because we are covering tcp clients tomorrow, you won't be able to e2e test your server.

// But you still should unit test modules (another reason to decouple managing clients from the server) and for this assignment you should use chai as your assertion library (you can choose either BDD or Assert api - just be consistent).

const net = require("net");

let i = 1;
const clients = [];

const server = net.createServer(client => {
  const name = "client " + (i++);
  client.setEncoding("utf-8");

  clients.push(client);

  client.on("data", message => {
        //send this to all the other clients
      clients.forEach(c => {
            // if same as sender, return (exit this particular forEach invocation)
          if(c === client) return;
            // otherwise send the message
          c.write(`${name}: ${message}`);
        });
    });

  client.on("close", () => {
        // remove from array:
      const index = clients.indexOf(client);
      if (index !== -1) clients.splice(index, 1);
      console.log(`client ${name} has disconnected`);
    });
});

const port = 65000;
server.listen(port, err => {
  if (err) console.log("ERROR!", err);
  else console.log("server listening on port", port);
});