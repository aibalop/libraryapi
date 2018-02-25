/*
 * Middleware que verifica el token pasado en el encabezado
 */

'use strict'
var moment = require('moment');
var jwtservice =  require('../services/jwt.service');

function isAuth(req, res, next){
    
    if(!req.headers.authorization){
        res.status(500).send({
            mensaje : "Acceso denegado, se necesita un token"
        });
    }else{
        let token = req.headers.authorization.split(' ')[1]; // "bearer token"

        let tokenPromise = jwtservice.decodeToken(token)
        .then(resolve => {
            
            next();
        })
        .catch(err =>{
            res.status(err.status).send({
                mensaje : err.mensaje
            });
        });
    
    }
        
}


module.exports = isAuth;
