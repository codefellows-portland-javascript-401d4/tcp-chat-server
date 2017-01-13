Refactoring of tcp-chat-server
==============================

Refactoring changes to tcp-chat-server:
1. To help improve understanding of my code for novice developers, throughout the code I improved some of my naming conventions; client to guest, clients to guests, sender to msgSender, server to chatRoomServer. I think my renaming helps to improve readability and clarity of the code.
2. To prevent time-outs in server-e2e-test.js when waiting for data return, I moved the 'done()' callback further down. This resolved my test time-out issues. Therefore, I was quite elated with this refactoring change to my code.
3. I improved upon the error and success console log messages for the server connection.
4. I cleaned up the code a bit by removing extraneous and unnecessary comments.
5. I improved some of the 'it'-specific test descriptions in server-e2e-test.js to improve clarity regarding purpose of the tests.

===========================================================
Basic logic of this tcp-chat-server:
1. Adds guests to the chat room and announces their presence and identity with a number tag.
2. Broadcasts messages from guests to other chat room guests.
3. To improve privacy during chat, each time a guest sends a message, their identity tag is randomized.
4. To reduce chat clutter, the code prevents the message sender from receiving their own messages.
5. Tracks when chat room guests leave.
