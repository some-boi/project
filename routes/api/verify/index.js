var express = require('express');
var router = express.Router();
const config = require("../../../config.js")
const { auth } = require('../../../utils/discordApi');

/* Verify USER Check */
router.get('/', auth, async (req, res, next) => {
    //console.log(req.app.get('client'))
    let client = await req.app.get('client');
    try {
        if (client.guilds.cache.get(config.server_id).members.cache.get(req.user.id).roles.cache.has(config.verified_role) == true) {
            return res.json({ success: true, verified: false, message: "You are already verified!" })
        } else {
            try {
                await client.guilds.cache.get(config.server_id).members.cache.get(req.user.id).roles.add(config.verified_role)
                return res.json({ success: true, verified: true, message: "Successfully Verified" })
            } catch (err) {
                console.log(err)
                return res.json({ success: false, message: "Some Error Occured... Please contact server Admin" })
            }
        }
    } catch (err) {
        console.log(err)
        return res.json({ success: false, message: "Some Error Occured... Please contact server Admin" })
    }
});

module.exports = router;