const tcpServer = require('./lib/tcpServer.js');

const port = 12121;
tcpServer.listen(port, err => {
  if (err) console.log('ERROR!', err);
  console.log('server listening on port', port);
});

