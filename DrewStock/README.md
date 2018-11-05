# tcp-chat-server: coded by [Drew Stock] (https://github.com/DrewStock)
==================================================
This app launches a local tcp server which hosts a chat group (i.e. chat room). New clients are able to connect to the chat group and message each other.

The following are command line instructions for using the app.

* After cloning the repo:
    * type 'npm install'
* To launch the app & tests:
    * type 'npm start'
* To launch the app only:
    * type 'node index.js'
    * this creates a local tcp server, which will be listening on port 3000
    * when a new client connects, a message (i.e. 'client 53 connected!') is logged on the server
* To connect as a new client:
    * open an additional terminal window
    * type 'telnet localhost 3000'
    * a client name (i.e. 'client 37') will be randomly generated and a welcome message from the server will be logged on the client
    * client is now able to type a message to chat with other clients
* To disconnect a client:
    * escape character is 'CTRL + ]'
    * type 'quit' at the telnet prompt in the command line
