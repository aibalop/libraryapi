/*
 * Cliente de la biblioteca
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
        name : String,
        lastname : String,
        address : String,
        phone : String,
        email : String,
        pass : String
});

module.exports = mongoose.model('User',userSchema);
