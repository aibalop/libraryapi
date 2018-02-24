/*
 * Cuenta de administrador
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
        name : String,
        lastname : String,
        email : String,
        username : String,
        pass : String
});

module.exports = mongoose.model('Admin',adminSchema);
