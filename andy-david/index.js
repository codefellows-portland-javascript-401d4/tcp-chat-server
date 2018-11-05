const server = require('./tcpChat');
const port = process.env.PORT || 65000;

server.listen(port, err => {
  if (err) console.log('error!', err);
  else console.log('server listening on port', server.address().port);
});