const server = require('./lib/chat-server');
//check if a port is specified already, if not 65000
const port = process.env.PORT || 65000;

server.listen(port, err => {
  if (err) console.log('ERROR!', err);
  else console.log('server listening on port', port);
});
