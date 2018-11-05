const server = require('./lib/server');

const port = 65000;

server.listen(port, err => {
  console.log('server started on port: ', port, err);
});
