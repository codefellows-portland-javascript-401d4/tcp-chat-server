### TCP-Chat-Server Lab

v1.0.0

-Package JSON has a few scripts to validate build
    -pretest : run lint before test
    -test : run mocha on current test file
    -test:watch : run mocha and continue to watch test file for any changes
    -lint : run eslint
    -start : run nodemon.js

-This will allow you to chat if anyone connects using telnet on port 65000 of your localhost or given IP
-You can change your name by using /nick <name you want to use>
    -NOTE: The logic will only get the first name if the names are separated by spaces after using /nick
    