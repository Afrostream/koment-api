const express = require('express');
const router = express.Router();

router.use('/koments', require('./koment'))
router.use('/stats', require('./stat'))

module.exports = router;
