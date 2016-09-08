const express = require('express');
const router = express.Router();

router.use('/koments', require('./koment'))

module.exports = router;
