/**
 * Configuración del servidor
 */
const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes/routes');

const app = express();
const version = "v1";

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(`/api/${version}`, api);

module.exports = app;
