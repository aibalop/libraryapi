/*
 * Servicio para generación de token
 * y decoficado del mismo
 */

'use strict'
const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

function createToken(user){

    let payload = {
        userid : user._id,
        username  : user.username,
        dat_exp : moment.unix().add(1,'day')
    };

    return jwt.encode(payload,config.SECRET);

}


function decodeToken(token){

    let promesaDecode = new Promise((resolve, reject) => {
        try{
            let payload = jwt.decode(token,config.SECRET);

            if ( payload.dat_exp < moment.unix() ){
                reject({
                    mensaje : "El token ya expiro",
                    status : 401
                });

            }//comprobamos si el token expiro


            resolve({
                mensaje : "Token valido",
                status : 200
            });


        }catch(err){
            reject({
                mensaje : "Token incorrecto", //no se logro decodificar el token, osea no era valido
                status : 500
            });
        }
    });


    return promesaDecode;

}

module.exports = {
    createToken,
    decodeToken
};

