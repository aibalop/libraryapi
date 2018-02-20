/**
 * Configuración del servidor
 */
var express = require('express');
var bodyParser = require('body-parser');
var api = require('./routes/routes');

var app = express();
var version = "v1";

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(`/api/${version}/}`, api);

module.exports = app;