var Author = require('../models/author');

function insertAuthor(req, res){
    console.log(req.body);

    let author = new Author();
    author.name = req.body.name;
    author.lastname = req.body.lastname;
    author.country = req.body.country;
    author.save((err)=>{
        if(err){
            return res.status(500).send({
                message : "Error to save author"
            });
        }else{
            return res.status(200).send({
                message : "Author was successfully created"
            })
        }
    });   
}

function updateAuthor(req, res) {
    let id = req.params.authorid;
    let datos = req.body;
    Author.update({'_id' : id},datos,(err) => {
        if(err){
            return res.status(500).send({
                message : "Error to update"
            });
        }
        return res.status(200).send({
            message : "update author: " + id
        });
    });
}

function deleteAuthor(req, res) {
    let id = req.params.authorid;
    
    Author.findOne({'_id' : id},(err, author) => {
        if(err){
            return res.status(500).send({
                message : "Error to search by id"
            });
        }

        if (!author) {
            return res.status(404).send({
                message : "No found author"
            });
        }

        Author.remove(author,(err)=>{
            if (err) {
                return res.status(500).send({
                    message : "Error to remove"
                });
            }
            return res.status(200).send({
                message : "Author removed: " + id
            })
        });
    });
}

function all(req, res) {
    Author.find({},(err, authors) => {
        if(err){
            return res.status(500).send({
                message : "Error to search by id"
            });
        }

        if (!authors) {
            return res.status(404).send({
                message : "No found any author"
            });
        }

        return res.status(200).send({
            authors
        });
    });
}

function getAuthor(req, res) {
    let id = req.params.authorid;
    
    Author.findOne({'_id' : id},(err, author) => {
        if(err){
            return res.status(500).send({
                message : "Error to search by id"
            });
        }

        if (!author) {
            return res.status(404).send({
                message : "No found author"
            });
        }

        return res.status(200).send({
            author
        });
    });
}

module.exports = {
    insertAuthor,
    updateAuthor,
    deleteAuthor,
    all,
    getAuthor
}