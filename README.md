# TCP CHAT SERVER

This is a chat server based in node JS. It creates a TCP server that clients can log into and exchange messages live.

### Authors

This would not have been possible without the the instructors at Code Fellows, This implementation is built by Albert Reel based on a model From Marty.

### server.js function

Server.js uses the net module to create a server and direct traffic.

### Client.js

calls the server module and assigns the port. It will defer to an enviromental value set to TCPPORT is available.

``` javascript
const port = process.env.TCPPORT || 65000;

```