/**
 * Script main 
 */
'use strict'

var config = require('./config');
var app = require('./server');
var mongoose = require('mongoose');

mongoose.connect(config.DB,(err) => {
    if(err){
        console.log("Error al conectar con la base de datos");
    }else{
        app.listen(config.PORT , _ => {
            console.log(`run in port ${config.PORT}`);
        });
    }
});