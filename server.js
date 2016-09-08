const app = require('./app');
const redist = require('./redis');

const server = app.listen(process.env.PORT || 4141, function () {
  console.log('listening on port '+ server.address().port);
});

module.exports = server;
