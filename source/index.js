const express       = require("express");
const ejs           = require('ejs');
const path          = require('path');
const bodyParser    = require('body-parser');
const consign       = require('consign');

const app = express();

app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/view/'));
app.use(bodyParser.urlencoded({
    extended: true
}));
consign().include('controller/routes').into(app);

app.listen(8081, function(){
    console.log("Servidor funcionando na url http://localhost:8081");
});