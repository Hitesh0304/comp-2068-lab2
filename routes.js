const express = require('express');
const app = express();

//Import our routes
const bookRoutes = require('./routes/books');

// Our home page
app.get('/', (req, res) => {
    res.render('pages/home');
  });
  
//Register our page routes
app.use('/books', bookRoutes);

// Exporting the changes
module.exports = app;