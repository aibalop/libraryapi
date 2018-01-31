var User = require('../models/user');

function insertUser(req, res){
    console.log(req.body);

    let user = new User();
    user.name = req.body.name;
    user.lastname = req.body.lastname;
    user.address = req.body.address;
    user.phone = req.body.phone;
    user.email = req.body.email;

    user.save((err)=>{
        if(err){
            return res.status(500).send({
                message : "Error to save user"
            });
        }else{
            return res.status(200).send({
                message : "user was successfully created"
            })
        }
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

        user.remove(user,(err)=>{
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
    getUser
}