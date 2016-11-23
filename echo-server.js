const server = require('./lib/echo-server');
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('server listening on port', 
        server.address().port);
});