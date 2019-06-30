const Book= require('../models/book');

exports.index = (req, res) => {
  req.isAuthenticated();

    Book.find({
      author: req.session.userId
    })
    .populate('author')
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
  req.isAuthenticated();

  Book.findOne({
    _id: req.params.id,
    author: req.session.userId
  })
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
  req.isAuthenticated();

    res.render('books/new',{
        title: 'New Book'
    });
};


exports.edit = (req, res) => {
  req.isAuthenticated();

  Book.findOne({
    _id: req.params.id,
    author: req.session.userId
  })
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
  req.isAuthenticated();
  req.body.book.author = req.session.userId;
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
  req.isAuthenticated();

  Book.updateOne({
    _id: req.body.id,
    author: req.session.userId
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
  req.isAuthenticated();

  Book.deleteOne({
    _id: req.body.id,
    author: req.session.userId
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