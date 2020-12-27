const { Router } = require("express");
const bodyParser = require("body-parser");

const callback = require("../../routes/api/callback");
const verify = require("../../routes/api/verify");

const route = Router();

route.use(bodyParser.json({limit: '10mb'}));

route.use(function (_, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

route.use("/callback", callback);
route.use("/verify", verify);

module.exports = route;
