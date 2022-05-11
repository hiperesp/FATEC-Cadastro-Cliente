const express       = require("express");
const ejs           = require('ejs');
const path          = require('path');
const bodyParser    = require('body-parser');
const consign       = require('consign');
const passport      = require('passport-local');

const port = 8081;

const app = express();

app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/view/'));
app.use(bodyParser.urlencoded({
    extended: true
}));
consign().include('controller/routes').into(app);

app.post('/login/executar', passport.authenticate('local', {
    successRedirect: '/lista/usuario',
    failureRedirect: '/login/?fail=true'
}));

app.listen(port, function() {
    console.log(`Servidor funcionando na url http://localhost:${port}`);
});