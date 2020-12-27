const bot = require('./bot/index.js');
const App = require('./structures/app.js');
const { web: {port}, token } = require("./config.js");


(async () => {
    let client = await bot.init(token);
    console.log(`Logged in as ` + `\x1b[34m\x1b[4m${client.user.tag}\x1b[0m`);
    await new App(client).listen(port || 8080);
    console.log(`Running on port ` + `\x1b[34m\x1b[4m${port || 80}\x1b[0m`);
})()