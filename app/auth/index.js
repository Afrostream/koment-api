const express = require('express');
const User = require('../sqldb').User;
const config = require('../../config');
// Passport Configuration
require('./local/passport').setup(User, config);
require('./facebook/passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local'));
router.use('/facebook', require('./facebook'));

module.exports = router;
