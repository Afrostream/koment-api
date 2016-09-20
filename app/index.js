const sqldb = require('./sqldb');
const express = require('express');
const app = express();
const routes = require('./routes.js');
const config = require('../config');
const WebSocketServer = require('ws').Server;
// micro config
app.set('startDate', new Date());
app.set('x-powered-by', false);
app.set('etag', false);

// middlewares
app.use(require('./middlewares/middleware-cachehandler.js')());
app.use(require('./middlewares/middleware-error.js')());
app.use(require('./middlewares/middleware-allowcrossdomain.js')());
app.use(require('body-parser').json());
app.use('/static', express.static(__dirname + '/static'));

// mount routes
app.use(routes);


//Websocket
const wss = new WebSocketServer({server: app});

setInterval(() => {
    wss.clients.forEach((client) => {
        client.send(new Date().toTimeString());
    });
}, 1000);

// Start server
sqldb.sequelize.sync()
    .then(function startServer () {
        app.listen(config.port, function () {
            console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
        });
    })
    .catch(function (err) {
        console.log('Server failed to start due to error: %s', err);
    });

module.exports = app;
