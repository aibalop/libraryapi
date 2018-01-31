/**
 * Configuración de las rutas
 */
var express = require('express');
var authorController = require('../controllers/authorController');
var bookController = require('../controllers/bookController');
var userController = require('../controllers/userController');

var api = express.Router();

api.get('/',(req,res)=>{
    res.status(200).send({
        name : "API LIBRARY",
        author : "Alan Ibarra",
        version : "1.0"
    });
});

//authors endpoints
api.get('/authors',authorController.all);
api.get('/author/:authorid',authorController.getAuthor);
api.post('/author',authorController.insertAuthor);
api.put('/author/:authorid',authorController.updateAuthor);
api.delete('/author/:authorid',authorController.deleteAuthor);

//books endpoints
api.get('/books',bookController.all);
api.get('/book/:bookid',bookController.getBook);
api.post('/book',bookController.insertBook);
api.put('/book/:bookid',bookController.updateBook);
api.delete('/book/:bookid',bookController.deleteBook);

//users endpoints
api.get('/users',userController.all);
api.get('/user/:userid',userController.getUser);
api.post('/user',userController.insertUser);
api.put('/user/:userid',userController.updateUser);
api.delete('/user/:userid',userController.deleteUser);


module.exports = api;