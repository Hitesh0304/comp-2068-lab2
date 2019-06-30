const express = require('express');
const app = express();

//Import our routes
const bookRoutes = require('./routes/books');
const authorsRoutes = require('./routes/authors');
const sessionsRoutes = require('./routes/sessions');

// Our home page
app.get('/', (req, res) => {
    res.render('pages/home');
  });
  
//Register our page routes
app.use('/books', bookRoutes);
app.use('/authors', authorsRoutes);
app.use('/', sessionsRoutes);

// Exporting the changes
module.exports = app;