const express = require('express');
const router = express.Router({mergeParams:true});
const controller = require('./user.controller.js');
const validator = require('./user.validator.js');

router.post('/', validator.validateCreateBody(), controller.create);
router.get('/', controller.index);

module.exports = router;
