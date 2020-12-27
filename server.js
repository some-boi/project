const express = require("express")
const app = express()
app.set('view engine', 'ejs');
app.set("port", 8080)
app.use(express.static('lib'))
app.get('/', function (req, res) {
    res.render("index.ejs")
})
const listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
});