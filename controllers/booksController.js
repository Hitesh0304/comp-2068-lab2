const Book= require('../models/book');
const mongoose = require('mongoose');

exports.index = (req, res) => {
    Book.find()
      .then(book => {
        res.render('books/index', {
          books: book,
          title: 'Books'
        });
      })
      .catch(err => {
        req.flash('error', `ERROR: ${err}`);  
        res.redirect('/');
      });    
};


exports.show = (req, res) => {
  Book.findById(req.params.id)
    .then(book => {
        res.render('books/show',{
            title: book.title,
            book: book
        });
    })
    .catch(err => {
       req.flash('error', `ERROR: ${err}`);
       res.redirect('/books');
    });
};


exports.new = (req, res) => {
    res.render('books/new',{
        title: 'New Book'
    });
};


exports.edit = (req, res) => {
    Book.findById(req.params.id)
      .then(book => {
          res.render('books/edit',{
              title: `Edit ${book.title}`,
              book: book
          });
      })
      .catch(err =>{
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/books');
      });
};


exports.create = async (req, res) => {
    Book.create(req.body.book)
    .then(() => {
      req.flash('success', 'Your new book was created successfully.');
        res.redirect('/books');
      })
      .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.render('books/new', {
            book: req.body.book,
            title: 'New Book'
        });
      });
};


exports.update = (req, res) => {
  Book.updateOne({
    _id: req.body.id
}, req.body.book, {
    runValidators: true
})  
.then(() => {
    req.flash('success', 'Your new book was updated successfully.');
    res.redirect('/books');
})
.catch(err => {
    req.flash('error', `ERROR: ${err}`);
    res.render('books/edit', {
        book: req.body.book,
        title: `Edit ${req.body.book.title}`,
    });
});    
};


exports.destroy = (req, res) => {
  Book.deleteOne({
    _id: req.body.id
})
.then(() => {
    req.flash('success', 'Your book was deleted successfully.');
    res.redirect("/books")
}) 
.catch(err =>{
    req.flash('error', `ERROR: ${err}`);
    res.redirect('/books');
});        
};