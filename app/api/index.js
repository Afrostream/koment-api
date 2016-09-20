const express = require('express');
const router = express.Router();

router.use('/koments', require('./koment'));
router.use('/users', require('./user'));

module.exports = router;
