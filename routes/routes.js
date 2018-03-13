/**
 * Configuración de las rutas
 */
var express = require('express');

var authorController = require('../controllers/authorController');
var bookController = require('../controllers/bookController');
var userController = require('../controllers/userController');
var adminController = require('../controllers/adminController');

var auth = require('../middlewares/auth');

var jwtservice = require('../services/jwt.service');

var api = express.Router();

api.get('/',(req,res)=>{
    res.status(200).send({
        name : "API LIBRARY",
        author : "Alan Ibarra @alan_ibalop",
        version : "1.0"
    });
});

//authors endpoints
api.get('/authors',auth,authorController.all);
api.get('/author/:authorid',auth,authorController.getAuthor);
api.post('/author',auth,authorController.insertAuthor);
api.put('/author/:authorid',auth,authorController.updateAuthor);
api.delete('/author/:authorid',auth,authorController.deleteAuthor);

//books endpoints
api.get('/books',auth,bookController.all);
api.get('/book/:bookid',auth,bookController.getBook);
api.post('/book',auth,bookController.insertBook);
api.put('/book/:bookid',auth,bookController.updateBook);
api.delete('/book/:bookid',auth,bookController.deleteBook);

//users endpoints
api.get('/users',auth,userController.all);
api.get('/user/:userid',auth,userController.getUser);
api.post('/user',userController.insertUser);
api.put('/user/:userid',auth,userController.updateUser);
api.delete('/user/:userid',auth,userController.deleteUser);

//admin endpoints
api.get('/admins',auth,adminController.all);
api.get('/admin/:adminid',auth,adminController.getAdmin);
api.post('/admin',auth,adminController.insertAdmin);
api.put('/admin/:adminid',auth,adminController.updateAdmin);
api.delete('/admin/:adminid',auth,adminController.deleteAdmin);
api.post('/admin/login',adminController.signIn);

//pruebas de jwt
api.get('/gtoken',(req, res)=>{
    let user = {
        userid : "1230123jn13n123n123",
        username : "ibalop"
    };
    let token = jwtservice.createToken(user);
    res.status(200).send({
        mensaje : "Token creado correctamente",
        token : token
    });
});

api.post('/validarToken',(req, res) => {
    
    let token = req.body.token;

    let tokenPromise = jwtservice.decodeToken(token)
        .then(solve => {
            res.status(solve.status).send({
                mensaje : solve.mensaje
            });
        })
        .catch(err => {
            res.status(err.status).send({
                mensaje : err.mensaje
            });
        });
});

module.exports = api;
