var express = require('express');
var router = express.Router();
/* Discord Auth */
const { invite } = require('../config');

/* Get API Page */
const api = require('./api');
router.use("/api", api);

/* File Reading Module */
const fs = require('fs');

/* GET home page. */
router.get('/', async (req, res, next) => {
    return res.redirect(invite)
});

module.exports = router;
