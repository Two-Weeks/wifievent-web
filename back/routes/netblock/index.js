const express = require('express');
const router = express.Router();
const controller = require('./netblock.controller');

router.get('/', controller.download);

module.exports = router;