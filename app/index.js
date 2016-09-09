const express = require('express');
const app = express();
const routes = require('./routes.js');

// micro config
app.set('startDate', new Date());
app.set('x-powered-by', false);
app.set('etag', false);

// middlewares
app.use(require('./middlewares/middleware-cachehandler.js')());
app.use(require('./middlewares/middleware-error.js')());
app.use(require('./middlewares/middleware-allowcrossdomain.js')());
app.use(require('body-parser').json());
app.use('/static', express.static(__dirname + '/static'))

// mount routes
app.use(routes);

module.exports = app;
