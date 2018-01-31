var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title : String,
    description : String,
    year : Number,
    stock : Number,
    picture : String,
    authors : []
});

module.exports = mongoose.model('Book',bookSchema);