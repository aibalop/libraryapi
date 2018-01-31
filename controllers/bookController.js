var Book = require('../models/book');

function insertBook(req, res) {
    let data = req.body;
    let book = new Book();
    book.title = req.body.title;
    book.description = req.body.description;
    book.year = req.body.year;
    book.stock = req.body.stock;
    book.picture = req.body.picture;

    book.save((err)=>{
        if (err) {
            return res.status(500).send({
                message : "Error to insert book"
            });
        }

        return res.status(200).send({
            message : "Book created"
        });
    });
}

function updateBook(req, res) { 
    let id = req.params.bookid;
    let data = req.body;

    Book.update({"_id" : id},data,(err)=>{
        if (err) {
            return res.status(500).send({
                message : "Error to update book"
            });
        }

        return res.status(200).send({
            message : "Book updated"
        });
    })
}

function deleteBook(req, res) {
    let id = req.params.bookid;
    
    Book.findOne({"_id" : id},(err, book)=>{
        if (err) {
            return res.status(500).send({
                message : "Error to found book"
            });
        }

        if (!book) {
            return res.status(404).send({
                message : "Book no found"
            });
        }

        book.remove((err)=>{
            if (err) {
                return res.status(500).send({
                    message : "Error to delete book"
                });
            }

            return res.status(200).send({
                message : "Book removed"
            });
        });
    });
}

function getBook(req, res) {
    let id = req.params.bookid;
    Book.find({"_id" : id},(err , book)=>{
        if (err) {
            return res.status(500).send({
                message : "Error to found book"
            }); 
        }
    
        return res.status(200).send({
            book
        });
    });
}

function all(req, res) {
    Book.find({},(err , books)=>{
        if (err) {
            return res.status(500).send({
                message : "Error to found books"
            }); 
        }
    
        return res.status(200).send({
            books
        });
    });
}


module.exports = {
    insertBook,
    updateBook,
    deleteBook,
    getBook,
    all
}