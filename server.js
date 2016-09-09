const server = require('http').createServer();
const app = require('./app');
const WebSocketServer = require('ws').Server;
const redist = require('./redis');

const wss = new WebSocketServer({server: server});

setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 1000);

server.on('request', app);
server.listen(process.env.PORT || 4141, function () {
  console.log('Listening on ' + server.address().port);
});

module.exports = server;
