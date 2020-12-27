var express = require('express');
var router = express.Router();
/* Discord Auth */
const { invite, server_id } = require('../config');

/* Get API Page */
const api = require('./api');
router.use("/api", api);

/* File Reading Module */
const fs = require('fs');

/* GET home page. */
router.get('/', async (req, res, next) => {
      //console.log(req.app.get('client'))
      if  (req.user) {
            try {
                  await req.app.get('client').guilds.cache.get(server_id).members.fetch(req.user.id);
                  return res.render('verify')
              } catch (e) {
                  return res.render('join', invite)
              }
      } else {
            return res.render('index');
      }
});

module.exports = router;
