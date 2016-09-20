const express = require('express');
const router = express.Router();
const controller = require('./controller.js');

router.get('/alive', controller.alive);
router.use('/api', require('./api'));
router.use('/auth', require('./auth'));

module.exports = router;
