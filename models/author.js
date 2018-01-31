var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var authorSchema = new Schema({
    name : String,
    lastname : String,
    country : String
});

module.exports = mongoose.model('Author',authorSchema);