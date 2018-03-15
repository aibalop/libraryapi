var User = require('../models/user');
var jwtservice = require('../services/jwt.service');

function insertUser(req, res){
    console.log(req.body);

    let user = new User();
    user.name = req.body.name;
    user.lastname = req.body.lastname;
    user.address = req.body.address;
    user.phone = req.body.phone;
    user.email = req.body.email;
    user.pass = req.body.pass;

    user.save((err)=>{
        if(err){
            return res.status(500).send({
                message : "Error to save user"
            });
        }else{
            let payload = {
              _id : user._id,
              name : user.name + user.lastname,
              email : user.email
            };
            let token = jwtservice.createToken(payload);
            return res.status(200).send({
                message : "user was successfully created",
                token : token
            })
        }
    });
}

function signIn(req, res) {

    User.findOne({'email' : req.body.email,'pass' : req.body.pass},(err, user) => {
        if(err){
            return res.status(500).send({
                message : "Error al logearse"
            });
        }

        if (!user) {
            return res.status(404).send({
                message : "No existe el usuario o contraseña/usuario incorrecto"
            });
        }

        let token = jwtservice.createToken(user);

        return res.status(200).send({
            mensaje : "Acceso correcto",
            token : token
        });
    });
}

function updateUser(req, res) {
    let id = req.params.userid;
    let datos = req.body;
    User.update({'_id' : id},datos,(err) => {
        if(err){
            return res.status(500).send({
                message : "Error to update"
            });
        }
        return res.status(200).send({
            message : "update user: " + id
        });
    });
}

function deleteUser(req, res) {
    let id = req.params.userid;

    User.findOne({'_id' : id},(err, user) => {
        if(err){
            return res.status(500).send({
                message : "Error to search by id"
            });
        }

        if (!user) {
            return res.status(404).send({
                message : "No found user"
            });
        }

        user.remove((err)=>{
            if (err) {
                return res.status(500).send({
                    message : "Error to remove"
                });
            }
            return res.status(200).send({
                message : "user removed: " + id
            })
        });
    });
}

function all(req, res) {
    User.find({},(err, users) => {
        if(err){
            return res.status(500).send({
                message : "Error to search by id"
            });
        }

        if (!users) {
            return res.status(404).send({
                message : "No found any user"
            });
        }

        return res.status(200).send({
            users
        });
    });
}

function getUser(req, res) {
    let id = req.params.userid;

    User.findOne({'_id' : id},(err, user) => {
        if(err){
            return res.status(500).send({
                message : "Error to search by id"
            });
        }

        if (!user) {
            return res.status(404).send({
                message : "No found user"
            });
        }

        return res.status(200).send({
            user
        });
    });
}

module.exports = {
    insertUser,
    updateUser,
    deleteUser,
    all,
    getUser,
    signIn
}
