
const server = require('./lib/ChatServer');

const port = process.argv[2] || 65000;
server.listen(port, err => {
  console.log('Server listening on port', port, err);
});