const fetch = require('node-fetch');

//const { server: { role_ids: { bot_verifier } }, server: { admin_user_ids, id } } = require("../config.json")

module.exports.auth = async (req, res, next) => {
    if (!req.user) return res.redirect("/login");
    return next();
}

module.exports.getUser = async (user) => {
    let { accessToken } = user;

    user = await fetch(`https://discord.com/api/users/@me`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    user = await user.json();

    if (user.code === 0) return false;
    return user;
};