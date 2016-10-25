# TCP ChatRoom

## Description

This implements a ChatRoom class and simple server that allow multiple clients to connect and chat using telnet.

## Code Example

```
node tcp-chat-server.js <port>
```

If the port is not specified, it will use 65000. Then use telnet to connect to the chat room.

```
telnet localhost <port>
```

## Motivation

This was written as a lab assignment for Code Fellows 401 class.

## API Reference

### Constructor

```const chatRoom = new ChatRoom();```

Construct a new ChatRoom.

### ChatRoom.addClient

```chatRoom.addClient(client_obj);```

Add a new client object to the chat and informs everyone.

### ChatRoom.send

```chatRoom.send(client_obj, msg);```

Sends a message to all clients except the sender.

### ChatRoom.broadcast

```chatRoom.broadcast(msg);```

Broadcasts a message to all clients (used for chat room management, e.g. to inform of client name changes or other global events).

### ChatRoom.removeClient

```chatRoom.removeClient(client_obj);```

Removes the specified client from the client list and informs the remainer chatters.

### Nicknames

Although not technically part of the API, clients can change their assigned name by sending a message as follows: `/nick <nickname>`. This will change the client's screen name and inform all the other users of the change.

## Tests

The accompanying test suite can be run using the 'npm test' command.

## Contributors

[Mark Greenwood](https://github.com/markgreenwood)

## License

The MIT License (MIT)
Copyright (c) 2016 Mark Greenwood

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
