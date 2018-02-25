/*
 * Controlador de cuentas de administrador
 */

var Admin = require('../models/admin');
var jwtservice = require('../services/jwt.service');

function insertAdmin(req, res){
    console.log(req.body);

    let admin = new Admin();
    admin.name = req.body.name;
    admin.lastname = req.body.lastname;
    admin.email = req.body.email;
    admin.username = req.body.username;
    admin.pass = req.body.pass;

    admin.save((err)=>{
        if(err){
            return res.status(500).send({
                message : "Error to save admin"
            });
        }else{
            return res.status(200).send({
                message : "admin was successfully created"
            })
        }
    });   
}

function updateAdmin(req, res) {
    let id = req.params.adminid;
    let datos = req.body;
    Admin.update({'_id' : id},datos,(err) => {
        if(err){
            return res.status(500).send({
                message : "Error to update"
            });
        }
        return res.status(200).send({
            message : "update : " + id
        });
    });
}

function deleteAdmin(req, res) {
    let id = req.params.adminid;
    
    Admin.findOne({'_id' : id},(err, admin) => {
        if(err){
            return res.status(500).send({
                message : "Error to search by id"
            });
        }

        if (!admin) {
            return res.status(404).send({
                message : "No found admin"
            });
        }

        admin.remove((err)=>{
            if (err) {
                return res.status(500).send({
                    message : "Error to remove"
                });
            }
            return res.status(200).send({
                message : "admin removed: " + id
            })
        });
    });
}

function all(req, res) {
    Admin.find({},(err, admins) => {
        if(err){
            return res.status(500).send({
                message : "Error to search by id"
            });
        }

        if (!admins) {
            return res.status(404).send({
                message : "No found any admin"
            });
        }

        return res.status(200).send({
            admins
        });
    });
}

function getAdmin(req, res) {
    let id = req.params.adminid;
    
    Admin.findOne({'_id' : id},(err, admin) => {
        if(err){
            return res.status(500).send({
                message : "Error to search by id"
            });
        }

        if (!admin) {
            return res.status(404).send({
                message : "No found admin"
            });
        }

        return res.status(200).send({
            admin
        });
    });
}

function signIn(req, res) {
    let id = req.params.adminid;
    
    Admin.findOne({'username' : req.body.username,'pass' : req.body.pass},(err, admin) => {
        if(err){
            return res.status(500).send({
                message : "Error al logearse"
            });
        }

        if (!admin) {
            return res.status(404).send({
                message : "No existe el usuario o contraseña/usuario incorrecto"
            });
        }
        
        let token = jwtservice.createToken(admin);

        return res.status(200).send({
            mensaje : "Acceso correcto",
            token : token
        });
    });
}

module.exports = {
    insertAdmin,
    updateAdmin,
    deleteAdmin,
    all,
    getAdmin,
    signIn
};
