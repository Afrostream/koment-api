const express = require('express');
const router = express.Router({mergeParams:true});
const controller = require('./stat.controller.js');

const middlewareBasicAuth = require('basic-auth-connect');

router.use(middlewareBasicAuth('stats', 'stats'));

router.get('/', controller.index);

module.exports = router;
