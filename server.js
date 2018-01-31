/**
 * Configuración del servidor
 */
var express = require('express');
var bodyParser = require('body-parser');
var api = require('./routes/routes');

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/api',api);

module.exports = app;